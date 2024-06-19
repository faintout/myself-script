// const $ = new Env("联通抢任务-checkTime");
const axios = require('axios')
const cryptoJs = require("crypto-js")
const https = require("https")

//axios.defaults.timeout = 10*1000;
const receiveTaskResList = []
const receiveTaskStatusList = []
const hongbaoList = {
  102:0.2,
  103:0.3,
  105:20
}
// other
const time = (_0xf4ae11, _0xa82d5f = null)=> {
  let _0x589d7a = _0xa82d5f ? new Date(_0xa82d5f) : new Date()
  let _0x45d47f = {
    "M+": _0x589d7a.getMonth() + 1,
    "d+": _0x589d7a.getDate(),
    "h+": _0x589d7a.getHours(),
    "m+": _0x589d7a.getMinutes(),
    "s+": _0x589d7a.getSeconds(),
    "q+": Math.floor((_0x589d7a.getMonth() + 3) / 3),
    "S": padStr(_0x589d7a.getMilliseconds(), 3)
  }
  if (/(y+)/.test(_0xf4ae11)) {
    _0xf4ae11 = _0xf4ae11.replace(RegExp.$1, (_0x589d7a.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let _0x4cdf71 in _0x45d47f) if (new RegExp("(" + _0x4cdf71 + ")").test(_0xf4ae11)) {
    _0xf4ae11 = _0xf4ae11.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x45d47f[_0x4cdf71] : ("00" + _0x45d47f[_0x4cdf71]).substr(('' + _0x45d47f[_0x4cdf71]).length))
  }
  return _0xf4ae11
}
const padStr = (_0x141c28, _0x34e9d0, _0x1ab00a = {})=> {
  let _0x44ce25 = _0x1ab00a.padding || "0"
  let _0x368a06 = _0x1ab00a.mode || "l"
  let _0xd64c73 = String(_0x141c28)
  let _0x594664 = _0x34e9d0 > _0xd64c73.length ? _0x34e9d0 - _0xd64c73.length : 0
  let _0x55e887 = ''
  for (let _0x162ab9 = 0; _0x162ab9 < _0x594664; _0x162ab9++) {
    _0x55e887 += _0x44ce25
  }
  if (_0x368a06 == "r") {
    _0xd64c73 = _0xd64c73 + _0x55e887
  } else {
    _0xd64c73 = _0x55e887 + _0xd64c73
  }
  return _0xd64c73
}
//加密
const encode_woread = (params,encrypStr = 'woreadst^&*12345')=> {
  const cryptoObj = cryptoJs['AES'].encrypt(cryptoJs.enc.Utf8.parse(JSON.stringify(params)), cryptoJs.enc.Utf8.parse(encrypStr), {
    "mode": cryptoJs.mode['CBC'],
    "padding": cryptoJs.pad['Pkcs7'],
    "iv": cryptoJs.enc.Utf8.parse("16-Bytes--String")
  }).ciphertext.toString(cryptoJs.enc.Hex)
  return Buffer.from(cryptoObj, "utf-8").toString("base64")
}
const userInfoList =[
  {
    userId: '5119',
    token:'e5f4c1bfedf67b0915b3b97753b5f0a61add5fe84c40b07c7233f9d436a01ae5b7189334ea172b1cd67f3c49ea11d32bf3298d65273647d8f98c2fb37e5e9eef6cff1e0478199853134bac4374c73fdfe1d8ba87167423cce65dfa2e5018275953358267ae2b4c7c74ed3d5f347fb66fb8fce83de0cee179206188daebf91de78e17829584194af7ee5c60abdf3bfcb0ebf423eff714ed0ec4440b409f3a7bacb1b242db4fee160da53faa362b4e2b6d342994844ba801969c243b4bec62909c25446a55ef1844f0a03c54a279b76a04698e2d19050956c6dfbdab640e8c49a19227e64aa7a52d0a28d1f2f109d2afffdfeef09c9bbea344519505d7460f50bdfda30ab915f57512d46e39d1965a453964366ffa1e4720a98d5e6a678a4fbcdb1f7d4d041a14aeb9ed4f5af8a2508f25a8caf8ea17b16fb4b92928aca5803b6206ac885cdcf725426f329ab55019e6a3'
  },
  {
    userId: '5331',
    token:'7f860ca285819dd85076b2d81b82ab66b5836a40e6ab8861022bdc75a2555b3007e1e39bf082606bbe808dbac96fca2614cd3896831d4c115e04c9b438dc374c4007a3bbdfe50beefb428370853a0d15208ef0107cb10747f0400aa3977129e494b7ac5d58dd8c1a979962d76702a9ae7b1465e4b8639125066ea51426effa3198836f76c2c38620e2e0c8f8f2834ecffeabaa44ecf0762691852fc48dfb86014325585400e3ade4c4b918c8a8394382'
  },
  {
    userId: '7217',
    token:'7f860ca285819dd85076b2d81b82ab669c0d161713a00c4a658100b3b36785067ab63f18f8607dd3c4449d1a5d811a03163d3064b5574111de5b8403feb0abd6c263fe82db963a93f2029555a2acdbb0c6ffa0bf94355e143099881faa569a3255cdc00373e556e99b35610af294dd0e7f060ed6ed8ef62a89774aa1162f1014b0a323d4670033d5c355057a5a2de14f3ea6280f8ae3a9841a1230f3f30b01d14cd840952e8677923877efe14d6548a5'
  },
  {
    userId: '8742',
    token:'7f860ca285819dd85076b2d81b82ab66254728d31193cadba58036e424aef4269d134409363286cf0d1ed71a72c2555986823c1c3f2a43011a27e19c1b8d5290f21251c11b606991314e4cf68962424a371c9412656f3cb2938ad1860d8c8509c06bc1602dac3526cd919f933b975916773afccb68cd923b3d7aec104d4cd46152209f010efade1ba8d4a258d6fe82ee6519211723b7edaef2642b8377bd4daa364774e4479da1d0887b4950aa646158d507df0207aa90ab728aa0372564877d67abc03bc8959bb42c484d33d2d826bf602055a0860f3b3ba5bb34e02f0cd8fdd578ae00eb643682c2593de2928b6bff589e87c7db1025be30b478b9893c26f6a8d18c0cd0cf447913c523c1c19f8ef4609402115dc5afdf761c10aff7e202c238470c7352c2aa9a8d9ac660b418e9a195e7b3edb4793b797f5f527b0565b7dd5fe6ee6b3855059d14b8012f257bc633'
  },
  {
    userId: '166',
    token:'7f860ca285819dd85076b2d81b82ab6613a9f9bf8053fff717e75d36e7243873cb4a5ca3213b55ea787fdc930cb9077543f3f3c9de143c7bb22ece5cbd0f87303d69692aaf6ff791b5ff9450f6957b6f8d67d9745787d876d036ea35cf4a2a1f95b21a47ce871da1a75d3ce1b1818d3e3bab0ebd4e6a88d1d907d3bd031197cbdc62c5443ea3d7dd48e161b1403683416370297044f07db92dd1590fdbcc252976fc55dbcf849ae88e019edcf42cfbc8'
  },
]
const clientbaseUrl = 'https://m.client.10010.com'
const woreadbaseUrl = 'https://10010.woread.com.cn/ng_woread_service/rest'
const woreadHeaders = {
  'Host': '10010.woread.com.cn',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-cn',
  'Accept-Encoding': 'gzip, deflate, br',
  'accesstoken': 'ODZERTZCMjA1NTg1MTFFNDNFMThDRDYw',
  'Content-Type': 'application/json;charset=utf-8',
  'Origin': 'https://10010.woread.com.cn',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@11.0500}',
  'Connection': 'keep-alive',
  'Referer': 'https://10010.woread.com.cn/ng_woread/',
  // 'Content-Length': 183
  }
const url = {
  onLine :'/mobileService/onLine.htm',
  auth :'/app/auth/10000002/',
  login :'/account/login',
  receiveActiveTask :'/activity423/receiveActiveTask',
  queryActiveTaskList :'/activity423/queryActiveTaskList',
  queryCurTaskStatus :'/activity423/queryCurTaskStatus',
  queryActiveInfo :'/activity423/queryActiveInfo',
}
// 创建一个axios实例
// const axios = axios.create({
//   // baseURL: '237745fv88ix.vicp.fun',
//   // 设置代理配置
//   httpsAgent: new https.Agent({  
//     rejectUnauthorized: false
//   }),
//   proxy: {
//     host: '237745fv88ix.vicp.fun', // 代理服务器地址
//     port: 443,        // 代理服务器端口
//     protocol: 'https'   // 代理服务器协议
//   }
// });
const api = {
  onLine: (data,headers) => {
        return axios({
            url: clientbaseUrl+url.onLine,
            method: 'post',
            headers,
            data
        })
    },
  woreadAuth: (urls,data,headers) => {
        return axios({
            url: woreadbaseUrl+url.auth+urls,
            method: 'post',
            headers,
            data
        })
    },
  woreadLoginApi: (data) => {
        return axios({
            url: woreadbaseUrl+url.login,
            method: 'post',
            headers:woreadHeaders,
            data
        })
    },
  receiveActiveTask: (data) => {
        return axios({
            url: woreadbaseUrl+url.receiveActiveTask,
            method: 'post',
            headers:woreadHeaders,
            data
        })
    },
    queryTicketAccountApi: (data) => {
        return axios({
            url: woreadbaseUrl+url.queryTicketAccount,
            method: 'post',
            headers:woreadHeaders,
            data
        })
    },
    queryActiveTaskListApi: (data) => {
        return axios({
            url: woreadbaseUrl+url.queryActiveTaskList,
            method: 'post',
            headers:woreadHeaders,
            data
        })
    },
    queryCurTaskStatusApi: (data) => {
        return axios({
            url: woreadbaseUrl+url.queryCurTaskStatus,
            method: 'post',
            headers:woreadHeaders,
            data
        })
    },
    queryActiveInfoApi: (data) => {
        return axios({
            url: woreadbaseUrl+url.queryActiveInfo,
            method: 'post',
            headers:woreadHeaders,
            data
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
const getOnLine = async(token)=>{
  try{
    // time("yyyy-MM-dd hh:mm:ss")
    const params ={
      "token_online": token,
      "reqtime": time("yyyy-MM-dd hh:mm:ss"),
      "appId": "d82ac3821b50e6f05f6c684d27d252a584517c685da7130a2bd27361afb4f2e300ab1ecc5a701b4d2d4df69e795299dc08c2c5a1129381372a65a1a9a397eb16cec3c3cc0179f01df450042f3469658331cec050c7d5c50b121dc28b3f31ece6",
      "version": "iphone_c@11.0503",
      "step": "bindlist",
      "isFirstInstall": 0,
      "deviceModel": "iPhone"
    }
    const {data} = await api.onLine(params,{
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    return {
      mobile : data["desmobile"],
      name : data["desmobile"],
      ecs_token : data["ecs_token"]
    }
  }catch(e){
    console.log('联通登录失败',e);
    // return getOnLine(token)
  }
}
const getWoreadAuth = async()=>{
  try{
      const params = {
        timestamp: time("yyyyMMddhhmmss")
      }
      let timeStr = Date.now().toString()
      let timeMD5 = cryptoJs.MD5("100000027k1HcDL8RKvc" + timeStr).toString()
      const signParams = {
        sign: encode_woread(params)
      }
      const {data:{data:{accesstoken}}} = await api.woreadAuth(timeStr + "/" + timeMD5, signParams)
      woreadHeaders.accesstoken = accesstoken
  }catch(e){
    console.log('e',e?.cause||e.toString()||e);
  }
}
const getWoreadLogin = async(mobile)=>{
  try{
    let params = {
      "phone": mobile,
      "timestamp": time("yyyyMMddhhmmss")
    }
    const signParams = {
      sign: encode_woread(params)
    }
    const {data} = await api.woreadLoginApi(signParams)
    if(data.code==='9999'){
      console.log(data);
      return {}
    }
    console.log('登录成功！',data?.data?.phone);
    return data.data
  }catch(e){
    //登录失败
    console.log('登录失败',e?.cause||e.toString()||e);
    //重试一次
    return getWoreadLogin(mobile)
  }
}
const getWoreadReceiveActiveTask = async(args)=>{
  try{
    const {token,userid,userindex,phone,verifycode,taskId} = args
    const otherParams = {
      "timestamp": time("yyyyMMddhhmmss"),
      "token": token,
      "userid": userid,
      "userId": userid,
      "userIndex": userindex,
      "userAccount": phone,
      "verifyCode": verifycode
    };
    const params = {
      "activeId": 16,
      "taskId": taskId,
      ...otherParams
    }
    // return 
    const signParams = {
      sign: encode_woread(params)
    }
    const key = `【${phone}】-【${hongbaoList[taskId]}】`
    console.log(`${key}请求时间：`,getCurrDay());
    return api.receiveActiveTask(signParams)
    // if(data.code==='0000'){
    //   return
    // }
    
    // receiveTaskMap[key] = receiveTaskMap[key] ? receiveTaskMap[key]+1 : 1
    // console.log('当前任务领取失败累计次数',key,receiveTaskMap[key]);
    // if(receiveTaskMap[key]>=referSecond){
    //   return
    // }
    // await sleep(300)
    // getWoreadReceiveActiveTask({readToken,userid,userindex,mobile,verifycode,taskId,referSecond})
  }catch(e){
    console.log('任务领取失败',e?.cause||e.toString()||e);
    return getWoreadReceiveActiveTask(args)
  }
}
const queryCurTaskStatus = async(args)=>{
  try{
    const {userindex,verifycode,userid,phone,token} = args
    const otherParams = {
      "timestamp": time("yyyyMMddhhmmss"),
      "token": token,
      "userid": userid,
      "userId": userid,
      "userIndex": userindex,
      "userAccount": phone,
      "verifyCode": verifycode
    };
    const params = {
      "activeIndex": 16,
      ...otherParams
    }
    // return 
    const signParams = {
      sign: encode_woread(params)
    }
    const {data:data} = await api.queryCurTaskStatusApi(signParams)
    receiveTaskStatusList.push({...data,phone})
  }catch(e){
    console.log('任务查询失败',e?.cause||e.toString()||e);
    queryCurTaskStatus(args)
  }
}
const queryActiveInfo = async(args)=>{
  try{
    const {userindex,verifycode,userid,phone,token} = args
    const params = {
      "timestamp": time("yyyyMMddhhmmss"),
      "signtimestamp": Date.now(),
      "source": "9",
      "token": token
    };
    // return 
    const signParams = {
      sign: encode_woread(params)
    }
    const {data:data} = await api.queryActiveInfoApi(signParams)
    console.log(data)
  }catch(e){
    console.log('任务查询失败',e?.cause||e.toString()||e);
    // queryCurTaskStatus(args)
  }
}
const queryTicketAccount = async()=>{
  try{
    // const params = {
    //   "timestamp": time("yyyyMMddhhmmss"),
    //   "token": readToken,
    //   "userid": userid,
    //   "userId": userid,
    //   "userIndex": undefined,
    //   "userAccount": mobile,
    //   "verifyCode":verifycode
    // }
    // const params = {
    //   "activeId": '15',
    //   "taskId": taskId,
    //   ...otherParams
    // }
    // console.log('params',params);
    // return 
    const signParams = {
      sign: encode_woread({"activeIndex":16,"timestamp":"20240602000057","token":"c35451d75561edc6d12672551f4803e3","userid":"96052770399","userId":"96052770399","userAccount":"13070155119","verifyCode":"s68wLkhjRxu"})
    }
    console.log('signParams',signParams);
    const data = await api.queryTicketAccountApi(signParams)
    console.log('data',data);
  }catch(e){
    console.log('e',e?.cause||e.toString()||e);
  }
}
//监测时间
const checkTime = async()=>{
  const targetMinutes = 47;
  const targetSeconds = 57;
  const targetMilliseconds = 500;

  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    targetSeconds,
    targetMilliseconds
  );

  const delay = targetTime - now;

  console.log(`等待${delay/1000}秒后执行`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('开始执行抢任务!');
      resolve();
    }, delay);
  });
}

const queryActiveTaskList = async(args)=>{
  try{
    const {userindex,verifycode,userid,phone,token} = args
    const otherParams = {
      "timestamp": time("yyyyMMddhhmmss"),
      "signtimestamp": Date.now(),
      "source": "9",
      "token": token
    };
    const params = {
      "activeIndex": 16,
      ...otherParams
    }
    const signParams = {
      sign: encode_woread(params)
    }
    const data = await api.queryActiveTaskListApi(signParams)
    console.log('data',data);
  }catch(e){
    console.log('e',e?.cause||e.toString()||e);
  }
}
async function concurrentPromises(promiseFunction,args, count,timeout = 0) {
  // const promises = [];
  const {phone,taskId} =  args
  const key = `【${phone}】-【${hongbaoList[taskId]}】`
  // Create the specified number of promises
  for (let i = 0; i < count; i++) {
      if(timeout){
        await sleep(timeout)
      }
      promiseFunction(args).then(res=>{
        console.log(`${getCurrDay()}-${key} :`,res.data);
        receiveTaskResList.concat({
          data:res.data,
          mobile:key
        })
      }).catch(e=>{
        console.error('任务并发错误：', e?.cause||e.toString()||e);
      })
  }

  // try {
  //     // Wait for all promises to resolve
  //     const results = await Promise.all(promises);
  //     // Print all results
  //     const taskResults = results.map(res=>{
  //       console.log(`${getCurrDay()}-${key} :`,res.data);
  //       return 
  //     })
      
  // } catch (e) {
      
  // }
}
const processTokens = async () => {
    for (const user of userInfoList) {
      const { token} = user;
      await sleep(100)
      getOnLine(token).then(onLineRes=>{
        const {mobile,bname,ecs_token} = onLineRes
        console.log('任务开始，当前账号：',mobile);
        getWoreadLogin(mobile).then(async res=>{
          if(!Object.keys(res).length){
            return
          }
          await checkTime()
          concurrentPromises(getWoreadReceiveActiveTask,{...res,taskId:105},50,80)
          await sleep(200)
          concurrentPromises(getWoreadReceiveActiveTask,{...res,taskId:103},20,200)
          await sleep(200)
          concurrentPromises(getWoreadReceiveActiveTask,{...res,taskId:102},20,200)
          queryCurTaskStatus(res)
        })
      })
    }
  };
  //遍历三遍
(async()=>{
  await processTokens()
  await sleep(1000*15)
  console.log('领取成功列表:',receiveTaskResList.filter(task=>task?.data?.code==='0000'));
  receiveTaskStatusList.map(status=>{
    if(status.data){
      status.data = status.data.map(data=>{
        const {groupName,bindActiveId} =  data.taskDetail.materialGroup
        return {groupName,bindActiveId}
      })
      status.data = JSON.stringify(status.data)
    }
  })
  console.log('领取结果列表:',receiveTaskStatusList);
  
  
})()