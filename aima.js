// cron: 35 7,18 * * *
// 抓header中Access-Token 多账号换行
// export aima="eyJ0eXAiOxxx
// eyJ0eXAiOxxx"
const {
  getCurrDay,checkTime,Env,random,getProxyUrl
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = new Env("爱玛签到");
const axios = require('axios')
let proxyUrl = ''
const isProxy = false
let index = 0
const reqMax = 3
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
  // 'Time-Stamp': new Date().getTime(),
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
const getTokenHeaders = (token = "") => {
    function r(r, n) {
        r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;
        for (var f = 1732584193, a = -271733879, i = -1732584194, h = 271733878, v = 0; v < r.length; v += 16) {
            var d = f,
                l = a,
                s = i,
                x = h;
            f = t(f, a, i, h, r[v + 0], 7, -680876936), h = t(h, f, a, i, r[v + 1], 12, -389564586), i = t(i, h, f, a, r[v + 2], 17, 606105819), a = t(a, i, h, f, r[v + 3], 22, -1044525330), f = t(f, a, i, h, r[v + 4], 7, -176418897), h = t(h, f, a, i, r[v + 5], 12, 1200080426), i = t(i, h, f, a, r[v + 6], 17, -1473231341), a = t(a, i, h, f, r[v + 7], 22, -45705983), f = t(f, a, i, h, r[v + 8], 7, 1770035416), h = t(h, f, a, i, r[v + 9], 12, -1958414417), i = t(i, h, f, a, r[v + 10], 17, -42063), a = t(a, i, h, f, r[v + 11], 22, -1990404162), f = t(f, a, i, h, r[v + 12], 7, 1804603682), h = t(h, f, a, i, r[v + 13], 12, -40341101), i = t(i, h, f, a, r[v + 14], 17, -1502002290), f = e(f, a = t(a, i, h, f, r[v + 15], 22, 1236535329), i, h, r[v + 1], 5, -165796510), h = e(h, f, a, i, r[v + 6], 9, -1069501632), i = e(i, h, f, a, r[v + 11], 14, 643717713), a = e(a, i, h, f, r[v + 0], 20, -373897302), f = e(f, a, i, h, r[v + 5], 5, -701558691), h = e(h, f, a, i, r[v + 10], 9, 38016083), i = e(i, h, f, a, r[v + 15], 14, -660478335), a = e(a, i, h, f, r[v + 4], 20, -405537848), f = e(f, a, i, h, r[v + 9], 5, 568446438), h = e(h, f, a, i, r[v + 14], 9, -1019803690), i = e(i, h, f, a, r[v + 3], 14, -187363961), a = e(a, i, h, f, r[v + 8], 20, 1163531501), f = e(f, a, i, h, r[v + 13], 5, -1444681467), h = e(h, f, a, i, r[v + 2], 9, -51403784), i = e(i, h, f, a, r[v + 7], 14, 1735328473), f = u(f, a = e(a, i, h, f, r[v + 12], 20, -1926607734), i, h, r[v + 5], 4, -378558), h = u(h, f, a, i, r[v + 8], 11, -2022574463), i = u(i, h, f, a, r[v + 11], 16, 1839030562), a = u(a, i, h, f, r[v + 14], 23, -35309556), f = u(f, a, i, h, r[v + 1], 4, -1530992060), h = u(h, f, a, i, r[v + 4], 11, 1272893353), i = u(i, h, f, a, r[v + 7], 16, -155497632), a = u(a, i, h, f, r[v + 10], 23, -1094730640), f = u(f, a, i, h, r[v + 13], 4, 681279174), h = u(h, f, a, i, r[v + 0], 11, -358537222), i = u(i, h, f, a, r[v + 3], 16, -722521979), a = u(a, i, h, f, r[v + 6], 23, 76029189), f = u(f, a, i, h, r[v + 9], 4, -640364487), h = u(h, f, a, i, r[v + 12], 11, -421815835), i = u(i, h, f, a, r[v + 15], 16, 530742520), f = o(f, a = u(a, i, h, f, r[v + 2], 23, -995338651), i, h, r[v + 0], 6, -198630844), h = o(h, f, a, i, r[v + 7], 10, 1126891415), i = o(i, h, f, a, r[v + 14], 15, -1416354905), a = o(a, i, h, f, r[v + 5], 21, -57434055), f = o(f, a, i, h, r[v + 12], 6, 1700485571), h = o(h, f, a, i, r[v + 3], 10, -1894986606), i = o(i, h, f, a, r[v + 10], 15, -1051523), a = o(a, i, h, f, r[v + 1], 21, -2054922799), f = o(f, a, i, h, r[v + 8], 6, 1873313359), h = o(h, f, a, i, r[v + 15], 10, -30611744), i = o(i, h, f, a, r[v + 6], 15, -1560198380), a = o(a, i, h, f, r[v + 13], 21, 1309151649), f = o(f, a, i, h, r[v + 4], 6, -145523070), h = o(h, f, a, i, r[v + 11], 10, -1120210379), i = o(i, h, f, a, r[v + 2], 15, 718787259), a = o(a, i, h, f, r[v + 9], 21, -343485551), f = c(f, d), a = c(a, l), i = c(i, s), h = c(h, x)
        }
        return Array(f, a, i, h)
    }
    
    function n(r, n, t, e, u, o) {
        return c((f = c(c(n, r), c(e, o))) << (a = u) | f >>> 32 - a, t);
        var f, a
    }
    
    function t(r, t, e, u, o, c, f) {
        return n(t & e | ~t & u, r, t, o, c, f)
    }
    
    function e(r, t, e, u, o, c, f) {
        return n(t & u | e & ~u, r, t, o, c, f)
    }
    
    function u(r, t, e, u, o, c, f) {
        return n(t ^ e ^ u, r, t, o, c, f)
    }
    
    function o(r, t, e, u, o, c, f) {
        return n(e ^ (t | ~u), r, t, o, c, f)
    }
    
    function c(r, n) {
        var t = (65535 & r) + (65535 & n);
        return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t
    }
    
    function f(r) {
        for (var n = Array(), t = 0; t < 8 * r.length; t += 8) n[t >> 5] |= (255 & r.charCodeAt(t / 8)) << t % 32;
        return n
    }
    const TraceLogId = function () {
        var e = (new Date).getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
            var o = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" == t ? o : 3 & o | 8).toString(16)
        }))
    }
    const hexMd5 = function (n) {
        return function (r) {
            for (var n = "0123456789abcdef", t = "", e = 0; e < 4 * r.length; e++) t += n.charAt(r[e >> 2] >> e % 4 * 8 + 4 & 15) + n.charAt(r[e >> 2] >> e % 4 * 8 & 15);
            return t
        }(r(f(n), 8 * n.length))
    }
    // const token  ='xQ'
    const traceLogId = TraceLogId()
    const params = {
        "TraceLog-Id":traceLogId,
        // "TraceLog-Id":'84412357-b051-4c93-bf63-aa77bf50e85c',
        "App-Id": "scrm",
        "Time-Stamp": (new Date).getTime(),
        // "Time-Stamp": '1737450099000',
        "Sign": ""
    }
    const p = token.substring(50, 80)
    const D = "App-IdscrmTime-Stamp" + params["Time-Stamp"] + "TraceLog-Id" + traceLogId + "Access-Token" + p + "AimaScrm321_^";
    params["Access-Token"] = token
    params.Sign = hexMd5(D)
    return params
}
const proxyConfig = proxyUrl ? {
  proxy: {
    host: proxyUrl.split(':')[0],
    port: proxyUrl.split(':')[1],
    protocol: 'http',
  }
} : {};

const api = {
  join: (token) => {
      return axios({
          url: baseUrl+'join',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"activityId":signActivityId,"activitySceneId":null},
          ...proxyConfig
      })
  },
  search: (token) => {
      return axios({
          url: baseUrl+'search',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"activityId":signActivityId},
          ...proxyConfig
      })
  },
  luckyJoin: (token,activeId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/lucky:join',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"activityId":activeId,"preview":false,"mobile":"","code":"","activitySceneId":null,"codeType":1},
          ...proxyConfig
      })
  },
  luckySearch: (token,activeId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/lucky:search',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"activityId":activeId,"preview":false},
          ...proxyConfig
      })
  },
  userInfo: (token) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/member/IndexInfo',
          method: 'get',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          ...proxyConfig
      })
  },
  getAds: (token) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/cms/ads ',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"location":1,"adType":0,"status":2},
          ...proxyConfig
      })
  },
  getLocation: (token) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/locations:search',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"locations":[0,1,2]},
          ...proxyConfig
      })
  },
  receive_award: (token,activityAwardId,awardId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/sign:receive_award',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"activityId":signActivityId,"awardCount":1,activityAwardId,awardId,"awardType":4},
          ...proxyConfig
      })
  },
  wxShare: (token,activeId) => {
      return axios({
          url: 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/share',
          method: 'post',
          headers:{
            ...headers,
            ...getTokenHeaders(token)
          },
          data:{"activityId":activeId},
          ...proxyConfig
      })
  },
}

const getUserInfo = async (token) => {
  try{
    const {data:{content:{mobile,id,vipMemberPointDTO:{pointValue}}}} = await api.userInfo(token)
    if(!mobile){
      $.log(`账号【${index}】登录失效`)
      $.log('')
      return null
    }
    $.log(`账号【${index}】 当前用户：【${mobile}】`);
    $.log(`账号【${index}】 当前积分：【${pointValue}】`);
    return id
  }catch(e){
    console.log('登录错误：',e?.response?.data?.chnDesc||e.response||e.cause||e)
  }
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
const userSign = async (token) => {
  const {data} = await api.join(token)
  if(data.code===200){
    $.log(`账号【${index}】 签到信息：签到成功！，获得${data?.content?.point}积分`);
  }else{
    $.log(`账号【${index}】 签到信息：${data?.chnDesc}`);
  }
}
const wxShare = async (token,activeId,memberId) => {
  const {data} = await api.wxShare(token,activeId,memberId)
  if(data.code===200){
    $.log(`账号【${index}】 wx分享成功`);
  }else{
    $.log(`账号【${index}】 wx分享【${activeId}】失败：${data?.chnDesc}`);
  }
}

const luckyJoin = async (token) => {
  for(let ads of adsList){
    const {data:{content}} = await api.luckySearch(token,ads.activityId)
    if(!content){
      console.log(`账号【${index}】 当前抽奖活动【${ads.title}】为空，跳过该活动`)
      continue;
    }
    //完成wx分享获取次数
    await wxShare(token,ads.activityId)
    await $.wait(2000)
    const {activityBaseDTO:{name},availableJoinTimesDTO:{maxAvailableJoinTimes}} = content
    $.log(`账号【${index}】 当前活动名称：${name}`);
    $.log(`账号【${index}】 当前抽奖次数为：${maxAvailableJoinTimes}`);
    if(maxAvailableJoinTimes>0){
      for(let i=0;i<maxAvailableJoinTimes;i++){
        await $.wait(2000)
        const {data} = await api.luckyJoin(token,ads.activityId)
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
  const match = link?.match(/activityId=(\d+)/);
  return match?match[1]:''
}
const getAds = async (token)=>{
  const {data:{recordList}} = await api.getAds(token)
  const {data:{content}} = await api.getLocation(token)
  adsList = recordList.filter(item=>matchActiveId(item.link)).map(item=>{
    return {
      activityId:matchActiveId(item.link),
      title:item.title
    }
  })
  //添加其他活动来源
  adsList.push(...content.map(con=>{
    return {
      activityId:con.activityId,
      title:con.name
    }
  }))
  adsList = adsList.filter((item, index, self) =>
    index === self.findIndex((t) => t.activityId == item.activityId)
  );
  const activityList = adsList.filter(ads=>ads.title.includes('签到'))
  if(activityList.length){
    signActivityId = activityList[0].activityId||0
  }
  console.log(`查询活动列表成功！当前活动列表：${adsList.map(item=>item.title).join(',')}`)

}
const searchSignDay = async (token) => {
  let reqCount = 0
  const searchSignDayFn = async()=>{
    try{
      const data = await api.search(token)
      if(data.data.code!==200){
        throw new Error(data.data.chnDesc)
      }
      const {signed,signAwards} = data.data.content
      $.log(`账号【${index}】 连续签到天数：${signed}`);
      return {signed,signAwards}
    }catch(e){
      if(reqCount>=reqMax){
        $.log(`重试次数已达上限，停止重试。`);
        return null
      }
      reqCount++
      $.log(`账号【${index}】 查询签到信息失败：${e}`);
      $.log(`账号【${index}】 重试【${reqCount}】次。。。`);
      await $.wait(2500)
      return await searchSignDayFn(token)
    }
  }
  return searchSignDayFn()
}
const processTokens = async () => {
    const randomTime = random(1, 300)
    console.log('随机延迟：',randomTime + '秒');
    await $.wait(randomTime*1000)
    for (const token of userInfoList) {
      try {
        if(isProxy){
          $.log('使用代理')
          const prUrl = await getProxyUrl()
          if(prUrl){
            proxyUrl = prUrl
          }
        }
        $.log('')
        index++
        !adsList.length&&await getAds(token)
        const id = await getUserInfo(token)
        if(!id){
          continue;
        }
        if(signActivityId!==0){
          // 开始签到
          await userSign(token);
          await $.wait(2000)
          const searchData = await searchSignDay(token);
          if(!searchData){
            $.log('当前账号获取信息异常,跳过后续活动！')
            continue;
          }
          await receiveAward({...searchData,token:token});
        }else{
          $.log('当前无签到活动，跳过签到！')
        }

        // 开始抽奖
        await luckyJoin(token);
        await $.wait(3500)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('爱玛签到', $.logs.join('\n\n'))
    $.done()
  };
  
  processTokens()
