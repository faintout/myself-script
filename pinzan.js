/*
  name:品赞领免费ip
  author:食翔狂魔
  version:1.0
  date:2024-11-12
  cron: 0 10 ? * MON
  pzhttp: 账户#密码  多账号换行
*/
const fs = require('fs');
const file = '.pinzan_count';
let count = fs.existsSync(file) ? parseInt(fs.readFileSync(file, 'utf8')) || 0 : 0;
fs.writeFileSync(file, String(count + 1));

const pzhttp = process.env['pinzan'] || "";
const axios = require("axios")
let d = {
  table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
  UTF16ToUTF8: function(e) {
    for (var t = [], n = e.length, i = 0; i < n; i++) {
      var r, o, s = e.charCodeAt(i);
      0 < s && s <= 127 ? t.push(e.charAt(i)) : 128 <= s && s <= 2047 ? (r = 192 | s >> 6 & 31,
      o = 128 | 63 & s,
      t.push(String.fromCharCode(r), String.fromCharCode(o))) : 2048 <= s && s <= 65535 && (r = 224 | s >> 12 & 15,
      o = 128 | s >> 6 & 63,
      s = 128 | 63 & s,
      t.push(String.fromCharCode(r), String.fromCharCode(o), String.fromCharCode(s)))
    }
    return t.join("")
  },
  UTF8ToUTF16: function(e) {
    for (var t = [], n = e.length, i = 0, i = 0; i < n; i++) {
      var r, o, s = e.charCodeAt(i);
      0 == (s >> 7 & 255) ? t.push(e.charAt(i)) : 6 == (s >> 5 & 255) ? (o = (31 & s) << 6 | 63 & (r = e.charCodeAt(++i)),
      t.push(Sting.fromCharCode(o))) : 14 == (s >> 4 & 255) && (o = (255 & (s << 4 | (r = e.charCodeAt(++i)) >> 2 & 15)) << 8 | ((3 & r) << 6 | 63 & e.charCodeAt(++i)),
      t.push(String.fromCharCode(o)))
    }
    return t.join("")
  },
  encode: function(e) {
    if (!e)
      return "";
    for (var t = this.UTF16ToUTF8(e), n = 0, i = t.length, r = []; n < i; ) {
      var o = 255 & t.charCodeAt(n++);
      if (r.push(this.table[o >> 2]),
      n == i) {
        r.push(this.table[(3 & o) << 4]),
        r.push("==");
        break
      }
      var s = t.charCodeAt(n++);
      if (n == i) {
        r.push(this.table[(3 & o) << 4 | s >> 4 & 15]),
        r.push(this.table[(15 & s) << 2]),
        r.push("=");
        break
      }
      var a = t.charCodeAt(n++);
      r.push(this.table[(3 & o) << 4 | s >> 4 & 15]),
      r.push(this.table[(15 & s) << 2 | (192 & a) >> 6]),
      r.push(this.table[63 & a])
    }
    return r.join("")
  },
  decode: function(e) {
    if (!e)
      return "";
    for (var t = e.length, n = 0, i = []; n < t; )
      code1 = this.table.indexOf(e.charAt(n++)),
      code2 = this.table.indexOf(e.charAt(n++)),
      code3 = this.table.indexOf(e.charAt(n++)),
      code4 = this.table.indexOf(e.charAt(n++)),
      c1 = code1 << 2 | code2 >> 4,
      i.push(String.fromCharCode(c1)),
      -1 != code3 && (c2 = (15 & code2) << 4 | code3 >> 2,
      i.push(String.fromCharCode(c2))),
      -1 != code4 && (c3 = (3 & code3) << 6 | code4,
      i.push(String.fromCharCode(c3)));
    return this.UTF8ToUTF16(i.join(""))
  }
};

async function login(pzUser){
  let arr = pzUser.split("#");
  try{
    for (var e = d.encode("".concat(arr[0], "QWERIPZAN1290QWER").concat(arr[1])), t = "", o = 0; o < 80; o++){
      t += Math.random().toString(16).slice(2);
    }
      
    e = "".concat(t.slice(0, 100)).concat(e.slice(0, 8)).concat(t.slice(100, 200)).concat(e.slice(8, 20)).concat(t.slice(200, 300)).concat(e.slice(20)).concat(t.slice(300, 400));
    let res = await axios({
      url: "https://service.ipzan.com/users-login",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        account: e,
        source:"ipzan-home-one"
      },
    });
    return res.data.data.token;
  }catch(e){
    console.log(e);
  }
}

async function sign(token){
  try{
    let res = await axios({
      url: "https://service.ipzan.com/home/userWallet-receive",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    });
    console.log(res.data);
    
  }catch(e){
    console.log(e);
  }
}

async function main(pzUser){
  let token = await login(pzUser);
  if(token){
    await sign(token);
  }
  await new Promise(resolve => setTimeout(resolve, 10*1000));
}


!(async function(){
  console.log(`第${count+1}次执行，延时:${count*5}分钟`)
  await new Promise(r => setTimeout(r, count * 300000));
  if(!pzhttp){
    console.log("pzhttp未设置");
    return;
  }
  const pzArr = pzhttp.split("\n");
  for(let i = 0; i < pzArr.length; i++){
    await main(pzArr[i]);
  }
})()