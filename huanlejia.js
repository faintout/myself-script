// const $ = new Env("欢乐家签到");
const axios = require('axios')

const userInfoList =[
  {
    userId: '5119',
    token:"c26edd71d8a8207ca42eeeca98968e",
    data:{"is_weapp":1,"sid":"YZ1247560851788234752YZZ9ltNPg6","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"KDlYC4FgfMTHhdC1717482721417","ftime":new Date().getTime()}
  },
  {
    userId: '9929',
    token:"770f5efac2fb753c394d1245975ac9",
    data:{"is_weapp":1,"sid":"YZ1247568088281591808YZsZdouVRu","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"8yOO5yc0SSVXaG31717484999225","ftime":new Date().getTime()}

  },
  {
    userId: '8816',
    token:"f37c0e925b96ba6430c16419a1d356",
    data:{"is_weapp":1,"sid":"YZ1247568694549549056YZRY3fJOO2","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"Wv2zLmiwTtxJ8K31717485140711","ftime":new Date().getTime()}

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
  'getCountDay':'/wscump/checkin/get_activity_by_yzuid_v2.json?checkinId=4435617&app_id=wxf739eb6ad6a644da&kdt_id=146384563&access_token='
  
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
    for (const token of userInfoList) {
      try {
        console.log('当前用户：',token.userId);
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