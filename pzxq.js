// const $ = new Env("瓶子星球签到");
const axios = require('axios')


const tokensList = [
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNTQ5ODAyOCIsInVuaW9uSWQiOiJvQ0N4QnM3b3c4d2pCWjNvLWpKa3dzd0tfamdRIiwib3BlbklkIjoib3ZHNEY1cXY1d1dGWi1sb2dJM21VT3RZSzRXayIsIm5pY2tOYW1lIjoi55O25a2Q5pif55CD5bGF5rCRIiwiaXNzIjoiam95Ym8iLCJhdmF0YXIiOiJodHRwczovL2g1c3RhdGljLm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20vbGFwcC92aXAvZGVmYXVsdC1hdmF0YXIuanBnIiwidXNlcklkIjozNTQ5ODAyOCwicm9sIjoiV0VDSEFUX1JPTEUsIiwiYWxpVXNlcklkIjpudWxsLCJhcHBUeXBlIjoidG9jVXNlciIsInRleHQxIjoid2VjaGF0TWluaUFwcCIsImFwcEdyb3VwIjoicHp4cSIsImFwcElkIjoid3g1ZDgxMDA1MDNlYjNlY2MzIiwiZXhwIjoxNzMxNDAxMDk4LCJpYXQiOjE3MTU4NDkwOTgsIm1lbWJlcklkIjoyMzIwMzkxM30.r_ciNasZ612PQ5pHhbRZmkdyKrZadeyvOpVXTnjnQ-M_Hn5rnrsorKJJHI7wudHLf78C-d2Egtw9cIKETnyL_A',
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNTQ5ODQ2MyIsInVuaW9uSWQiOiJvQ0N4QnM0OHlGdmRNNzZQRVlKUnlkUndvQmZRIiwib3BlbklkIjoib3ZHNEY1a1VjdlpjRExpeEpCclptTk5lcFVOYyIsIm5pY2tOYW1lIjoi55O25a2Q5pif55CD5bGF5rCRIiwiaXNzIjoiam95Ym8iLCJhdmF0YXIiOiJodHRwczovL2g1c3RhdGljLm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20vbGFwcC92aXAvZGVmYXVsdC1hdmF0YXIuanBnIiwidXNlcklkIjozNTQ5ODQ2Mywicm9sIjoiV0VDSEFUX1JPTEUsIiwiYWxpVXNlcklkIjpudWxsLCJhcHBUeXBlIjoidG9jVXNlciIsInRleHQxIjoid2VjaGF0TWluaUFwcCIsImFwcEdyb3VwIjoicHp4cSIsImFwcElkIjoid3g1ZDgxMDA1MDNlYjNlY2MzIiwiZXhwIjoxNzMxNDAzNjk5LCJpYXQiOjE3MTU4NTE2OTksIm1lbWJlcklkIjoyMzIwNDA5MH0.LPiv1fFgIKHS2cmJ9i7jfh-w3u7XrYDL9fvp2qI7JTwJGZLmPmSldwmyuXSGR72_sBAO9TnYVlXc6UyzOT05jw',
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNTQ5ODQ4MyIsInVuaW9uSWQiOiJvQ0N4QnMtR0JuT0YxNFlwd1huUFRTMkppMmtjIiwib3BlbklkIjoib3ZHNEY1anFDSEhabTFiMVlyRmJ1OWxEVDhVWSIsIm5pY2tOYW1lIjoi55O25a2Q5pif55CD5bGF5rCRIiwiaXNzIjoiam95Ym8iLCJhdmF0YXIiOiJodHRwczovL2g1c3RhdGljLm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20vbGFwcC92aXAvZGVmYXVsdC1hdmF0YXIuanBnIiwidXNlcklkIjozNTQ5ODQ4Mywicm9sIjoiV0VDSEFUX1JPTEUsIiwiYWxpVXNlcklkIjpudWxsLCJhcHBUeXBlIjoidG9jVXNlciIsInRleHQxIjoid2VjaGF0TWluaUFwcCIsImFwcEdyb3VwIjoicHp4cSIsImFwcElkIjoid3g1ZDgxMDA1MDNlYjNlY2MzIiwiZXhwIjoxNzMxNDAzODEzLCJpYXQiOjE3MTU4NTE4MTMsIm1lbWJlcklkIjoyMzIwNDA5OH0.XBCg_KiOI4TCD7WfLjNXIu45bjUAGt9IvvSFo37Fb5sY6C-4F-tMcHjGStu4Zea9MxjfHK2T1HjAYcjyru_ZHA',
]

const baseUrl = 'https://exapi.jxbscbd.com'
const url = {
    userCheckIn:'/gateway/pointsMall/task/userCheckIn',
    getUserPoints:'/gateway/pointsMall/user/getUserPoints?userNumber=6645c779a794800029436ab8',
    getUserInfo:'/gateway/pointsMall/user/getUserForQuestionnaire'
}
const headers = {
    'Content-Type': 'application/json',
    'Authorization': '',
    'Host': 'exapi.jxbscbd.com',
    'Referer': 'https://servicewechat.com/wx5d8100503eb3ecc3/776/page-frame.html',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) XWEB/9115'
  }
const api = {
    userCheckIn: (token,data) => {
        return axios({
            url: baseUrl+url.userCheckIn,
            method: 'post',
            headers: {...headers, 'Authorization': token},
            data: data,
        })
        
    },
    getUserPoints: (token) => {
        return axios({
            url: baseUrl+url.getUserPoints,
            method: 'get',
            headers: {...headers, 'Authorization': token}
        })
    },
    getUserInfo: (token) => {
        return axios({
            url: baseUrl+url.getUserInfo,
            method: 'get',
            headers: {...headers, 'Authorization': token}
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
        const {data: {data: {id, userNumber, telephoneNumber}}} = await api.getUserInfo(token);
        const checkInParams = {
          userId: id,
          userNumber,
          telephoneNumber
        };
        console.log(`查询信息成功：`, telephoneNumber);
  
        await sleep(1500);
  
        const {data: {msg}} = await api.userCheckIn(token, checkInParams);
        console.log('签到信息：', msg);
  
        await sleep(1500);
  
        const {data: {data: {accumulatePoints, availablePoints}}} = await api.getUserPoints(token);
        console.log('累计积分：', accumulatePoints);
        console.log('可用积分：', availablePoints);
        console.log('');
  
        await sleep(3500);
      } catch (error) {
        console.error(`处理时发生错误：`, error);
      }
    }
  };
  processTokens()