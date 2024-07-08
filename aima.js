// cron: 45 7,18 * * *
// 抓header中Sign、TraceLog-Id、Access-Token 用&拼起来 多账号换行
// export aima="63b263cxxx&088a0d3bxxx&eyJ0eXAiOxxx
// 63b263cxxx&088a0d3bxxx&eyJ0eXAiOxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = Env("爱玛签到");
const axios = require('axios')
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
          data:{"activityId":"100000893","activitySceneId":null}
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
          data:{"activityId":"100000893"}
      })
  },
}
const processTokens = async () => {
    let index = 0
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
        $.log(`当前用户：【${index}】`);
        const {data} = await api.join(params)
        if(data.code===200){
          $.log(`签到信息：签到成功！，获得${data?.content?.point}积分`);
        }else{
          $.log(`签到信息：${data?.chnDesc}`);
        }
        await sleep(2000)
        const {data:{content:{signed}}} = await api.search(params)
        $.log(`连续签到天数：${signed}`);
        await sleep(3500)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('爱玛签到', $.logs.join('<br>'))
    $.done()
  };
  
  processTokens()