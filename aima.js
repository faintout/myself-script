// cron: 35 7,18 * * *
// 抓header中Sign、TraceLog-Id、Access-Token 用&拼起来 多账号换行
// export aima="63b263cxxx&088a0d3bxxx&eyJ0eXAiOxxx
// 63b263cxxx&088a0d3bxxx&eyJ0eXAiOxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = new Env("爱玛签到");
const axios = require('axios')
let index = 0
let adsList = []
let signActivityId = 0
const userInfoList = $.getEnvKey('aima').split('\n')
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);

const baseUrl = 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/sign:'
const headers = {
  'Host': 'scrm.aimatech.com',
  'Connection': 'keep-alive',
  // 'Content-Length': 49,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/9129',
  'Time-Stamp': new Date().getTime(),
  'Content-Type': 'application/json',
  'TraceLog-Id': '',
  'Access-Token': '',
  'xweb_xhr': 1,
  'App-Id': 'scrm',
  'Sign': '',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wx2dcfb409fd5ddfb4/161/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  }
const url = {
  'join':'join',
  'search':'search'
  
}
const api = {
  join: (token) => {
      return axios({
          url: baseUrl+'join',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":signActivityId,"activitySceneId":null}
      })
  },
  search: (token) => {
      return axios({
          url: baseUrl+'search',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":signActivityId}
      })
  },
  luckyJoin: (token,activeId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/lucky:join',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":activeId,"preview":false,"mobile":"","code":"","activitySceneId":null,"codeType":1}
      })
  },
  luckySearch: (token,activeId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/lucky:search',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":activeId,"preview":false}
      })
  },
  userInfo: (token) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/member/IndexInfo',
          method: 'get',
          headers:{
            ...headers,
            ...token
          },
      })
  },
  getAds: (token) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/cms/ads ',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"location":1,"adType":0,"status":2}
      })
  },
  receive_award: (token,activityAwardId,awardId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/sign:receive_award',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":signActivityId,"awardCount":1,activityAwardId,awardId,"awardType":4}
      })
  },
  wxShare: (token,activeId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/share',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":activeId}
      })
  },
}

const getUserInfo = async (params) => {
  const {data:{content:{mobile,id,vipMemberPointDTO:{pointValue}}}} = await api.userInfo(params)
  if(!mobile){
    $.log(`账号【${index}】登录失效`)
    $.log('')
    return null
  }
  $.log(`账号【${index}】 当前用户：【${mobile}】`);
  $.log(`账号【${index}】 当前积分：【${pointValue}】`);
  return id
}
const receiveAward = async ({token,signed,signAwards}) => {
  const receiveList = signAwards.filter(item=>item.signNum<=signed&&item.receiveStatus===0)

  for(let award of receiveList){
    await $.wait(2000)
    const {awardName,activityAwardId,awardId} = award
    const {data} = await api.receive_award(token,activityAwardId,awardId)
    if(data.code===200){
      $.log(`账号【${index}】 ${awardName} 领取成功`);
    }else{
      $.log(`账号【${index}】 ${awardName} 领取失败：${data?.chnDesc}`);
    }
  }
}
const userSign = async (params) => {
  const {data} = await api.join(params)
  if(data.code===200){
    $.log(`账号【${index}】 签到信息：签到成功！，获得${data?.content?.point}积分`);
  }else{
    $.log(`账号【${index}】 签到信息：${data?.chnDesc}`);
  }
}
const wxShare = async (params,activeId,memberId) => {
  const {data} = await api.wxShare(params,activeId,memberId)
  if(data.code===200){
    $.log(`账号【${index}】 wx分享成功`);
  }else{
    $.log(`账号【${index}】 wx分享【${activeId}】失败：${data?.chnDesc}`);
  }
}

const luckyJoin = async (params) => {
  for(let ads of adsList){
    const {data:{content}} = await api.luckySearch(params,ads.activityId)
    if(!content){
      console.log(`账号【${index}】 当前抽奖活动【${ads.title}】为空，跳过该活动`)
      continue;
    }
    //完成wx分享获取次数
    await wxShare(params,ads.activityId)
    await $.wait(2000)
    const {activityBaseDTO:{name},availableJoinTimesDTO:{maxAvailableJoinTimes}} = content
    $.log(`账号【${index}】 当前活动名称：${name}`);
    $.log(`账号【${index}】 当前抽奖次数为：${maxAvailableJoinTimes}`);
    if(maxAvailableJoinTimes>0){
      for(let i=0;i<maxAvailableJoinTimes;i++){
        await $.wait(2000)
        const {data} = await api.luckyJoin(params,ads.activityId)
        if(!data?.content||!data?.content?.length){
          $.log(`账号【${index}】 抽奖错误：${data.chnDesc||JSON.stringify(data)}`);
          continue
        }
        const actNameList = data.content.map(item=>item.actAwardName)
        $.log(`账号【${index}】 抽奖第${i+1}次：${actNameList.join(',')}`);
        await $.wait(2000)
      }
    }
    await $.wait(2000)
    
  }
}
const matchActiveId = (link)=>{
  const match = link.match(/activityId=(\d+)/);
  return match?match[1]:''
}
const getAds = async (params)=>{
  const {data:{recordList}} = await api.getAds(params)
  adsList = recordList.filter(item=>matchActiveId(item.link)).map(item=>{
    return {
      activityId:matchActiveId(item.link),
      title:item.title
    }
  })
  const {activityId} = adsList.filter(ads=>ads.title.includes('签到'))[0]
  signActivityId = activityId||0
  console.log(`查询活动列表成功！当前活动列表：${adsList.map(item=>item.title).join(',')}`)

}
const searchSignDay = async (params) => {
  const {data:{content:{signed,signAwards}}} = await api.search(params)
  $.log(`账号【${index}】 连续签到天数：${signed}`);
  return {signed,signAwards}
}
const processTokens = async () => {
    const randomTime = random(1, 300)
    console.log('随机延迟：',randomTime + '秒');
    await $.wait(randomTime*1000)
    for (const token of userInfoList) {
      try {
        $.log('')
        index++
        const tokenList = token.split('&')
        const params = {
              'Sign':tokenList[0],
              'TraceLog-Id':tokenList[1],
              'Access-Token':tokenList[2]
        }
        !adsList.length&&await getAds(params)
        const id = await getUserInfo(params)
        if(!id){
          continue;
        }
        await userSign(params);
        await $.wait(2000)
        const searchData = await searchSignDay(params);
        await receiveAward({...searchData,token:params});
        // 开始签到
        await luckyJoin(params);
        await $.wait(3500)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('爱玛签到', $.logs.join('<br>'))
    $.done()
  };
  
  processTokens()