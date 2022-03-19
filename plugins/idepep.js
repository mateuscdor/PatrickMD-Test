import axios from 'axios'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `uhm.. id nya mana?\n\ncontoh:\n${usedPrefix + command} 1906651269`
    /*let res = await axios.post('https://kiosgamer.co.id/api/auth/player_id_login', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Mobile Safari/537.36'
      },
      "app_id": 100067, "login_id": `${args[0]}`
    });*/
    //if (!res.ok) throw eror
    /*let json = await res.json()
    if (!json.status) throw json*/
    let res = await stalkff(args[0])
    await m.reply(`ID: ${res.id}
Nickname: ${res.nickname}`)
}
handler.help = ['epep'].map(v => v + ' <id>')
handler.tags = ['internet']
handler.command = /^(freefire|epep)$/i

export default handler

async function stalkff(userId) {
    var datap = {
        "voucherPricePoint.id": 8050,
        "voucherPricePoint.price": "",
        "voucherPricePoint.variablePrice": "",
        "email": "",
        "n": "",
        "userVariablePrice": "",
        "order.data.profile": "",
        "user.userId": userId,
        "voucherTypeName": "FREEFIRE",
        "affiliateTrackingId": "",
        "impactClickId": "",
        "checkoutId": "",
        "tmwAccessToken": "",
        "shopLang": "in_ID",
    }
    var epep = await axios({
        "headers": {
            "Content-Type": "application/json; charset\u003dutf-8"
        },
        "method": "POST",
        "url": "https://order.codashop.com/id/initPayment.action",
        "data": datap
    })
    return {
        id: userId,
        nickname: epep.data["confirmationFields"]["roles"][0]["role"]
    }
}