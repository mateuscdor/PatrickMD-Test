const cooldown = 2592000000 //2628000000000 2629800000
const free = 50000
const prem = 500000
let handler = async (m, { conn, isPrems }) => {
    let user = global.db.data.users[m.sender]
    /*let time = user.lastmonthly + cooldown
    let timers = msToTime(time - new Date())*/
    let _timers = (cooldown - (new Date - user.lastweekly))
    let timers = clockString(_timers)
    if (new Date - user.lastmonthly < cooldown) throw `Kamu sudah mengklaim klaim bulanan bulan ini\nSilahkan tunggu *${timers}* lagi`
    //if (new Date - user.lastmonthly > cooldown) {
    conn.reply(m.chat, `✉️ +${isPrems ? prem * user.level : free * user.level} XP
💵 +100000 Money
🗃️ +5 Legendary crate
📦 +3 Pet crate`, m)
    user.exp += isPrems ? prem * user.level : free * user.level
    user.money += 100000
    user.legendary += 5
    user.pet += 3
    user.lastmonthly = new Date * 1
    /*} else {
        let buttons = button(`Kamu sudah mengklaim klaim bulanan bulan ini\nSilahkan tunggu *${timers}* lagi`, user)
        conn.sendMessage(m.chat, buttons, MessageType.buttonsMessage, { quoted: m })
    }*/
}
handler.help = ['monthly']
handler.tags = ['xp']
handler.command = /^(monthly)$/i

export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + " jam " + minutes + " menit"
}

function clockString(ms) {
    let remain = ms

    let w = isNaN(ms) ? '--' : Math.floor(remain / 604800000) + ' Minggu'
    remain = remain % (1000 * 60 * 60 * 24 * 7)
    let d = isNaN(ms) ? '--' : Math.floor(remain / 86400000) + ' Hari'
    remain = remain % (1000 * 60 * 60 * 24)
    let h = isNaN(ms) ? '--' : Math.floor(remain / 3600000) + ' Jam'
    remain = remain % (1000 * 60 * 60)
    let m = isNaN(ms) ? '--' : Math.floor(remain / 60000) % 60 + ' Min'
    remain = remain % (1000 * 60)
    let s = isNaN(ms) ? '--' : Math.floor(remain / 1000) % 60 + ' Dtk'
    remain = remain % (1000)
    return [w, d, h, m, s].map(v => v.toString().padStart(2, 0)).join(', ')
}