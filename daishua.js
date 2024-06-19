// const $ = new Env("代刷网签到");
const axios = require('axios')
const cron = require('node-cron');

const http2 = require('http2');


const headers = {
  ":authority":'nmnm.veay.cn',
  ":method":"GET",
  ":path": '/user/ajax_user.php?act=',
  ":scheme":'https',
  'Accept':'application/json, text/javascript, */*; q=0.01',
  'Accept-Encoding':'gzip, deflate, br, zstd',
  'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8',
  'Cache-Control':'no-cache',
  'Pragma':'no-cache',
  'Priority':'=u=1, i',
  'Referer':'https://nmnm.veay.cn/user/qiandao.php',
  'Sec-Ch-Ua':'"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  'Sec-Ch-Ua-Mobile':'?0',
  'Sec-Ch-Ua-Platform':"Windows",
  'Sec-Fetch-Dest':'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site':'same-origin',
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'X-Requested-With':'XMLHttpRequest',
  }
  const tokensList = [
    '_aihecong_chat_channelIds=%5B%7B%22customerId%22%3A%226639c2afd22cfa230e6b7c71%22%2C%22channelId%22%3A%22link12700%22%7D%5D; PHPSESSID=rpkqikoeqkt2i6tt630rgl5k0b; mysid=03679a32403c31ee2a5848913ce5d7cd; user_token=ad0fxfRJWrxenHxnQOtR9g9OMBF5qk%2FIxQcsLPL2aSmaMthVF1OBz9cuBygmsBC%2Fv26eMoRRY9A%2FW03cYHnXAhNg%2BdQ; sec_defend=f1c1051e46c041eeace01c756727be8f659aaed86efc5da67df73285fbee7dd7; counter=9; _aihecong_chat_visibility=false'
]

const http2Req = ({url,headers})=>{
  return new Promise((res,rej)=>{
    const client = http2.connect(url);
    const req = client.request({
      ...headers,
      // 其他的伪头字段或者普通的HTTP头字段
    });
    
    req.on('response', (headers, flags) => {
      // for (const name in headers) {
      //   console.log(`${name}: ${headers[name]}`);
      // }
    });
    
    req.setEncoding('utf8');
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', ()=>{
      res(JSON.parse(data));
      client.close();
    });
    req.end();
  })
}



const baseUrl = 'https://nmnm.veay.cn/user/ajax_user.php?act='
const url = {
    qiandao:'qiandao',
    qdcount:'qdcount',
}


const api = {
    qiandao: (token) => {
        return http2Req({
            url: baseUrl+url.qiandao,
            headers: {...headers, 'Cookie': token,':path':headers[':path']+url.qiandao},
        })
        
    },
    qdcount: (token) => {
        return http2Req({
            url: baseUrl+url.qdcount,
            headers: {...headers, 'Cookie': token,':path':headers[':path']+url.qdcount},
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

    // 将年、月、日拼接成所需格式的日期字符串
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}
const processTokens = async () => {
    for (const token of tokensList) {
      try {
        const {rewardcount:beforeRewardcount} = await api.qdcount(token);
        console.log('当前现金：',beforeRewardcount);
        await sleep(3000);
        const {msg} = await api.qiandao(token);
        console.log('签到信息：', msg);
  
        await sleep(1500);
  
        const {rewardcount} = await api.qdcount(token);
        console.log('当前现金：',rewardcount);
        console.log('');
  
        await sleep(3500);
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
  };
  
  const task = cron.schedule('0 9,17 * * *', () => {
        console.log(getCurrDay())
        //开始签到
    processTokens()
  }, {
    scheduled: true
  });
  console.log('任务开始...')
  // 启动任务
  task.start();