// cron: 40 59 17 * * *
const axios = require('axios')
const fetch = require('node-fetch');
const https = require('https');
const url = require('url');
const {sendNotify} = require('./sendNotify.js')
const {
sleep,getCurrDay,checkTime,Env
} = require('./utils.js')
const $ = new Env('好奇车抢红包')
const userInfoList = $.getEnvKey('hqcshck').split('\n')
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);
let getTaskListStr = ''
const header = {
'Host': 'channel.cheryfs.cn',
'Connection': 'keep-alive',
'geolocation': '',
'wxappid': '619669369294712832',
'User-Agent': 'Mozilla/5.0 (Linux; Android 14; Mi14 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160065 MMWEBSDK/20230701 MMWEBID/8701 MicroMessenger/8.0.40.2420(0x28002858) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx1ddeb67115f30d1a',
'tenantId': '619669306447261696',
'activityId': '621950054462152705',
'requestUrl': 'https://channel.cheryfs.cn/archer/act/619669306447261696/619669369294712832/activity/pointsmall-detail/621950054462152705/npSrn1cIT5AkSaSz?pageId=page1607309582231&num=1&cardId=850530474589614080&anchorId=&anchorAnimateType=',
'Accept': 'application/json, text/plain, */*',
'channelCode': '',
'timestamp': '1733390591069',
'assemblyName': '%E7%A7%AF%E5%88%86%E5%95%86%E5%9F%8E%E5%85%91%E6%8D%A22',
'sign': '4a743f750023cfa3a0348368e512ace9',
'accountId': '',
'Sec-Fetch-Site': 'same-origin',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Dest': 'empty',
'Referer': 'https://channel.cheryfs.cn/archer/act/619669306447261696/619669369294712832/activity/pointsmall-detail/621950054462152705/npSrn1cIT5AkSaSz?pageId=page1607309582231&num=1&cardId=850530474589614080&anchorId=&anchorAnimateType=',
'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'zh-CN,zh;q=0.9',
'Cookie': 'uid-619669306447261696-619669369294712832=e096cb713417e83295bd965dc4e493feadf9f0cca066368bb53d2b111b1fa8e2'
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
          res(JSON.stringify(response.data))
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
    // receiveActiveTaskHttp: (ck,taskId) => {
    //   // 假设这是你要请求的URL
    //   const urlString = `https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=${taskId}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=888&exchangeNeedMoney=0&cardGoodsItemIds=`
    //   return httpInstance({
    //     parsedUrl:url.parse(urlString),
    //     headers: {
    //       ...header,
    //       'accountId':ck
    //      },
    //   })
    // }
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


const q1 = '792556957722198016'  // 1800积分 京东E卡18 元①
const q2 = '850529542367801344'  // 174积分 奇瑞微信红包1元
const q3 = '850530051048796161'  // 522积分 奇瑞微信红包3元 
const q4 = '850530474589614080'  // 870积分 奇瑞微信红包5元
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