// const $ = new Env("欢乐家签到");
const axios = require('axios')
// userId为自定义标识
const userInfoList =[
  {
    userId: '138xxxx',
    token:"xxx",
    data:{"is_weapp":1,"sid":"YZxxx","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"xx","ftime":new Date().getTime()}
  },
  {
    userId: '138xxxx',
    token:"770f5xxxx",
    data:{"is_weapp":1,"sid":"YZxxx","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"xx","ftime":new Date().getTime()}
  },
]
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
  'checkin':'/wscump/checkin/checkinV2.json?checkinId=4435617&app_id=wxf739eb6ad6a644da&kdt_id=146384563&access_token=',
  'getCountDay':'/wscump/checkin/get_activity_by_yzuid_v2.json?checkinId=4435617&app_id=wxf739eb6ad6a644da&kdt_id=146384563&access_token=',
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
        const data = await api.userInfo(token)
        const {mobile} = data?.data?.data?.userInfo||{mobile:'未获取到手机号'}
        console.log('当前用户：',mobile);
        await sleep(2000)
        const {data:{msg}} = await api.checkin(token)
        console.log('签到信息：',msg);
        await sleep(2000)
        const {data:{data:{continuesDay}}} = await api.getCountDay(token)
        console.log('连续签到天数：',continuesDay);
        await sleep(3500)
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
  };
  
  processTokens()