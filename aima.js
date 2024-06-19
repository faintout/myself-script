// const $ = new Env("爱玛签到");
const axios = require('axios')

const userInfoList =[
  {
    userId: '5119',
    'Sign':'91df7b089fa8d7775616ac13bacdf8c5',
    'TraceLog-Id':"088a0d3b-a78f-4bad-8bbb-6a3ca8ab2657",
    'Access-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvTFZEVGpsMTRUTVlFTVFNNUdIZkowSHBKTGNNIiwib3BlbmlkIjoib0JPOGM0OWFwR1pPQWZtNndIVlA2a2ZMTTh2VSIsIm1vYmlsZSI6IjEzMDcwMTU1MTE5IiwidXNlclR5cGUiOiJNRU1CRVIiLCJleHAiOjE3MjAwNzQ2NzYsImJlbG9uZ1RvSWQiOjEsImlhdCI6MTcxNzQ4MjY3NiwibWVtYmVySWQiOjEyNzE4NjMwMn0.r1N53H3wr_Wk25xxxlRllLO_5ri7ILidRd2oyDpyZ_s'
  },
  {
    userId: '9929',
    'Sign':'63b263c0cc50b9c8234612860aa60011',
    'TraceLog-Id':"65e2dd76-683d-48d6-889c-fbe51ef786bf",
    'Access-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvTFZEVGp0ek1pOU1EZG1Bd2JnUnI2M2VOaDh3Iiwib3BlbmlkIjoib0JPOGM0NHRBX2Z3eEY5WllVY2cxWVJ2Uy1YcyIsIm1vYmlsZSI6IjEzMjQwMjk5OTI5IiwidXNlclR5cGUiOiJNRU1CRVIiLCJleHAiOjE3MjAzMjE2NDEsImJlbG9uZ1RvSWQiOjEsImlhdCI6MTcxNzcyOTY0MSwibWVtYmVySWQiOjEyNzI0NDE2N30.dW5qI3Bd7-f09npjSvlQhfC7CA1Vo3-e4nPjqETK7WA'
  },
  {
    userId: '5119',
    'Sign':'1350e8bd518fe0f4774edf482f12d32c',
    'TraceLog-Id':"32038ddb-943c-4a5b-a01c-a1fcb5602d9f",
    'Access-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvTFZEVGpxOF9ZalNJbGp2aWt3cm5XNC0xYW9vIiwib3BlbmlkIjoib0JPOGM0NXpsTTRCNGE4VlJlUDlyOW1nc2VidyIsIm1vYmlsZSI6IjE4MjAxNjQ4ODE2IiwidXNlclR5cGUiOiJNRU1CRVIiLCJleHAiOjE3MjAzMjE3NDYsImJlbG9uZ1RvSWQiOjEsImlhdCI6MTcxNzcyOTc0NiwibWVtYmVySWQiOjEyNzI0NDIxN30.IUYO6UbOeodCPjHdop_VBYkhscCtayVHw6MRxi4fwd4'
  },
  // {
  //   userId: '9929',
  //   token:"770f5efac2fb753c394d1245975ac9",
  //   data:{"is_weapp":1,"sid":"YZ1247568088281591808YZsZdouVRu","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"8yOO5yc0SSVXaG31717484999225","ftime":new Date().getTime()}

  // },
  // {
  //   userId: '8816',
  //   token:"f37c0e925b96ba6430c16419a1d356",
  //   data:{"is_weapp":1,"sid":"YZ1247568694549549056YZRY3fJOO2","version":"2.171.8","client":"weapp","bizEnv":"wsc","uuid":"Wv2zLmiwTtxJ8K31717485140711","ftime":new Date().getTime()}
  // },
]
const baseUrl = 'https://scrm.aimatech.com/aima/wxclient/mkt/activities/sign:'
const headers = {
  'Host': 'scrm.aimatech.com',
  'Connection': 'keep-alive',
  // 'Content-Length': 49,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/9129',
  'Time-Stamp': new Date().getTime(),
  'Content-Type': 'application/json',
  'TraceLog-Id': '',
  'Access-Token': '',
  'xweb_xhr': 1,
  'App-Id': 'scrm',
  'Sign': '',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wx2dcfb409fd5ddfb4/161/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  }
const url = {
  'join':'join',
  'search':'search'
  
}
const api = {
  join: (token) => {
    delete token.userId
      return axios({
          url: baseUrl+'join',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":"100000893","activitySceneId":null}
      })
  },
  search: (token) => {
    delete token.userId
      return axios({
          url: baseUrl+'search',
          method: 'post',
          headers:{
            ...headers,
            ...token
          },
          data:{"activityId":"100000893"}
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
    for (const token of userInfoList) {
      try {
        const randomTime = random(1, 300)
        console.log('随机延迟：',randomTime);
        await sleep(randomTime*1000)
        console.log('当前用户：',token.userId);
        const {data} = await api.join(token)
        if(data.code===200){
          console.log('签到信息：签到成功！，获得',data?.content?.point+'积分');
        }else{
          console.log('签到信息：',data?.chnDesc);
        }
        await sleep(2000)
        const {data:{content:{signed}}} = await api.search(token)
        console.log('连续签到天数：',signed);
        await sleep(3500)
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
  };
  
  processTokens()