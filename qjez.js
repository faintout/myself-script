/*
------------------------------------------
@Author: sm
@Date: 2024.06.07 19:15
@Description: 微信小程序虔金E站 每日签到
------------------------------------------
变量名qianjin
变量值https://www.xrservice.cn/请求头Headers中Homing-Auth的值 去掉Bearer  多账号&或换行
[Script]
http-response

[MITM]
hostname = 

⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
*/

const $ = new Env("微信小程序虔金E站");
let ckName = `qianjin`;
let userCookie = checkEnv(
    ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || ""
);
const notify = $.isNode() ? require("./sendNotify") : "";

!(async () => {
    console.log(
        `==================================================\n 脚本执行 - 北京时间(UTC+8): ${new Date(
            new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000 +
            8 * 60 * 60 * 1000
        ).toLocaleString()} \n==================================================`
    );
    //console.log(userCookie)
    if (!userCookie?.length) return console.log(`没有找到CK哦`);
    let index = 0;
    //let strSplitor = "#";

    for (let user of userCookie) {
        $.log(`\n🚀 user:【${index || ++index}】 start work\n`);
        $.ck = user
        //$.ckStatus = false;
        await signIn()
    }

    await $.sendMsg($.logs.join("\n"));
})()
    .catch((e) => console.log(e))
    .finally(() => $.done());
async function signIn() {
    let config = {
        method: 'POST',
        url: 'https://www.xrservice.cn/rayo-gz-fes-back/blade-signin/signin-user/submit',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220067 MMWEBSDK/20240404 MMWEBID/8150 MicroMessenger/8.0.49.2600(0x28003156) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx7bda09dcc9affced',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Android WebView";v="122"',
            'Homing-Auth': 'Bearer '+$.ck,
            'sec-ch-ua-mobile': '?1',
            //'Authorization': 'Basic aG9taW5nLXd4bHA6UEhPU2J6SEVoRWhkRW4xYWlDSmhnYmJadVQ=',
            'sec-ch-ua-platform': '"Android"',
            'Origin': 'https://www.xrservice.cn',
            'X-Requested-With': 'com.tencent.mm',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://www.xrservice.cn/rayo-gz-fes-h5/',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
        },
        data: JSON.stringify({})
    };
    let { data: result } = await Request(config);
    result?.code == 200 ? $.log(`签到成功`) : $.log(`签到失败`); console.log(JSON.stringify(result));
}


function checkEnv(userCookie) {
    const envSplitor = ["&", "\n"];
    //console.log(userCookie);
    let userList = userCookie
        .split(envSplitor.find((o) => userCookie.includes(o)) || "&")
        .filter((n) => n);
    console.log(`共找到${userList.length}个账号`);
    return userList;
}
// prettier-ignore
function Env(t, s) { return new (class { constructor(t, s) { this.name = t; this.logs = []; this.logSeparator = "\n"; this.startTime = new Date().getTime(); Object.assign(this, s); this.log("", `\ud83d\udd14${this.name},\u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } queryStr(options) { return Object.entries(options).map(([key, value]) => `${key}=${typeof value === "object" ? JSON.stringify(value) : value}`).join("&") } getURLParams(url) { const params = {}; const queryString = url.split("?")[1]; if (queryString) { const paramPairs = queryString.split("&"); paramPairs.forEach((pair) => { const [key, value] = pair.split("="); params[key] = value }) } return params } isJSONString(str) { try { return JSON.parse(str) && typeof JSON.parse(str) === "object" } catch (e) { return false } } isJson(obj) { var isjson = typeof obj == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; return isjson } async sendMsg(message) { if (!message) return; if (this.isNode()) { await notify.sendNotify(this.name, message) } else { this.msg(this.name, "", message) } } randomNumber(length) { const characters = "0123456789"; return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("") } randomString(length) { const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("") } uuid() { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) { var r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8; return v.toString(16) }) } time(t) { let s = { "M+": new Date().getMonth() + 1, "d+": new Date().getDate(), "H+": new Date().getHours(), "m+": new Date().getMinutes(), "s+": new Date().getSeconds(), "q+": Math.floor((new Date().getMonth() + 3) / 3), S: new Date().getMilliseconds(), }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in s) { new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[e] : ("00" + s[e]).substr(("" + s[e]).length))) } return t } msg(title = t, subtitle = "", body = "", options) { const formatOptions = (options) => { if (!options) { return options } else if (typeof options === "string") { if (this.isQuanX()) { return { "open-url": options } } else { return undefined } } else if (typeof options === "object" && (options["open-url"] || options["media-url"])) { if (this.isQuanX()) { return options } else { return undefined } } else { return undefined } }; if (!this.isMute) { if (this.isQuanX()) { $notify(title, subtitle, body, formatOptions(options)) } } let logs = ["", "==============📣系统通知📣=============="]; logs.push(title); subtitle ? logs.push(subtitle) : ""; body ? logs.push(body) : ""; console.log(logs.join("\n")); this.logs = this.logs.concat(logs) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, s) { const e = !this.isQuanX(); e ? this.log("", `\u2757\ufe0f${this.name},\u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name},\u9519\u8bef!`, t) } wait(t) { return new Promise((s) => setTimeout(s, t)) } done(t = {}) { const s = new Date().getTime(), e = (s - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name},\u7ed3\u675f!\ud83d\udd5b ${e}\u79d2`); this.log(); if (this.isNode()) { process.exit(1) } if (this.isQuanX()) { $done(t) } } })(t, s) }

async function Request(options) {
    if ($.isNode()) {
        const axios = require("axios");
        Request = async (options) => {
            try {
                return await axios.request(options);
            } catch (error) {
                throw error && error.error ? error.error : "请求失败";
            }
        };
    }
    if ($.isQuanX()) {
        Request = async (options) => {
            try {
                return await $task.fetch(options);
            } catch (error) {
                throw error && error.error ? error.error : "请求失败";
            }
        };
    }
    return await Request(options);
}