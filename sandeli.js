// cron: 40 8,17 * * *
// 抓header中的Authorization 去掉bearer 多账号换行
// export sandeli="8e09bfc0xxx
// 770f5xxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = new Env("三得利签到");
const axios = require('axios')
const userInfoList = $.getEnvKey('sandeli').split('\n')
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);

const baseUrl = 'https://xiaodian.miyatech.com/api'
const headers = {
  'Host': 'xiaodian.miyatech.com',
  'Connection': 'keep-alive',
  'X-VERSION': '2.1.3',
  'Authorization': '',
  'HH-VERSION': '0.2.8',
  'componentSend': 1,
  'HH-FROM': '20230130307725',
   'HH-APP': 'wxb33ed03c6c715482',
  'appPublishType': 1,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b13)XWEB/11065',
  'Content-Type': 'application/json;charset=UTF-8',
  'xweb_xhr': 1,
  'HH-CI': 'saas-wechat-app',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wxb33ed03c6c715482/28/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9'
  }
const url = {
  'signIn':'/coupon/auth/signIn',
  'userInfo':'/user/member/info '
}
const api = {
  signIn: (token) => {
    headers.Authorization = 'bearer '+token
        return axios({
            url: baseUrl+url.signIn,
            method: 'post',
            headers,
            data:{"miniappId":159}
        })
    },
    userInfo: (token) => {
    headers.Authorization = 'bearer '+token
      return axios({
          url: baseUrl+url.userInfo,
          method: 'post',
          headers,
          data:{}
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
        const data = await api.userInfo(token)
        const mobile = data?.data?.data?.phone
        if(!mobile){
          $.log(`账号【${index}】登录失效`)
          $.log('')
          continue;
        }
        $.log(`账号【${index}】 当前用户：${mobile}`);
        await $.wait(2000)
        const {data:{msg}} = await api.signIn(token)
        $.log(`账号【${index}】 签到信息：${msg}`);
        await $.wait(2000)
        const infoData = await api.userInfo(token)
        const currentScore = infoData?.data?.data?.currentScore
        $.log(`账号【${index}】 当前积分：${currentScore}`);
        await $.wait(3500)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('三得利签到', $.logs.join('<br>'))
    $.done()
  };
  
  processTokens()