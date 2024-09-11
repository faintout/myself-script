const {
  getCurrDay,
  checkTime,
  Env,
  random,
  sleep
} = require('./utils.js')
// const {sendNotify} = require('./sendNotify.js')
// const $ = new Env("幸福西饼");
const axios = require('axios')

// const userInfoList = $.getEnvKey('aima').split('\n')
// if(!userInfoList.length||userInfoList[0]===''){
//   throw new Error('未找到ck')
// }
// console.log(`获取到${userInfoList.length}个ck`);

const userInfoList = [
  {
    phone: '5156',
    token: 'YZ1283115491376087040YZJhRhAIYP',
    accessToken: '978438ca8d86d7706372d767a6bc76',
    reqData: {
      "version": 2,
      "source": {
        "bookKey": "ea77c4a6-4adf-433d-bfeb-b6a4bd2b141e",
        "clientIp": "43.243.136.34",
        "fromThirdApp": false,
        "isWeapp": true,
        "itemSources": [{
          "activityId": 0,
          "activityType": 0,
          "bizTracePointExt": "{\"appId\":\"wxee16a21f3ce5a342\",\"scene\":\"1000\",\"is_share\":\"1\",\"weapp_version\":\"2.181.4.201\",\"st\":\"js\",\"sv\":\"1.2.33\",\"yai\":\"wsc_c\",\"uuid\":\"0dfcfneUNQqnZpY1725876434621\",\"userId\":\"20826432109\"}",
          "cartCreateTime": 0,
          "cartUpdateTime": 0,
          "goodsId": 3221612435,
          "propertyIds": [],
          "skuId": 14761747878
        }],
        "kdtSessionId": "YZ1283127897175072768YZYRBSoedm",
        "needAppRedirect": false,
        "orderFrom": "cart",
        "orderType": 0,
        "platform": "weapp",
        "salesman": "",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b19)XWEB/11253",
        "orderMark": "wx_shop"
      },
      "config": {
        "containsUnavailableItems": false,
        "paymentExpiry": 0,
        "preToastDesc": "已为你领取1张优惠券，下单享优惠",
        "receiveMsg": true,
        "usePoints": false,
        "useWxpay": false,
        "buyerMsg": "",
        "disableStoredDiscount": false,
        "storedDiscountRechargeGuide": true,
        "yzGuaranteeInfo": {
          "displayTag": {
            "IS_YZ_SECURED": "0",
            "FREIGHT_INSURANCE_FREE": "0",
            "IS_UPGRADE_FREIGHT_TAG": "0",
            "IS_FREIGHT_INSURANCE": "0"
          },
          "freightInsurance": false,
          "mainSupportContent": [],
          "securedItemSnapshotList": [],
          "hideYzGuarantee": false,
          "page": "order"
        },
        "isWholesaleOrder": false
      },
      "usePayAsset": {},
      "items": [{
        "activityId": 0,
        "activityType": 0,
        "deliverTime": 0,
        "extensions": {
          "OUTER_ITEM_ID": "10000",
          "tpps": "",
          "CART_ID": "2305843015651075435"
        },
        "goodsId": 3221612435,
        "isSevenDayUnconditionalReturn": false,
        "itemFissionTicketsNum": 0,
        "itemMessage": "{\"下单人手机\":\"\"}",
        "kdtId": 10695955,
        "num": 1,
        "pointsPrice": 0,
        "price": 15990,
        "propertyIds": [],
        "skuId": 14761747878,
        "storeId": 51006542,
        "umpSkuId": 0
      }],
      "seller": {
        "kdtId": 10695955,
        "storeId": 51003460
      },
      "ump": {
        "activities": [{
          "activityAlias": "",
          "activityId": 31953957,
          "activityType": 105,
          "externalPointId": 0,
          "goodsId": 3221612435,
          "kdtId": 10695955,
          "pointsPrice": 0,
          "propertyIds": [],
          "skuId": 14761747878,
          "usePoints": false
        }],
        "coupon": {
          "id": 26923195371,
          "couponType": "card",
          "outerCoupon": 0
        },
        "multiCoupon": {
          "coupons": [{
            "id": 26923195371,
            "couponType": "card",
            "outerCoupon": 0,
            "systemChoose": false,
            "chosenOrder": 0
          }],
          "deliveryCoupons": []
        },
        "useCustomerCardInfo": {
          "specified": false
        },
        "costPoints": {
          "kdtId": 10695955,
          "usePointDeduction": false,
          "costPoints": 0,
          "defaultPointDeductEffect": false
        }
      },
      "newCouponProcess": false,
      "unavailableItems": [],
      "asyncOrder": false,
      "delivery": {
        "hasFreightInsurance": false,
        "address": {
          "addressDetail": "西北旺地区颐和山庄紫霄园33号楼2单元401",
          "areaCode": "110108",
          "city": "北京市",
          "community": "",
          "country": "中国",
          "countryType": 1,
          "county": "海淀区",
          "houseNumber": "",
          "id": 837018581,
          "isDefault": 0,
          "label": "",
          "lat": "40.0575545786827",
          "location": "",
          "lon": "116.24462144027146",
          "poiId": "",
          "poiType": 0,
          "postalCode": "100089",
          "province": "北京市",
          "source": 2,
          "tel": "13240299929",
          "type": 1,
          "userId": 20826432109,
          "userName": "楊",
          "recipients": "楊",
          "addressId": 837018581,
          "deliveryStartTime": "2024-09-13 18:30:00",
          "deliveryEndTime": "2024-09-13 19:30:00",
          "deliveryTimeSpan": "hour"
        },
        "appointmentType": 1,
        "expressType": "express",
        "expressTypeChoice": 2
      },
      "cloudOrderExt": {
        "extension": {}
      },
      "bookKeyCloudExtension": {
        "umpExt": ""
      },
      "confirmTotalPrice": 0,
      "extensions": {
        "CONFIRM_TRADE_RISK_DIALOG": "{\"type\":\"submit-click\",\"timeStamp\":133851,\"target\":{\"id\":\"\",\"dataset\":{}},\"currentTarget\":{\"id\":\"\",\"dataset\":{}},\"mark\":{},\"mut\":false,\"custom\":true}",
        "TRADE_PAGE_TYPE": "TRADE_BUY_PAGE",
        "NEW_MEMBER_FLOW": "true",
        "SELECTED_PRESENTS": "[]",
        "IS_OPTIMAL_SOLUTION": "true",
        "expressType": "2",
        "IS_SELECT_PRESENT": "0",
        "IS_OVERLYING_COUPON": "false",
        "PAY_CREDIT_PAY_DEVICE_TYPE": "WX_MINI_APP",
        "BIZ_ORDER_ATTRIBUTE": "{\"RISK_GOODS_TAX_INFOS\":\"0\",\"APP_VERSION\":\"3.9.11-2.181.4.201\"}",
        "ATTR_SOURCE_PAGE": ""
      },
      "behaviorOrderInfo": {
        "bizType": 158,
        "token": ""
      }
    }
  },

]

const headers = {
  'Host': 'cashier.youzan.com',
  'Connection': 'keep-alive',
  // 'Content-Length':'3668',
  'xweb_xhr': '1',
  'page-path': 'packages/trade-buy/order/buy/index',
  'app-mode': 'default',
  // 'Extra-Data':'{"sid":"YZ1282763573069623296YZGjFdJ1g7","version":"2.181.4.201","clientType":"weapp-miniprogram","client":"weapp","bizEnv":"","uuid":"U2DzUin0vh2Afs71706753566124","ftime":1706753566121}',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b19)XWEB/11205',
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'cross-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'Referer': 'https://servicewechat.com/wxee16a21f3ce5a342/309/page-frame.html',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9'
}
const api = {
  orderBy: (token, accessToken, reqData) => {
    return axios({
      url: `https://cashier.youzan.com/pay/wsctrade/order/buy/v2/bill-fast.json?store_id=51003460&app_id=wxee16a21f3ce5a342&kdt_id=10695955&access_token=${accessToken}`,
      method: 'post',
      headers: {
        ...headers,
        'Extra-Data': JSON.stringify({
          "sid": token,
          "version": "2.181.4.201",
          "clientType": "weapp-miniprogram",
          "client": "weapp",
          "bizEnv": "",
          "uuid": "U2DzUin0vh2Afs71706753566124",
          "ftime": new Date().getTime()
        })
      },
      data: reqData
    })
  },

}


const processTokens = async () => {
  // await checkTime({
  //   hours:22,
  //   minutes: 59,
  //   seconds: 55,
  // })
  for (let i = 0; i < 1; i++) {
    for (const token of userInfoList) {
      await sleep(100)
      console.log(`【${token.phone}】 请求时间`, new Date().toLocaleString());
      api.orderBy(token.token, token.accessToken, token.reqData).then(res => {
        console.log(`【${token.phone}】 `, JSON.stringify(res.data))
      }).catch(err => {
        console.log(err.toString())
      })
    }
  }
};

processTokens()