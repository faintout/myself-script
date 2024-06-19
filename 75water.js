// const $ = new Env("7.5水");
const axios = require('axios')
let pushStr = ''
const consoleold = console.log
console.log = (...args)=>{
  pushStr = pushStr.concat(args.join(' ')+'\r\n')
  consoleold(...args)
}
const userInfoList =[
  // {
  //   userId: '5119',
  //   token:"ef50e7633a2b7ad185fe7bd9a76be0",
  //   data:{"is_weapp":1,"sid":"YZ1246163617932701696YZpp4RlUd0","version":"2.173.6","client":"weapp","bizEnv":"wsc","uuid":"13UvBzfrawBidlx1717150040462","ftime":new Date().getTime()},
  // },
  // {
  //   userId: '9929',
  //   token:"3257257a40dfb4c8639f694fb5a9f9",
  //   data:{"is_weapp":1,"sid":"YZ1247135534397095936YZVMRHIsP9","version":"2.173.6","client":"weapp","bizEnv":"wsc","uuid":"0iarMiR40oNcDhy1717381856513","ftime":new Date().getTime()}
  // },
  // {
  //   userId: '8816',
  //   token:"67d3bdce7a5f843943fab511d9addf",
  //   data:{"is_weapp":1,"sid":"YZ1247137729603567616YZ19oZH6sI","version":"2.173.6","client":"weapp","bizEnv":"wsc","uuid":"TTzArzpYf8jP9cM1717382331545","ftime":new Date().getTime()}
  // },
  {
    userId: '东',
    token:"62c15a249efe33ddeebe3fb56dc874",
    data:{"is_weapp":1,"sid":"YZ1250430885413810176YZdw9RH56w","version":"2.173.6","client":"weapp","bizEnv":"wsc","uuid":"QozNCfdpPLArmu51717149916438","ftime":new Date().getTime()}
  },
    {
    userId: '东1',
    token:"8b24c165e6ac9e4a77156e55a1b209",
    data:{"is_weapp":1,"sid":"YZ1250430745722474496YZX6KYz2Pa","version":"2.173.6","client":"weapp","bizEnv":"wsc","uuid":"dPN7c9aDRQbsqcZ1717150035269","ftime":new Date().getTime()}
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
  'getCountDay':'/wscump/checkin/get_activity_by_yzuid_v2.json?checkinId=3997371&app_id=wx5508c9ab0d2118ff&kdt_id=105036832&access_token='
  
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
    // await sleep(randomTime*1000)
    for (const token of userInfoList) {
      try {
        console.log('当前用户：',token.userId);
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
        await sleep(3500)
        console.log('');
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
    pushPlusSend({
      title:'7.5water签到',
      token:'04f41162bcb343129b0434a20cf3b3dc',
      content:pushStr
    })
  };
  
  processTokens()