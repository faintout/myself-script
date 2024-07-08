// cron: 16 7,18 * * *
// 抓header 中的Authorization 多账号换行
// export pzxq="Authorization
// Authorization"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = Env("瓶子星球签到");
const axios = require('axios')
const userInfoList = $.getEnvKey('pzxq').split('\n')
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);


const baseUrl = 'https://exapi.jxbscbd.com'
const url = {
    userCheckIn:'/gateway/pointsMall/task/userCheckIn',
    getUserPoints:'/gateway/pointsMall/user/getUserPoints?userNumber=6645c779a794800029436ab8',
    getUserInfo:'/gateway/pointsMall/user/getUserForQuestionnaire'
}
const headers = {
    'Content-Type': 'application/json',
    'Authorization': '',
    'Host': 'exapi.jxbscbd.com',
    'Referer': 'https://servicewechat.com/wx5d8100503eb3ecc3/776/page-frame.html',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/9115'
  }
const api = {
    userCheckIn: (token,data) => {
        return axios({
            url: baseUrl+url.userCheckIn,
            method: 'post',
            headers: {...headers, 'Authorization': token},
            data: data,
        })
        
    },
    getUserPoints: (token) => {
        return axios({
            url: baseUrl+url.getUserPoints,
            method: 'get',
            headers: {...headers, 'Authorization': token}
        })
    },
    getUserInfo: (token) => {
        return axios({
            url: baseUrl+url.getUserInfo,
            method: 'get',
            headers: {...headers, 'Authorization': token}
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
        const {data: {data: {id, userNumber, telephoneNumber}}} = await api.getUserInfo(token);
        const checkInParams = {
          userId: id,
          userNumber,
          telephoneNumber
        };
        $.log(`账号【${index}】 查询信息成功：${telephoneNumber}`, );
  
        await $.wait(1500);
  
        const {data: {msg}} = await api.userCheckIn(token, checkInParams);
        $.log(`账号【${index}】 签到信息：${msg}`, );
  
        await $.wait(1500);
  
        const {data: {data: {accumulatePoints, availablePoints}}} = await api.getUserPoints(token);
        $.log(`账号【${index}】 累计积分：${accumulatePoints}`, );
        $.log(`账号【${index}】 可用积分：${availablePoints}`, );
        $.log('');
  
        await $.wait(3500);
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('瓶子星球签到', $.logs.join('<br>'))
    $.done()
  };
  processTokens()