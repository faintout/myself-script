// const $ = new Env("丽璟国韵");
const axios = require('axios')
// userId为自定义标识
const userInfoList =[
  {
    username: '130xx',
    password:"xxx",
  },
  {
    username: '130xx',
    password:"xxx",
  },
  {
    username: '130xx',
    password:"xxx",
  },
]
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
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))
//随机生成1-300秒的延迟
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const getCurrDay = () => {
    // 创建一个新的 Date 对象，它将包含当前的日期和时间
    const currentDate = new Date();

    // 获取当前日期的年、月、日
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，因此需要加 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds());

    // 将年、月、日拼接成所需格式的日期字符串
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;

    return formattedDate
}
const processTokens = async () => {
  const randomTime = random(1, 300)
  console.log('随机延迟：',randomTime);
  await sleep(randomTime*1000)
    for (const token of userInfoList) {
      try {
        console.log('当前用户：',token.username);
        const {data:{code,info,data:tokenData}} = await api.login(token)
        if(code!==1){
          console.log('登录失败',info)
          await sleep(2000)
          continue;
        }
        console.log('登录成功！')
        await sleep(2000)
        const {data:{info:signInfo,data:signData}} = await api.sign(tokenData)
        await sleep(1500)
        const {data:{data:{signin_days}}} = await api.sign_reward(tokenData)
        await sleep(2500)
        const {data:{data:{money}}} = await api.info(tokenData)
        console.log('红包签到信息：',signInfo);
        console.log('红包签到天数：',signin_days);
        console.log('红包累计金额：',signData?.reward_num||money);
        await sleep(1000*15)
        const {data:{info:clockInfo}} = await api.clock(tokenData)
        console.log('实物签到信息：',clockInfo);
        await sleep(3500)
        const {data:{data:clockData}} = await api.clock_reward(tokenData)
        console.log('累计打卡天数：',clockData?.clock_day);
        console.log('下个奖品：',clockData?.next_reward?.name);
        console.log('下个奖品所需天数：',clockData?.next_reward?.days);
        console.log('');
        await sleep(1000*30)
      } catch (error) {
        console.error(`处理时发生错误：`, error.toString());
      }
    }
  };
  
  processTokens()