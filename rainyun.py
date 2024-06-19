#!/usr/bin/python3  
# -- coding: utf-8 --
# @Time : 2023/6/30 10:23
# -------------------------------
# cron "0 0 6,8,20 * * *" script-path=xxx.py,tag=匹配cron用
# const $ = new Env('雨云签到');

import json,requests,os,time
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler



userList = [
    {"user":"faintout","pwd":"yhn79037596"},
    {"user":"faintout_8816","pwd":"yhn79037596"},
    {"user":"faintout_9929","pwd":"yhn79037596"},
]

def login_sign (item):#line:17
    user = item.get("user")
    pwd = item.get("pwd")
    O00OOO00O0OO0OO00 =requests .session ()#line:18
    OOOO000000000O0O0 =O00OOO00O0OO0OO00 .post ('https://api.v2.rainyun.com/user/login',headers ={"Content-Type":"application/json"},data =json .dumps ({"field":f"{user}","password":f"{pwd}"}))#line:19
    if OOOO000000000O0O0 .text .find ("200")>-1 :#line:20
        print ("登录成功")#line:21
        O000OOOOO000OOO0O =OOOO000000000O0O0 .cookies .get_dict ()['X-CSRF-Token']#line:22
    else :#line:24
        print (f"登录失败，响应信息：{OOOO000000000O0O0.text}")#line:25
    O000O0OOOO00OOOOO ={'x-csrf-token':O000OOOOO000OOO0O ,}#line:31
    O0O0O000OOOO0OOO0 =O00OOO00O0OO0OO00 .post ('https://api.v2.rainyun.com/user/reward/tasks',headers =O000O0OOOO00OOOOO ,data =json .dumps ({"task_name":"每日签到","verifyCode":""}))#line:32
    print ('开始签到：签到结果 '+O0O0O000OOOO0OOO0 .text )#line:33
    # print ('尝试20次服务器兑换！')#line:35
    # for OO00000OO0OO0000O in range (20):#line:36
    #     try:
    #         OOOO00OO000O0O000 =O00OOO00O0OO0OO00 .post ('https://api.v2.rainyun.com/user/reward/items',headers =O000O0OOOO00OOOOO ,data ='{"item_id":104}')#line:37
    #         OOO0O0OO0O000O0O0 =O00OOO00O0OO0OO00 .post ('https://api.v2.rainyun.com/user/reward/items',headers =O000O0OOOO00OOOOO ,data ='{"item_id":105}')#line:38
    #         print (f'第{OO00000OO0OO0000O+1}次尝试兑换云服务器 '+json .loads (OOOO00OO000O0O000 .text )['message'])#line:39
    #         print (f'第{OO00000OO0OO0000O+1}次尝试兑换云服务器 '+json .loads (OOO0O0OO0O000O0O0 .text )['message'])#line:40
    #     except:
    #         print('try later！！')
    #     time.sleep (5 )#line:41

def sendLoginSign():
    # 获取今天的日期
    today = datetime.today().strftime('%Y-%m-%d')
    # 打印今天的日期
    print("今天:", today)
    # 这里是你想要执行的函数体
    for item in userList:
        login_sign (item)#line:45
    print("")
sendLoginSign()
# # 创建调度器
# scheduler = BlockingScheduler()

# # 添加定时任务
# scheduler.add_job(sendLoginSign, 'cron',second='0', minute='0', hour='7,19')

# # 启动调度器
# scheduler.start()