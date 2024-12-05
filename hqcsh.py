"""

time：2023.4.26
cron: 0 9,18 * * *
new Env('好奇车生活签到');
微信小程序-好奇车生活-好物兑换
抓包域名: https://channel.cheryfs.cn/
抓包请求头里面: accountId 的值
环境变量名称：hqcshck = accountId 的值
多账号新建变量或者用 换行 分开

"""

import time
import requests
from os import environ, path

def get_environ(key, default="", output=True):
    def no_read():
        if output:
            print(f"未填写环境变量 {key} 请添加")
            exit(0)
        return default

    return environ.get(key) if environ.get(key) else no_read()


class Hqcsh():
    def __init__(self, ck):
        self.msg = ''
        self.ck = ck
        self.ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6763'
        self.tid = '619669306447261696'

    def sign(self):
        time.sleep(0.5)
        sign_url = "https://channel.cheryfs.cn/archer/activity-api/signinact/signin"
        jf_url = 'https://channel.cheryfs.cn/archer/activity-api/common/accountPointLeft?pointId=620415610219683840'
        q_url = 'https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId=' + qiang + '&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=188&exchangeNeedMoney=0&cardGoodsItemIds='
        sign_headers = {
            'User-Agent': self.ua,
            'tenantId': self.tid,
            'activityId': '620810406813786113',
            'accountId': self.ck,
        }

        jf_headers = {
            'User-Agent': self.ua,
            'tenantId': self.tid,
            'activityId': '621911913692942337',
            'accountId': self.ck,
        }
        q_headers = {
            'User-Agent': self.ua,
            'tenantId': self.tid,
            'activityId': '621950054462152705',
            'accountId': self.ck,
        }
        try:
            sign_rsp = requests.get(sign_url, headers=sign_headers)
            time.sleep(0.5)
            jf_rsp = requests.get(jf_url, headers=jf_headers)
            time.sleep(0.5)
            q_rsp = requests.get(q_url, headers=q_headers)

            if sign_rsp.json()['success'] == True:
                if sign_rsp.json()['result']['success'] == True:
                    if q_rsp.json()['success'] == False:
                        xx = f"[登录]：账号{a}登录成功\n[签到]：签到成功\n[积分]：{jf_rsp.json()['result']}\n[抢包]：当前不在抢包时间段，请在18-22点运行\n\n"
                        print(xx)
                        self.msg += xx
                    elif q_rsp.json()['result']['success'] == True:
                        time.sleep(0.5)
                        qr_url = 'https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCardResult?resultKey=' + \
                                 q_rsp.json()['result']['id']
                        qr_rsp = requests.get(qr_url, headers=q_headers)
                        if qr_rsp.json()['result']['errMsg'] == '成功':
                            xx = f"[登录]：账号{a}登录成功\n[签到]：签到成功\n[积分]：{jf_rsp.json()['result']}\n[抢包]：{qr_rsp.json()['result']['errMsg']}，前往个人中心-我的礼包查看！\n\n"
                            print(xx)
                            self.msg += xx
                        else:
                            xx = f"[登录]：账号{a}登录成功\n[签到]：签到成功\n[积分]：{jf_rsp.json()['result']}\n[抢包]：{qr_rsp.json()['result']['errMsg']}\n\n"
                            print(xx)
                            self.msg += xx
                    elif q_rsp.json()['result']['success'] == False:
                        xx = f"[登录]：账号{a}登录成功\n[签到]：签到成功\n[积分]：{jf_rsp.json()['result']}\n[抢包]：{q_rsp.json()['result']['errMsg']}\n\n"
                        print(xx)
                        self.msg += xx
                elif sign_rsp.json()['result']['success'] == False:
                    if q_rsp.json()['success'] == False:
                        xx = f"[登录]：账号{a}登录成功\n[签到]：{sign_rsp.json()['result']['message']}\n[积分]：{jf_rsp.json()['result']}\n[抢包]：当前不在抢包时间段，请在18-22点运行\n\n"
                        print(xx)
                        self.msg += xx
                    elif q_rsp.json()['result']['success'] == True:
                        time.sleep(0.5)
                        qr_url = 'https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCardResult?resultKey=' + \
                                 q_rsp.json()['result']['id']
                        qr_rsp = requests.get(qr_url, headers=q_headers)
                        if qr_rsp.json()['result']['errMsg'] == '成功':
                            xx = f"[登录]：账号{a}登录成功\n[签到]：{sign_rsp.json()['result']['message']}\n[积分]：{jf_rsp.json()['result']}\n[抢包]：{qr_rsp.json()['result']['errMsg']}，前往个人中心-我的礼包查看！\n\n"
                            print(xx)
                            self.msg += xx
                        else:
                            xx = f"[登录]：账号{a}登录成功\n[签到]：{sign_rsp.json()['result']['message']}\n[积分]：{jf_rsp.json()['result']}\n[抢包]：{qr_rsp.json()['result']['errMsg']}\n\n"
                            print(xx)
                            self.msg += xx
                    elif q_rsp.json()['result']['success'] == False:
                        xx = f"[登录]：账号{a}登录成功\n[签到]：{sign_rsp.json()['result']['message']}\n[积分]：{jf_rsp.json()['result']}\n[抢包]：{q_rsp.json()['result']['errMsg']}\n\n"
                        print(xx)
                        self.msg += xx
            elif sign_rsp.json()['success'] == False:
                xx = f"[登录]：账号{a}登录失败，请稍后重试或者ck可能失效,当前ck：{self.ck}\n\n"
                print(xx)
                self.msg += xx
            else:
                xx = f"[登录]：账号{a}登录失败，请稍后重试或者ck可能失效,当前ck：{self.ck}\n\n"
                print(xx)
                self.msg += xx
                return self.msg
            return self.msg
        except Exception as e:
            xx = f"[请求异常]：稍后再试\n{e}\n\n"
            print(xx)
            self.msg += xx
            return self.msg

    def get_sign_msg(self):
        return self.sign()


if __name__ == '__main__':
    q1 = '792556957722198016'  # 1800积分 京东E卡18 元①
    q2 = '850529542367801344'  # 174积分 奇瑞微信红包1元
    q3 = '850530051048796161'  # 522积分 奇瑞微信红包3元 
    q4 = '850530474589614080'  # 870积分 奇瑞微信红包5元
    qiang = q4
    print('\n默认设置自动抢188积分1.08元的包\n需要设置到脚本底部修改 qiang = xxx\nxxx为q1-q4对应的包\n注：抢包没有做循环，只提交一次可能会失败，可以在18点之后定时重复运行几次\n')
    token = get_environ("hqcshck")
    msg = ''
    cks = token.split("\n")
    print("检测到{}个ck记录\n开始Hqcsh签到\n".format(len(cks)))
    a = 0
    for ck in cks:
        a += 1
        run = Hqcsh(ck)
        msg += run.get_sign_msg()
