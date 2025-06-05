// cron: 40 8,17 * * *
// 商品id列表 1-大麦茶 2-桂花乌龙 3-茉莉乌龙
// 抓header中的Authorization 去掉bearer 多账号换行 如需抢购 追加 &商品id&addressId addressId是添加地址接口会返回 例如大麦茶就是 &1&addressId 
// export sandeli="8e09bfc0xxx
// 770f5xxxx"
const {
  getCurrDay,checkTime,Env,random
} = require('./utils.js')
const {sendNotify} = require('./sendNotify.js')
const $ = new Env("三得利签到");
const axios = require('axios')
const userInfoList = $.getEnvKey('sandeli').split('\n')
const isGetGoods = process.env['sandeli_get'] || false
const requestCount = 125
const getGoodsSuccessList = ['抢券成功账号列表']
const goodsList = [
  {
    id:1,
    name:'三得利 大麦茶15瓶',
    activeId:'516',
    goodsId:'7305855462092832768',

  },
  {
    id:2,
    name:'三得利 植物茶黑豆茶15瓶',
    goodsId:'7316120183365910528',
    activeId:'522',
  },
  {
    id:3,
    name:'三得利 沁莓水15瓶',
    activeId:'523',
    goodsId:'7321170253731782656',
  },
    {
    id:4,
    name:'三得利 茉莉乌龙15瓶（新包装）',
    activeId:'456',
    goodsId:'7272962282673364992',
  }
]
if(!userInfoList.length||userInfoList[0]===''){
  throw new Error('未找到ck')
}
console.log(`获取到${userInfoList.length}个ck`);

const baseUrl = 'https://xiaodian.miyatech.com/api'
const headers = {
  'Host': 'xiaodian.miyatech.com',
  'Connection': 'keep-alive',
  'X-VERSION': '2.1.3',
  'Authorization': '',
  'HH-VERSION': '0.2.8',
  'componentSend': 1,
  'HH-FROM': '20230130307725',
   'HH-APP': 'wxb33ed03c6c715482',
  'appPublishType': 1,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b13)XWEB/11065',
  'Content-Type': 'application/json;charset=UTF-8',
  'xweb_xhr': 1,
  'HH-CI': 'saas-wechat-app',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wxb33ed03c6c715482/28/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9'
  }
const url = {
  'signIn':'/coupon/auth/signIn',
  'userInfo':'/user/member/info ',
  'goods':'/order/center/order/submit'
}
const api = {
  signIn: (token) => {
    headers.Authorization = 'bearer '+token
        return axios({
            url: baseUrl+url.signIn,
            method: 'post',
            headers,
            data:{"miniappId":159}
        })
    },
    userInfo: (token) => {
    headers.Authorization = 'bearer '+token
      return axios({
          url: baseUrl+url.userInfo,
          method: 'post',
          headers,
          data:{}
      })
  },
    getGoods: (cks) => {
      const token = cks.split('&')[0]
      const id = cks.split('&')[1]
      const activeId = goodsList.find(goods=>goods.id==id).activeId
      const goodsId = goodsList.find(goods=>goods.id==id).goodsId
      const addressId = cks.split('&')[2]
    headers.Authorization = 'bearer '+token
      return axios({
          url: baseUrl+url.goods,
          method: 'post',
          headers,
          data:{"businessType":"POINTS_MALL","pointMallSubmitRequest":{"exchangeActivityId":activeId,"productBizNo":goodsId,"discountType":"GOODS","addressId":Number(addressId)}}
      })
  },
}
const getGoods = async (cks) => {
  try {
    const id = cks.split('&')[1]
    const mobile = cks.split('&')[3]
    const goodsName = goodsList.find(goods=>goods.id==id).name
    $.log(`🕊账号[${mobile}] 开始抢券-${getCurrDay()}...`);
    
    let { data: result} = await api.getGoods(cks)
    if (result?.code == 200) {
        $.log(`🕊账号[${mobile}] - ${goodsName} - ${getCurrDay()} 抢券成功！返回参数[${JSON.stringify(result.data)}]🎉`);
        getGoodsSuccessList.push(`🕊账号[${mobile}] - ${goodsName} - ${getCurrDay()} 抢券成功！`)
    }else {
        $.log(`🕊账号[${mobile}] - ${goodsName} - ${getCurrDay()} 抢券失败:${result.msg}🚫`)
    }
    
  } catch (e) {
      console.log(e);
  }
}
const processTokens = async () => {
  let index = 0 //用来给账号标记序号, 从1开始
  const date = new Date()
  const hour = date.getHours()
  if(isGetGoods&&hour===9){
    $.log(`当前为抢券时段,开始执行抢券任务`);
    //前期准备工作
      for (let i = userInfoList.length - 1; i >= 0; i--) {
          const token = userInfoList[i].split('&')[0]
          const goodsId = userInfoList[i].split('&')[1]
          const addressId = userInfoList[i].split('&')[2]
          if(!goodsId||!addressId){
            $.log(`账号【${i}】没有设置抢购参数,跳过当前账号`);
            userInfoList.splice(i, 1);
            continue;
          }
          //查询用户信息
          const infoData = await api.userInfo(token)
          const currentScore = infoData?.data?.data?.currentScore||0
          const mobile = infoData?.data?.data?.phone
          if(!mobile){
            $.log(`账号【${i}】登录失效,跳过当前账号`)
            userInfoList.splice(i, 1);
            continue;
          }
          if(Number(currentScore)<1800){
            $.log(`账号【${mobile}】当前积分${currentScore}小于1800,跳过当前账号`);
            userInfoList.splice(i, 1);
            continue;
          }
          
          userInfoList[i]+=`&${mobile}`
          await $.wait(2500)
      }
      if(!userInfoList.length){
        $.log('没有符合条件的账号,结束抢购任务');
        return
      }
      $.log(`筛选出${userInfoList.length}个账号:`);
      $.log(userInfoList.map(user=>user.split('&')[3]).join('\n'));
      const count = Math.floor(requestCount/userInfoList.length)
      $.log(`抢购循环次数为${count}`)
      //当前模式为抢购模式
      await checkTime({
        hours:9,
        minutes:59,
        seconds:59,
        milliseconds:0
      })

      for(let i=0;i<count;i++){
          index = 1 //每次重置序号为1
          for (let cks of userInfoList) {
              await $.wait(20)
              index = index + 1 //每次用完序号+1
              //开始账号任务
              getGoods(cks)
          }
      }
      $.log('')
      $.logs=getGoodsSuccessList.join('\n')+'\n'+$.logs.join('<br>')
      console.log(getGoodsSuccessList.join('\n'))
      return 
  }
  const randomTime = random(1, 300)
  console.log('随机延迟：',randomTime + '秒');
  await $.wait(randomTime*1000)
    for (const tokens of userInfoList) {
      try {
        const token = tokens.split('&')[0]
        $.log('')
        index++
        const data = await api.userInfo(token)
        const mobile = data?.data?.data?.phone
        if(!mobile){
          $.log(`账号【${index}】登录失效`)
          $.log('')
          continue;
        }
        $.log(`账号【${index}】 当前用户：${mobile}`);
        await $.wait(2000)
        const {data:{msg}} = await api.signIn(token)
        $.log(`账号【${index}】 签到信息：${msg}`);
        await $.wait(2000)
        const infoData = await api.userInfo(token)
        const currentScore = infoData?.data?.data?.currentScore
        $.log(`账号【${index}】 当前积分：${currentScore}`);
        await $.wait(3500)
      } catch (error) {
        $.logErr(error.toString());
      }
    }
    $.log('')
    $.logs = $.logs.join('\n\n')
  };
  
  processTokens().finally(async() => {
     await sendNotify('三得利任务',$.logs)
    $.done()
  });