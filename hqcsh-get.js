const axios = require('axios')
const fetch = require('node-fetch');
const https = require('https');
const url = require('url');
const {sendNotify} = require('./sendNotify.js')
const {
sleep,getCurrDay,checkTime,Env
} = require('./utils.js')
const $ = Env('好奇车抢红包')
const userInfoList = $.getEnvKey('hqcshck').split('&')
if(!userInfoList.length){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);
let getTaskListStr = ''
const header = {
'Host': 'channel.cheryfs.cn',
'Connection': 'keep-alive',
'geolocation': '',
'wxappid': '619669369294712832',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b11)XWEB/11065',
'tenantId': '619669306447261696',
'activityId': '621950054462152705',
'requestUrl': 'https://channel.cheryfs.cn/archer/act/619669306447261696/619669369294712832/activity/pointsmall-detail/621950054462152705?pageId=page1607309582231&num=1&cardId=622188100122075136&anchorId=&anchorAnimateType=',
'Accept': 'application/json, text/plain, */*',
'channelCode': '',
'timestamp': '1720074414164',
'assemblyName': '%E7%A7%AF%E5%88%86%E5%95%86%E5%9F%8E%E5%85%91%E6%8D%A22',
'sign': '1631dc8d17da583f0b09e6b2e17fd4bf',
'accountId': '',
'Sec-Fetch-Site': 'same-origin',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Dest': 'empty',
'Referer': 'https://channel.cheryfs.cn/archer/act/619669306447261696/619669369294712832/activity/pointsmall-detail/621950054462152705?pageId=page1607309582231&num=1&cardId=622188100122075136&anchorId=&anchorAnimateType=',
'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'zh-CN,zh;q=0.9',
}
  const httpInstance = ({parsedUrl,headers})=>{
    return new Promise((res,rej)=>{
      const options = {
        protocol: parsedUrl.protocol, // 如 'http:'
        hostname: parsedUrl.hostname, // 如 'example.com'
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80), // 如果端口未指定，则默认为http的80或https的443
        path: parsedUrl.path, // 如 '/path/to/resource'
        method: 'GET',
        headers
      };
      https.request(options,req=>{
        req.on('response', (headers, flags) => {
          console.log(headers, flags);
          // for (const name in headers) {
          //   console.log(`${name}: ${headers[name]}`);hhhhhhhhhh
          // }
        });
        
        // req.setEncoding('utf8');
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', ()=>{
          console.log('data',data);
          res(JSON.parse(data));
          // client.close();
        });
        req.on('error', (error) => {
          console.error('Error during request:', error);
        });
        req.end();
      })

    })
  }
const api = {

  receiveActiveTask: (ck,taskId) => {
        return new Promise(async res=>{
          const response =   await axios({
              url: `https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=${taskId}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=888&exchangeNeedMoney=0&cardGoodsItemIds=`,
              method: 'get',
              headers:{
              ...header,
              'accountId':ck
              },
          })
          console.log("")
          res(JSON.stringify(response.data?.result))
        })
    },
  receiveActiveTaskFetch: (ck,taskId) => {
        return new Promise(async res=>{
          const response = await fetch(
            `https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=${taskId}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=888&exchangeNeedMoney=0&cardGoodsItemIds=`,
            {
              method: "GET",
              headers: {
                ...header,
                'accountId':ck
               },
            }
          )
          const data = await response.json()
          console.log('task fetch',JSON.stringify(data));
          console.log("")
          res(JSON.stringify(data))
        })
    },
  receiveActiveTaskGot: (ck,taskId) => {
        return new Promise(async res=>{
          const gots = (await import('got'))?.default
          const response = await gots(
            `https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=${taskId}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=888&exchangeNeedMoney=0&cardGoodsItemIds=`,
            {
              method: "GET",
              headers: {
                ...header,
                'accountId':ck
               },
            }
          )
          console.log('task got',response.body);
          console.log("")
          res(response.body)
        })
    },
    receiveActiveTaskHttp: (ck,taskId) => {
      // 假设这是你要请求的URL
      const urlString = `https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=${taskId}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=888&exchangeNeedMoney=0&cardGoodsItemIds=`
      return httpInstance({
        parsedUrl:url.parse(urlString),
        headers: {
          ...header,
          'accountId':ck
         },
      })
    }
}


const getReceiveActiveTask = async({ck,taskId})=>{
  try{
    
    console.log(`请求时间：`,getCurrDay());
    return api.receiveActiveTask(ck,taskId)
    // api.receiveActiveTaskGot(ck,taskId)
   // return api.receiveActiveTaskFetch(ck,taskId)
    // return api.receiveActiveTaskHttp(ck,taskId)
  }catch(e){
    console.log('任务领取失败',e.toString()||e);
    return getReceiveActiveTask({ck,taskId})
  }
}


const q1 = '647894196522340352'  // 188积分 1.08元
const q2 = '622187839353806848'  // 288积分 1.88元
const q3 = '622187928306601984'  // 588积分 3.88元
const q4 = '622188100122075136'  // 888积分 5.88元
async function concurrentPromises(promiseFunction,args, count,timeout = 0) {
  for (let i = 0; i < count; i++) {
      if(timeout){
        await sleep(timeout)
      }
      promiseFunction(args).then(res=>{
        console.log(res)
        getTaskListStr+=('<br>'+res)
      }).catch(e=>{
        console.error('任务并发错误：',e.toString());
        promiseFunction(args).then(res=>{
          getTaskListStr+=('<br>'+res)
        }).catch(e=>{
          console.error('任务二次并发错误：', e.toString());
        })
      })
  }

  }
const processTokens = async () => {
    for (const user of userInfoList) {
      checkTime({
        seconds:45,
        milliseconds:0
      }).then(res=>{
        concurrentPromises(getReceiveActiveTask,{ck:user,taskId:q4},170,100)
      })
    }
  };
(async()=>{
  await processTokens()
  await sleep(1000*60*2)
  sendNotify('好奇车领取结果',getTaskListStr)
})()