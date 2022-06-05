const got = require('got')

//const SCKEY = process.env.SCKEY
//企微的参数
const corpid = process.env.CKEY
const corpsecret = process.env.SKEY


const sendNotify = (title, message) => {
  //TODO: 企业微信推送
      try {
         if (corpid && corpsecret) {
                let url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`
                let res = await axios.get(url)
                access_token = res.data.access_token
                let turl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${access_token}`
                let data = {
                    "touser": "@all",
                    "msgtype": "text",
                    "agentid": 1000002,
                    "text": {
                        "content": msg
                    },
                    "safe": 0
                }
                let tres = await axios.post(turl, data)
                if (tres.data.errcode == 0) {
                    console.log("企业微信:发送成功");
                } else {
                    console.log("企业微信:发送失败");
                    console.log(tres.data.errmsg);
                }
            } else {
                console.log("企业微信:你还没有填写corpsecret和corpid呢，推送个鸡腿");
            }
        } catch (err) {
            console.log("企业微信：发送接口调用失败");
            console.log(err);
        }
        resolve();
  /*
  if (SCKEY) {
    got(`https://sc.ftqq.com/${SCKEY}.sendNotify`, {
      searchParams: {
        text: title,
        desp: message,
      },
      responseType: 'json',
    })
      .then(({ body }) => {
        if (body.errno === 0) {
          console.log('server酱发送通知消息成功\n')
        } else if (body.errno === 1024) {
          console.log(`server酱发送通知消息异常: ${body.errmsg}\n`)
        } else {
          console.log(`server酱发送通知消息异常\n${JSON.stringify(body)}`)
        }
      })
      .catch((err) => {
        console.log('发送通知调用API失败！！\n')
        console.log(err)
      })
  } else {
    console.log('您未提供server酱的SCKEY，取消微信推送消息通知\n')
  }
  */
}

module.exports = sendNotify
