// cron: 15 9,16 * * *
// 填写账号&密码  多账号换行
// export ljgy="130xxxxxx&xxxxx
// 130xxxxxx&xxxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = Env("丽璟国韵");
const axios = require('axios')
const userInfoList = $.getEnvKey('ljgy').split('\n')
if(!userInfoList.length){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个账号`);
const baseUrl = 'http://wep.qzlcis.com/api'
const headers = {
  'Host': 'wep.qzlcis.com',
  'Connection': 'keep-alive',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x18003030) NetType/4G Language/zh_CN',
  'Content-Type': 'application/json',
  'Accept': 'application/json;charset=utf-8',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'http://wep.qzlcis.com/',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  
  }
const url = {
  'login':'/index/login',
  'sign':'/user/sign',
  'sign_reward':'/user/sign_reward',
  'clock':'/user/clock',
  'clock_reward':'/user/clock_reward',
  'info':'/user/info',
  
}
const api = {
  login: (data) => {
      return axios({
          url: baseUrl+url.login,
          method: 'post',
          headers,
          data
      })
  },
  sign: (data) => {
      return axios({
          url: baseUrl+url.sign,
          method: 'post',
          headers,
          data
      })
  },
  sign_reward: (data) => {
      return axios({
          url: baseUrl+url.sign_reward,
          method: 'post',
          headers,
          data
      })
  },
  clock: (data) => {
      return axios({
          url: baseUrl+url.clock,
          method: 'post',
          headers,
          data
      })
  },
  clock_reward: (data) => {
      return axios({
          url: baseUrl+url.clock_reward,
          method: 'post',
          headers,
          data
      })
  },
  info: (data) => {
      return axios({
          url: baseUrl+url.info,
          method: 'post',
          headers,
          data
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
        const userInfo = token.split('&')
        const username = userInfo[0]
        const password = userInfo[1]
        $.log(`账号【${index}】 当前用户：${username}`);
        const {data:{code,info,data:tokenData}} = await api.login({username,password})
        if(code!==1){
          $.log(`账号【${index}】 登录失败:${info}`)
          await $.wait(2000)
          continue;
        }
        $.log(`账号【${index}】 登录成功！`)
        await $.wait(2000)
        const {data:{info:signInfo,data:signData}} = await api.sign(tokenData)
        await $.wait(1500)
        const {data:{data:{signin_days}}} = await api.sign_reward(tokenData)
        await $.wait(2500)
        const {data:{data:{money}}} = await api.info(tokenData)
        $.log(`账号【${index}】 红包签到信息：${signInfo}`);
        $.log(`账号【${index}】 红包签到天数：${signin_days}`);
        $.log(`账号【${index}】 红包累计金额：${money}`);
        await $.wait(1000*15)
        const {data:{info:clockInfo}} = await api.clock(tokenData)
        $.log(`账号【${index}】 实物签到信息：${clockInfo}`);
        await $.wait(3500)
        const {data:{data:clockData}} = await api.clock_reward(tokenData)
        $.log(`账号【${index}】 累计打卡天数：${clockData?.clock_day}`);
        $.log(`账号【${index}】 下个奖品：${clockData?.next_reward?.name}`);
        $.log(`账号【${index}】 下个奖品所需天数：${clockData?.next_reward?.days}`);
        $.log('');
        await $.wait(1000*30)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('丽璟国韵', $.logs.join('<br>'))
    $.done()
  };
  
  processTokens()