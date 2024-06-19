#!/usr/bin/python3  
# -- coding: utf-8 --
# @Time : 2023/6/30 10:23
# -------------------------------
# const $ = new Env("京东代挂网签到");
import json,requests,os,time,copy,random
from datetime import datetime, timedelta

random_number = random.randint(1, 6*60*60)
# 获取当前时间
current_time = datetime.now()
# 使用 timedelta 对象来增加秒数
new_time = current_time + timedelta(seconds=random_number)
# 格式化新时间
formatted_new_time = new_time.strftime("%Y-%m-%d %H:%M:%S")


userList = [
   {"username":"xxx","password":"xxx"}
]
# 初始化重连次数字典
reconnect_counts = {}

# 根据用户列表初始化重连次数字典
for user in userList:
    username = user["username"]
    reconnect_counts[username] = {
        "login_count": 0,
        "signin_count": 0,
        "query_count": 0
    }

reqHeaders = {
    "Accept":"*/*",
    "Accept-Encoding":"gzip, deflate",
    "Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8",
    "Content-Length":'41',
    "Content-Type":"application/json;charset=UTF-8",
    "Host":"dl2.jdmk.xyz:1170",
    "Origin":"http://dl2.jdmk.xyz:1170",
    "Proxy-Connection":"keep-alive",
    "Referer":"http://dl2.jdmk.xyz:1170/",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Requested-With":"XMLHttpRequest"
}

#签到
def signin(username):
    global reqHeaders
    session =requests.session ()
    try:
        response =session.get(f'http://dl2.jdmk.xyz:1170/user/signin/{username}',headers = reqHeaders,timeout=3)
        if(json.loads(response.text)['code'])==0:
            print(f"签到成功 获得 {json.loads(response.text)['data']} 个积分")
            query(username)
        else:
            if(json.loads(response.text)['code'])==-1:
                print(json.loads(response.text)['msg'])
            else:
                print(f"签到失败,响应信息：{response.text}")
    except Exception as e:
        print(f"签到失败,响应信息：{response.text}")
        print('正在重新签到...')
        if(reconnect_counts[username]["signin_count"] < 3):
            signin(username)
        reconnect_counts[username]["signin_count"] += 1

#查询总积分
def query(username):
    global reqHeaders
    session =requests.session ()
    try:
        response =session .get (f'http://dl2.jdmk.xyz:1170/user/getUserInfo?username={username}',headers = reqHeaders,timeout=3)
        if(json.loads(response.text)['code']==0):
            print(f"当前总积分 {json.loads(response.text)['data']['score']}")
        else:
            print(f"查询积分失败,响应信息：{response.text}")
    except Exception as e:
        print(f"查询积分失败,响应信息：{response.text}")
        print('正在重新查询...')
        if(reconnect_counts[username]["query_count"] < 3):
            query(username)
        reconnect_counts[username]["query_count"] += 1

def login_sign (item):
    global reqHeaders
    username = item.get('username')
    print(f'{username}: 开始任务:')
    session =requests.session ()
    # 登录
    response =session.post ('http://dl2.jdmk.xyz:1170/user/login',headers = reqHeaders,data = json.dumps (item,separators=(',', ':')),timeout=3)
    try:
        if json.loads(response.text)['code']== 0 :
            print ("登录成功")
            cookie =response.cookies.get_dict ()
            reqHeaders.update({'Cookie':'satoken='+cookie['satoken']})
            signin(username)
        else :
            print (f"登录失败，响应信息：{response.text}")
    except Exception as e:
        print (f"登录失败，响应信息：{response.text}")
        print('正在重新登录...')
        if(reconnect_counts[username]["login_count"] < 3):
            login_sign(item)
        reconnect_counts[username]["login_count"] += 1
if __name__ =='__main__':
    print (f"延时{random_number}秒后开始任务,预计{formatted_new_time} 开始")
    time.sleep(random_number)
    for item in userList:
        login_sign (item)
        time.sleep(random.randint(60, 60*2))  # 0到59之间的随机秒)