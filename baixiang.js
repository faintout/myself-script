// cron: 40 7,18 * * *
// 抓header中Authorization  多账号换行
const {
    getCurrDay,checkTime,Env,random
  } = require('./utils.js')
  const {sendNotify} = require('./sendNotify.js')
  const $ = new Env("白象签到");
  const axios = require('axios')
  let index = 0
  const userInfoList = $.getEnvKey('baixiang').split('\n')
  if(!userInfoList.length||userInfoList[0]===''){
    // throw new Error('未找到ck')
  }
  console.log(`获取到${userInfoList.length}个ck`);
  
  const headers = {
    "Host": "dy.baixiangfood.com",
    "Connection": "keep-alive",
    // "Content-Length": "16",
    "xweb_xhr": "1",
    "Authorization": "x",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://servicewechat.com/wxeaf5d66c48160b2d/18/page-frame.html",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9"
  
    }
  const api = {
    sign: ({token,userId}) => {
        return axios({
            url: 'https://dy.baixiangfood.com/api/app/signLog/sign',
            method: 'post',
            headers:{
              ...headers,
              "Authorization": token,
            },
            data:{userId}
        })
    },
    getSignStatus: ({token,userId}) => {
        return axios({
            url:'https://dy.baixiangfood.com/api/app/signLog/getSignStatus ',
            method: 'post',
            headers:{
              ...headers,
              "Authorization": token,
            },
            data:{userId}
        })
    },
    getSignList: ({token,userId}) => {
        return axios({
            url: 'https://dy.baixiangfood.com/api/app/signLog/getSignlist ',
            method: 'post',
            headers:{
              ...headers,
              "Authorization": token,
            },
            data:{userId}
        })
    },
    getUserInfo: (token) => {
        return axios({
            url: 'https://dy.baixiangfood.com/api/app/user/getUserInfo ',
            method: 'get',
            headers:{
              ...headers,
              "Authorization": token,
            },
        })
    }
  }
  
  const getUserInfo = async (params) => {
    const {data:{data:{id,phone,integral}}} = await api.getUserInfo(params)
    if(!id){
      $.log(`账号【${index}】登录失效`)
      $.log('')
      return null
    }
    $.log(`账号【${index}】 当前用户：【${phone}】`);
    $.log(`账号【${index}】 当前积分：【${integral}】`);
    return id
  }
  const getSignStatus = async (params) => {
    const {data:{data:{signStatus},count}} = await api.getSignStatus(params)
    !signStatus&&$.log(`账号【${index}】 今日已签到`);
    $.log(`账号【${index}】 已连续签到：【${count}】天`);
    return signStatus
  }
  const userSign = async (params) => {
    const {data:{msg,count,code}} = await api.sign(params)
    if(code===200){
      $.log(`账号【${index}】 签到信息：${msg}！，获得${count}积分`);
    }else{
      $.log(`账号【${index}】 签到信息：${msg}`);
    }
  }
  
  const processTokens = async () => {
      const randomTime = random(1, 300)
      console.log('随机延迟：',randomTime + '秒');
      await $.wait(randomTime*1000)
      for (const token of userInfoList) {
        try {
          $.log('')
          index++
          const id = await getUserInfo(token)
          await $.wait(3500)
          if(!id){
            continue;
          }
          //检查签到状态
          const signStatus = await getSignStatus({token,userId:id})
          await $.wait(3500)
          if(signStatus){
            //签到
            await userSign({token,userId:id})
          }
          await $.wait(3500)
        } catch (error) {
          $.logErr(error.toString());
        }
      }
      $.log('')
      await sendNotify('白象签到', $.logs.join('<br>'))
      $.done()
    };
    
    processTokens()