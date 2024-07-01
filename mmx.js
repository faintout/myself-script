// const $ = new Env("猛犸象签到");
const axios = require('axios')
let pushStr = ''
const consoleold = console.log
console.log = (...args)=>{
  pushStr = pushStr.concat(args.join(' ')+'\r\n')
  consoleold(...args)
}
const userInfoList =[
  {
    userId: '5119',
    token:'xxx'
  },
  {
    userId: '9929',
    token:'xxx'
  },
  {
    userId: '8816',
    token:'xxx'
  },
]

const pushPlusSend = async ({title,token, content,template}) => {
  try {
    await axios({
      url: 'http://www.pushplus.plus/send',
      method: 'post',
      headers:{
        'Content-Type': 'application/json'
      },
      data:{
        title:title,
        token:token,
        content:content,
        template:template||'txt'
      }
  })
    console.log('pushPlus发送成功')
  } catch (error) {
    console.error('pushPlus发送通知失败',error.toString())
    await sleep(5000)
    pushPlusSend({title,token, content,template})
  }
}
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
              "Cookie":token
            },
        })
    },
    userInfo: ({data,token}) => {
      return axios({
          url: baseUrl+url.userInfo,
          method: 'get',
          headers:{
            ...headers,
            "Cookie":token
          },
      })
  },
    getCountDay: ({data,token}) => {
        return axios({
            url: baseUrl+url.getCountDay,
            method: 'get',
            headers:{
              ...headers,
              "Cookie":token
            },
        })
    },
    point: ({data,token}) => {
        return axios({
            url: baseUrl+url.point,
            method: 'get',
            headers:{
              ...headers,
              "Cookie":token
            },
        })
    },
}
//随机生成1-300秒的延迟
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

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
        const data = await api.userInfo(token)
        const {mobile} = data?.data?.data?.userInfo||{mobile:'未获取到手机号'}
        console.log('当前用户：',mobile);
        try{
          const {data:{msg}} = await api.checkin(token)
          console.log('签到信息：',msg);
        }catch(e){
          console.error('签到失败',e.toString())
        }
        await sleep(2000)
        try{
          const {data:{data:{continuesDay}}} = await api.getCountDay(token)
          console.log('连续签到天数：',continuesDay);
        }catch(e){
          console.error('获取签到天数失败',e.toString())
        }
        await sleep(2000)
        const dataPoint = await api.point(token)
        const points = dataPoint?.data?.data?.stats?.points||'未获取到积分'
        console.log('当前积分：',points);
        await sleep(3500)
        console.log('');
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
  };
  
  processTokens()