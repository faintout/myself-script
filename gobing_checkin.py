# !/usr/bin/env python
# -*-coding:utf-8 -*-
# const $ = new Env("gobing签到");
import requests
import json
import os
import time


'''
青龙 定义
gobing_ck = [{
    "account": "账号",
    "password": "密码"
},{
    "account": "账号",
    "password": "密码"
}]
'''


headers = {
    'Content-Type': 'application/json',
    'Host': 'api.gobing.cn',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2102K1C Build/SKQ1.220306.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5060.71 Mobile Safari/534.36 SearchCraft/3.9.2 (Baidu; P1 12) XiaoMi/MiuiBrowser/16.58.59 swan-mibrowser',
}

def get_token(ck):
    url = 'https://api.gobing.cn/v1/user/login'
    try:
        response = requests.post(url, headers=headers, data=json.dumps(ck))
        response_data = response.json()
        token = response_data['data']['token']
        if not token:
            print("未能获取到有效的 token")
            return
        headers['token'] = token
        sign_in()
        time.sleep(1)
        set_like_favorite()
        time.sleep(1)
        get_info()
    except Exception as e:
        print(f"Error: {e}")
        return None

def sign_in():
    url = 'https://api.gobing.cn/v1/signin/signin'
    try:
        response = requests.post(url, headers=headers)
        response_data = response.json()
        print(response_data['msg'])
    except Exception as e:
        print(f"Error: {e}")
        return

def get_info():
    url= 'https://api.gobing.cn/v1/user/getUserinfo'
    try:
        response = requests.get(url, headers=headers)
        response_data = response.json()
        coin = response_data['data']['info']['coin']
        exp = response_data['data']['info']['exp']
        print(f'当前经验：{exp}，Go币：{coin}')
    except Exception as e:
        print(f"Error: {e}")
        return
def set_like_favorite():
    print('正在执行喜欢和收藏：')
    tasklist=[5, 4, 3, 35, 31, 29, 24, 26, 21, 34, 23, 33, 27, 25, 22, 30, 28, 36, 32, 39]
    for num in tasklist:
        print(f"正在执行【{num}】喜欢与收藏")
        url = f"https://www.gobing.cn/disassemble/detail/{num}"
        response = requests.get(url, headers=headers)
        url_1 = "https://api.gobing.cn/v1/disassemble/like"
        url_2='https://api.gobing.cn/v1/disassemble/favorite'
        data = {
            "ids":str(num)
        }
        response = requests.post(url_1, headers=headers, json=data)
        response = requests.post(url_2, headers=headers, data=data)
        time.sleep(5)


ckList = os.getenv("gobing_ck")
ckList = json.loads(ckList)
print(f"共找到{len(ckList)}个账号")
print('*' * 50)
for i in ckList:
    print('*' * 30)
    print(f'开始执行{i["account"]}')
    get_token(i)
    time.sleep(10)