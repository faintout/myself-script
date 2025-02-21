// cron: 40 8,17 * * *
// 抓header中的token 多账号换行 
// export bagua="1ef1e1c6-xxe"
const {
    getCurrDay,checkTime,Env,random
  } = require('./utils.js')
  const {sendNotify} = require('./sendNotify.js')
  const $ = new Env("叭卦商城优选签到");
  const axios = require('axios')
  const userInfoList = $.getEnvKey('bagua').split('\n')
  if(!userInfoList.length||userInfoList[0]===''){
    throw new Error('未找到ck')
  }
  console.log(`获取到${userInfoList.length}个ck`);
  
  const baseUrl = 'https://shop.bg19.cn/api/wanlshop'
  const headers = {
    'Host': 'shop.bg19.cn',
    'Connection': 'keep-alive',
    'xweb_xhr': 1,
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'App-Client': 'mp-wanlshop',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/13283',
    'token': '1ef1e1c6-ece0-4abe-a625-64eab88cfebe',
    'Content-Type': 'pplication/json;charset=UTF-8',
    'Accept': '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://servicewechat.com/wxce969b8fdc6de2aa/266/page-frame.html',
    'Accept-Encoding':' gzip, deflate, br',
    }
  const url = {
    'signIn':'/Punch/click',
    'userInfo':'/user/refresh ',
  }
  const api = {
    signIn: (token) => {
      headers.token = token
          return axios({
              url: baseUrl+url.signIn,
              method: 'get',
              headers,
          })
      },
      userInfo: (token) => {
        headers.token = token
        return axios({
            url: baseUrl+url.userInfo,
            method: 'post',
            headers
        })
    },
  }
  const processTokens = async () => {
    let index = 0 //用来给账号标记序号, 从1开始
    const randomTime = random(1, 300)
    console.log('随机延迟：',randomTime + '秒');
    await $.wait(randomTime*1000)
      for (const token of userInfoList) {
        try {
          $.log('')
          index++
          const data = await api.userInfo(token)
          const mobile = data?.data?.data?.userinfo?.mobile
          if(!mobile){
            $.log(`账号【${index}】登录失效`)
            $.log('')
            continue;
          }
          $.log(`账号【${index}】 当前用户：${mobile}`);
          await $.wait(2000)
          const {data:{data:{msg}}} = await api.signIn(token)
          $.log(`账号【${index}】 签到信息：${msg}`);
          await $.wait(2000)
          const infoData = await api.userInfo(token)
          const currentScore = infoData?.data?.data?.userinfo?.score
          $.log(`账号【${index}】 当前积分：${currentScore}`);
          await $.wait(3500)
        } catch (error) {
          $.logErr(error.toString());
        }
      }
      $.log('')
      $.logs = $.logs.join('<br>')
    };
    
    processTokens().finally(async() => {
       await sendNotify('叭卦商城优选签到',$.logs)
      $.done()
    });