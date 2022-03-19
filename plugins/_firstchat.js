import moment from 'moment-timezone'
let handler = m => m

handler.all = async function (m) {

    if (!m.chat.endsWith('.net') || m.fromMe || m.key.remoteJid.endsWith('status@broadcast')) return
    if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await this.sendButton(m.chat, `
Hai, ${ucapan()}
${user.banned ? 'kamu dibanned' : 'Ada yang bisa saya bantu?'}
`.trim(), wm, null, [user.banned ? 'Pemilik Bot' : 'Menu', user.banned ? '.owner' : '.?'], m)
    //await this.modifyChat(m.chat, 'mute', -Math.floor(new Date / 1e3) * 1e3 - 1e3).catch(_ => _)
    user.pc = new Date * 1
}

export default handler
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat dinihari"
    if (time >= 4) {
        res = "Selamat pagi"
    }
    if (time > 10) {
        res = "Selamat siang"
    }
    if (time >= 15) {
        res = "Selamat sore"
    }
    if (time >= 18) {
        res = "Selamat malam"
    }
    return res
}
