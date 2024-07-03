const axios = require('axios')
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
const headers = {
  'Host': 'channel.cheryfs.cn',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-cn',
  'Accept-Encoding': 'gzip, deflate, br',
  'wxappid': '619669369294712832',
  'Content-Type': 'application/json;charset=utf-8',
  'accountId': '',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b11)XWEB/11065',
  'Connection': 'keep-alive',
  'activityId': '621950054462152705',
  'tenantId': '619669306447261696'
  }

const api = {

  receiveActiveTask: (ck,taskId) => {
        return axios({
            url: `https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=${taskId}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=10&exchangeNeedPoints=0&cardGoodsItemIds=`,
            method: 'get',
            headers:{
              ...headers,
              accountId: ck
            },
        })
    }
}


const getReceiveActiveTask = async({ck,taskId})=>{
  try{
    
    console.log(`请求时间：`,getCurrDay());
    return api.receiveActiveTask(ck,taskId)
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
        console.log(res.data)
        getTaskListStr+=('<br>'+JSON.stringify(res.data))
      }).catch(e=>{
        console.error('任务并发错误：',e.toString());
        promiseFunction(args).then(res=>{
          getTaskListStr+=('<br>'+JSON.stringify(res.data))
        }).catch(e=>{
          console.error('任务二次并发错误：', e.toString());
        })
      })
  }

  }
const processTokens = async () => {
    for (const user of userInfoList) {
      checkTime({
        seconds:55,
        milliseconds:0
      }).then(res=>{
        concurrentPromises(getReceiveActiveTask,{ck:user,taskId:q4},70,80)
      })
    }
  };
(async()=>{
  await processTokens()
  await sleep(1000*60*2)
  sendNotify('好奇车领取结果',getTaskListStr)
})()