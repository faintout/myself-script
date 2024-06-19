// const $ = new Env("臭宝签到");
const axios = require('axios')
let pushStr = ''
const consoleold = console.log
console.log = (...args)=>{
  pushStr = pushStr.concat(args.join(' ')+'\r\n')
  consoleold(...args)
}
const userInfoList =[
  {
    userId: '5119',
    token:"BearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgyNjUzNTcsInVzZXJfbmFtZSI6Im9mc0tCNU4ycHRoY0otdHF3M2pNaGd1Q3ZXbVUiLCJhdXRob3JpdGllcyI6WyJXblByaW5jaXBhbDpleUppWVhOcFkxVnpaWElpT25zaWRYTmxja2xrSWpvek1UTTJOekUzTENKMWMyVnlRMjlrWlNJNklrMVZNakF5TkRBMk1URXdOems0T0RJaUxDSjFjMlZ5VG1GdFpTSTZJbTltYzB0Q05VNHljSFJvWTBvdGRIRjNNMnBOYUdkMVEzWlhiVlVpTENKdWFXTnJUbUZ0WlNJNkl1aUhyZVd1blRZMk9VVkZPRE1pTENKdGIySnBiR1VpT2lJeE16QTNNREUxTlRFeE9TSXNJbk5sYzNOcGIyNUxaWGtpT201MWJHd3NJbkp2YkdWTWFYTjBJanB1ZFd4c0xDSmtaWFpwWTJVaU9tNTFiR3dzSW1selVHTWlPbVpoYkhObExDSnBjMEZuY21WbElqcDBjblZsTENKdGIySnBiR1ZNYjJkdlptWlRkR0YwZFhNaU9tWmhiSE5sZlgwPSJdLCJqdGkiOiIxNjNhOTg5ZC01OWVjLTRjZjEtYjliYi1kYTQ1YTdhNDM1ZDMiLCJjbGllbnRfaWQiOiJ3bi1jbG91ZCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.cPtVwxK-NhWNgT_47T-832aCgnPoCLADyapFIE1cjAXh9TBMwJwXbDK6OxZ8n1ju38KCh8gtEFU74HXii77gdOJbeGhmvbLLyS7h_cvjt-NnLqkhSTSeil1yJglpxq-LjxNRQzVqJepe1az3fqSFOnAsAtk49o_4yqGIHpslT2V3ALWOzybSrT6iUKVQWvlp5Y9IHOhunvtxBU2rI8rstIH9TbDHa1DQ8XroYn5kPffIPvsym2vastfiZ4xTfbV5sxyYkx2xgGAL56nJjfbpSR-wjEFJiXyL9J3Uyjqx7BXyjFrAf6dNpVe-8wwI9S-ekoPpnLGiVv5y1VRsSDdhLA",
  },
  {
    userId: '9929',
    token:"BearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgyNjcwNjksInVzZXJfbmFtZSI6Im9mc0tCNUdnaTBoQk1LSW5acG5yY1BMeXBKUUkiLCJhdXRob3JpdGllcyI6WyJXblByaW5jaXBhbDpleUppWVhOcFkxVnpaWElpT25zaWRYTmxja2xrSWpvek16VXhOemN6TENKMWMyVnlRMjlrWlNJNklrMVZNakF5TkRBMk1UTXdNakkzTnpZaUxDSjFjMlZ5VG1GdFpTSTZJbTltYzB0Q05VZG5hVEJvUWsxTFNXNWFjRzV5WTFCTWVYQktVVWtpTENKdWFXTnJUbUZ0WlNJNkl1aUhyZVd1blRFd05ETTNRemsxSWl3aWJXOWlhV3hsSWpvaU1UTXlOREF5T1RrNU1qa2lMQ0p6WlhOemFXOXVTMlY1SWpwdWRXeHNMQ0p5YjJ4bFRHbHpkQ0k2Ym5Wc2JDd2laR1YyYVdObElqcHVkV3hzTENKcGMxQmpJanBtWVd4elpTd2lhWE5CWjNKbFpTSTZkSEoxWlN3aWJXOWlhV3hsVEc5bmIyWm1VM1JoZEhWeklqcG1ZV3h6WlgxOSJdLCJqdGkiOiI2OTgxYzRiOC01NzRhLTRiODktOWI2MS0wNDZkZTZiZWMwMzQiLCJjbGllbnRfaWQiOiJ3bi1jbG91ZCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.LOR3myTJAamhJnQtl3AozE0TlgCy9uo1kgTzkQa14_il7acRfkayziqUaNDdMarQBxwCakW8cO8ECJadmQ14NbOdqL6qXC304KguA-3_BsQ9MkOj0mvHzJKZTZidHTT4j90JHd1RNpwLpITgvAETg_AVg40Mlg-9FodPCf9EitMcFi4Nrok_fiYfQTEn-HNLe4UqphSMwZa-RbiPva6K0HS_BUbtiqC2NbdLjvCBiTYDaUjxyNLg75EEWI2UyYuRP4GL02i_0OcuoNTSBn9iR6uMDVcy5f_8Ogqjr-xy2mXC3aPFm48fbB1zaGmYAPIHfBz2MPGcPyRc2Yyfoe6FhA",
  },
  {
    userId: '8816',
    token:"BearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgyNjczNjksInVzZXJfbmFtZSI6Im9mc0tCNUdoVXBtVmpualQ2LVNwQkp2Y01sbmsiLCJhdXRob3JpdGllcyI6WyJXblByaW5jaXBhbDpleUppWVhOcFkxVnpaWElpT25zaWRYTmxja2xrSWpvek16VXhPRFU1TENKMWMyVnlRMjlrWlNJNklrMVZNakF5TkRBMk1UTXdNakk0TmpJaUxDSjFjMlZ5VG1GdFpTSTZJbTltYzB0Q05VZG9WWEJ0Vm1wdWFsUTJMVk53UWtwMlkwMXNibXNpTENKdWFXTnJUbUZ0WlNJNkl1aUhyZVd1blRFd05Ea3hNVGN4SWl3aWJXOWlhV3hsSWpvaU1UZ3lNREUyTkRnNE1UWWlMQ0p6WlhOemFXOXVTMlY1SWpwdWRXeHNMQ0p5YjJ4bFRHbHpkQ0k2Ym5Wc2JDd2laR1YyYVdObElqcHVkV3hzTENKcGMxQmpJanBtWVd4elpTd2lhWE5CWjNKbFpTSTZkSEoxWlN3aWJXOWlhV3hsVEc5bmIyWm1VM1JoZEhWeklqcG1ZV3h6WlgxOSJdLCJqdGkiOiI5NjcyMzFkMi0wYWQxLTRkMzktOWZlZS01ZTZmNTZkNjBkODkiLCJjbGllbnRfaWQiOiJ3bi1jbG91ZCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.JHt3XZp6tX4GOj2XLcolQQbJQizyyxVF2cIDKm5S2y12g2C0AXxnyJ9YbrBKXud9OJnPCq4XQuE_-3iROPWCDwsucOT5X8RTukJFfTgv_Ijd4Vs2YL8T0aEfp07iNgfgXbFYyQCt2NUKPSQKCGdS-VF_KUY0Qnps4s85HEqXFNCyHH4MgDMgKPfE7kZeP5AVdSKsKDFd-JShHpw95L7DuysZRi_TiVXxYefYvNmytjW16eutrp4qK73xru29Y8VDbkVTkH1OXtNBPWXXTaOfa54Rv1nAFWCUu5cqLP0Se-ALgkdA0mU-aXp4MCKAWnQYcww4f3KlUpDbxKSTqioAhw",
  },
]

const pushPlusSend = async ({title,token, content,template}) => {
  try {
    await axios({
      url: 'http://www.pushplus.plus/send',
      method: 'post',
      headers:{
        'Content-Type': 'application/json'
      },
      data:{
        title:title,
        token:token,
        content:content,
        template:template||'txt'
      }
  })
    console.log('pushPlus发送成功')
  } catch (error) {
    console.error('pushPlus发送通知失败',error.toString())
    await sleep(5000)
    pushPlusSend({title,token, content,template})
  }
}
const baseUrl = 'https://cb-bags-slb.weinian.com.cn/wnuser/v1/'
const headers = {
  'Host': 'cb-bags-slb.weinian.com.cn',
  'Connection': 'keep-alive',
  // 'Content-Length': 2,
  'xweb_xhr': 1,
  // 'Authorization': 'BearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgyNjUzNTcsInVzZXJfbmFtZSI6Im9mc0tCNU4ycHRoY0otdHF3M2pNaGd1Q3ZXbVUiLCJhdXRob3JpdGllcyI6WyJXblByaW5jaXBhbDpleUppWVhOcFkxVnpaWElpT25zaWRYTmxja2xrSWpvek1UTTJOekUzTENKMWMyVnlRMjlrWlNJNklrMVZNakF5TkRBMk1URXdOems0T0RJaUxDSjFjMlZ5VG1GdFpTSTZJbTltYzB0Q05VNHljSFJvWTBvdGRIRjNNMnBOYUdkMVEzWlhiVlVpTENKdWFXTnJUbUZ0WlNJNkl1aUhyZVd1blRZMk9VVkZPRE1pTENKdGIySnBiR1VpT2lJeE16QTNNREUxTlRFeE9TSXNJbk5sYzNOcGIyNUxaWGtpT201MWJHd3NJbkp2YkdWTWFYTjBJanB1ZFd4c0xDSmtaWFpwWTJVaU9tNTFiR3dzSW1selVHTWlPbVpoYkhObExDSnBjMEZuY21WbElqcDBjblZsTENKdGIySnBiR1ZNYjJkdlptWlRkR0YwZFhNaU9tWmhiSE5sZlgwPSJdLCJqdGkiOiIxNjNhOTg5ZC01OWVjLTRjZjEtYjliYi1kYTQ1YTdhNDM1ZDMiLCJjbGllbnRfaWQiOiJ3bi1jbG91ZCIsInNjb3BlIjpbIm9wZW5pZCJdfQ.cPtVwxK-NhWNgT_47T-832aCgnPoCLADyapFIE1cjAXh9TBMwJwXbDK6OxZ8n1ju38KCh8gtEFU74HXii77gdOJbeGhmvbLLyS7h_cvjt-NnLqkhSTSeil1yJglpxq-LjxNRQzVqJepe1az3fqSFOnAsAtk49o_4yqGIHpslT2V3ALWOzybSrT6iUKVQWvlp5Y9IHOhunvtxBU2rI8rstIH9TbDHa1DQ8XroYn5kPffIPvsym2vastfiZ4xTfbV5sxyYkx2xgGAL56nJjfbpSR-wjEFJiXyL9J3Uyjqx7BXyjFrAf6dNpVe-8wwI9S-ekoPpnLGiVv5y1VRsSDdhLA',
  'User-Agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13)XWEB/9165',
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wx2206cca563f6f937/86/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  }
// const url = {
//   'checkin':'/wscump/checkin/checkinV2.json?checkinId=3997371&app_id=wx5508c9ab0d2118ff&kdt_id=105036832&access_token=',
//   'getCountDay':'/wscump/checkin/get_activity_by_yzuid_v2.json?checkinId=3997371&app_id=wx5508c9ab0d2118ff&kdt_id=105036832&access_token='
// }
const api = {
  checkin: () => {
        return axios({
            url: baseUrl+'memberUser/daySign',
            method: 'post',
            headers:headers,
            data:{}
        })
    },
    getCountDay: () => {
        return axios({
            url: baseUrl+'memberUser/getMemberUser',
            method: 'post',
            headers:headers,
            data:{}
        })
    },
    couponReceive: () => {
        return axios({
            url: 'https://cb-bags-slb.weinian.com.cn/member/v1/coupon/receive',
            method: 'post',
            headers:headers,
            data:{"couponId":23,"scene":""}
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
    // const randomTime = random(1, 300)
    // console.log('随机延迟：',randomTime);
    // await sleep(randomTime*1000)
    for (const user of userInfoList) {
      try {
        headers['Authorization'] = user.token
        console.log('当前用户：',user.userId);
        try{
          const {data:{msg}} = await 
          console.log('领券信息：',msg);
        }catch(e){
          
        }
        api.couponReceive().then(async res=>{
          console.log('领券信息：',res?.data?.msg);
          await sleep(random(1, 10)*1000)

          try{
            const {data:{msg}} = await api.checkin()
            console.log('签到信息：',msg);
          }catch(e){
            console.error('签到失败',e.toString())
          }
          

          
          await sleep(random(1, 10)*1000)
          try{
            const {data:{data:{totalPoints}}} = await api.getCountDay()
            console.log('当前积分：',totalPoints);
          }catch(e){
            console.error('获取签到天数失败',e.toString())
          }
        }).catch(e=>{
          console.error('领券失败',e.toString())
        })
        
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
    // pushPlusSend({
    //   title:'7.5water签到',
    //   token:'04f41162bcb343129b0434a20cf3b3dc',
    //   content:pushStr
    // })
  };
  
  processTokens()