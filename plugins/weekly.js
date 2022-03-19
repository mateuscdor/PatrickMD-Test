const cooldown = 604800000
const free = 5000
const prem = 50000
let handler = async (m, { conn, isPrems }) => {
    let user = global.db.data.users[m.sender]
    let time = user.lastweekly + cooldown
    let timers = clockString(time - new Date())
    if (new Date - user.lastweekly < cooldown) throw `Kamu sudah mengklaim klaim mingguan minggu ini\ntunggu selama ${timers} lagi`
    //if (new Date - user.lastweekly > cooldown) {
    conn.reply(m.chat, `✉️ +${isPrems ? prem * user.level : free * user.level} XP
💵 +20000 Money 
🗃️ +3 Legendary crate`, m)
    user.exp += isPrems ? prem * user.level : free * user.level
    user.money += 20000
    user.legendary += 3
    user.lastweekly = new Date * 1
}
handler.help = ['weekly']
handler.tags = ['xp']
handler.command = /^(weekly)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

function clockString(ms) {
    let remain = ms

    let d = isNaN(ms) ? '--' : Math.floor(remain / 86400000) + ' Hari'
    remain = remain % (1000 * 60 * 60 * 24)
    let h = isNaN(ms) ? '--' : Math.floor(remain / 3600000) + ' Jam'
    remain = remain % (1000 * 60 * 60)
    let m = isNaN(ms) ? '--' : Math.floor(remain / 60000) % 60 + ' Min'
    remain = remain % (1000 * 60)
    let s = isNaN(ms) ? '--' : Math.floor(remain / 1000) % 60 + ' Dtk'
    remain = remain % (1000)
    return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(', ')
}

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