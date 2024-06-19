// const $ = new Env("爱玛签到");
const axios = require('axios')

const userInfoList =[
  {
    userId: '138xxxx',
    'Sign':'63b263cxxx',
    'TraceLog-Id':"088a0d3bxxx",
    'Access-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.xxxxx'
  },
  {
    userId: '138xxxx',
    'Sign':'63b263cxxx',
    'TraceLog-Id':"088a0d3bxxx",
    'Access-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.xxxxx'
  },
  {
    userId: '138xxxx',
    'Sign':'1350exxxx',
    'TraceLog-Id':"088a0d3bxxx",
    'Access-Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.xxxxx'
  },
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