// cron: 35 7,18 * * *
// 抓data中sid  YZxxx 和 url中的access_token 用&拼起来 多账号换行
// export water75="YZxxx&770f5xxxx
// 770f5xxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = new Env("7.5水签到");
const axios = require('axios')
const userInfoList = $.getEnvKey('water75').split('\n')
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);

const baseUrl = 'https://h5.youzan.com'
const headers = {
  'Host': 'h5.youzan.com',
  'Connection': 'keep-alive',
  'xweb_xhr': 1,
  'Extra-Data': '',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/9129',
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wx5508c9ab0d2118ff/62/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  
  }
const url = {
  'checkin':'/wscump/checkin/checkinV2.json?checkinId=3997371&app_id=wx5508c9ab0d2118ff&kdt_id=105036832&access_token=',
  'getCountDay':'/wscump/checkin/get_activity_by_yzuid_v2.json?checkinId=3997371&app_id=wx5508c9ab0d2118ff&kdt_id=105036832&access_token=',
  'userInfo':'/wscaccount/api/authorize/data.json?app_id=wxf739eb6ad6a644da&kdt_id=146384563&appId=wxf739eb6ad6a644da&access_token='
}
const api = {
  checkin: ({data,token}) => {
        return axios({
            url: baseUrl+url.checkin+token,
            method: 'get',
            headers:{
              ...headers,
              "Extra-Data":JSON.stringify(data)
            },
        })
    },
    userInfo: ({data,token}) => {
      return axios({
          url: baseUrl+url.userInfo+token,
          method: 'get',
          headers:{
            ...headers,
            "Extra-Data":JSON.stringify(data)
          },
      })
  },
    getCountDay: ({data,token}) => {
        return axios({
            url: baseUrl+url.getCountDay+token,
            method: 'get',
            headers:{
              ...headers,
              "Extra-Data":JSON.stringify(data)
            },
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
        const userData = token.split('&')
        const headerData = {"is_weapp":1,"sid":userData[0],"version":"2.175.7","client":"weapp","bizEnv":"wsc","uuid":"dPN7c9aDRQbsqcZ1717150035269","ftime":new Date().getTime()}
        const headerParams = {
          data:headerData,
          token:userData[1]
        }
        const data = await api.userInfo(headerParams)
        const {mobile} = data?.data?.data?.userInfo
        if(!mobile){
          $.log(`账号【${index}】登录失效`)
          $.log('')
          continue;
        }
        $.log(`账号【${index}】 当前用户：${mobile}`);
        await $.wait(2000)
        const {data:{msg}} = await api.checkin(headerParams)
        $.log(`账号【${index}】 签到信息：${msg}`);
        await $.wait(2000)
        const {data:{data:{continuesDay}}} = await api.getCountDay(headerParams)
        $.log(`账号【${index}】 连续签到天数：${continuesDay}`);
        await $.wait(3500)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('7.5水签到', $.logs.join('<br>'))
    $.done()
  };
  
  processTokens()