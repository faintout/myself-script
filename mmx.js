// cron: 15 8,17 * * *
// 抓 header中的Extra-Data中的sid 多账号换行
// export mmx="YZxxxx
// YZxxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = new Env("猛犸象签到");
const axios = require('axios')
const userInfoList = $.getEnvKey('mmx').split('\n')
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);


const baseUrl = 'https://h5.youzan.com'
const headers = {
  'Host': 'h5.youzan.com',
  'Connection': 'keep-alive',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/9129',
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'x-yz-action-id': 'wsc-h5-shop-0a37294e-1719804171907-683589',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  
  }
const url = {
  'checkin':'/wscump/checkin/checkinV2.json?checkinId=4296415&kdt_id=146288343',
  'getCountDay':'/wscump/checkin/get_activity_by_yzuid_v2.json?checkinId=4296415&kdt_id=146288343',
  'userInfo':'/wscaccount/api/authorize/data.json?kdt_id=146288343 ',
  'point':'/wscuser/membercenter/stats.json?kdt_id=146288343'
}
const api = {
  checkin: ({data,token}) => {
        return axios({
            url: baseUrl+url.checkin,
            method: 'get',
            headers:{
              ...headers,
              "Cookie":`KDTWEAPPSESSIONID=${token}`
            },
        })
    },
    userInfo: ({data,token}) => {
      return axios({
          url: baseUrl+url.userInfo,
          method: 'get',
          headers:{
            ...headers,
            "Cookie":`KDTWEAPPSESSIONID=${token}`
          },
      })
  },
    getCountDay: ({data,token}) => {
        return axios({
            url: baseUrl+url.getCountDay,
            method: 'get',
            headers:{
              ...headers,
              "Cookie":`KDTWEAPPSESSIONID=${token}`
            },
        })
    },
    point: ({data,token}) => {
        return axios({
            url: baseUrl+url.point,
            method: 'get',
            headers:{
              ...headers,
              "Cookie":`KDTWEAPPSESSIONID=${token}`
            },
        })
    },
}
const processTokens = async () => {
    let index = 0
    const randomTime = random(1, 300)
    console.log('随机延迟：',randomTime);
    await $.wait(randomTime*1000)
    for (const token of userInfoList) {
      try {
        $.log('')
        index++
        const data = await api.userInfo({token})
        const {mobile} = data?.data?.data?.userInfo
        if(!mobile){
          $.log(`账号【${index}】 登录失效`)
          $.log('')
          continue;
        }
        $.log(`账号【${index}】 当前用户：${mobile}`,);
        try{
          const {data:{msg}} = await api.checkin({token})
          $.log(`账号【${index}】 签到信息：${msg}`,);
        }catch(e){
          $.logErr(`账号【${index}】 签到失败:${e.toString()}`,)
        }
        await $.wait(2000)
        try{
          const {data:{data:{continuesDay}}} = await api.getCountDay({token})
          $.log(`账号【${index}】 连续签到天数：${continuesDay}`,);
        }catch(e){
          $.logErr(`账号【${index}】 获取签到天数失败:${e.toString()}`,)
        }
        await $.wait(2000)
        const dataPoint = await api.point({token})
        const points = dataPoint?.data?.data?.stats?.points||`未获取到积分`
        $.log(`账号【${index}】 当前积分：${points}`,);
        await $.wait(3500)
        $.log('');
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    await sendNotify('猛犸象签到', $.logs.join('<br>'))
    $.done()
  };
  
  processTokens()