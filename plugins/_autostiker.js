const { sticker } = await import('../lib/sticker.js')
const { webp2png } = await import('../lib/webp2mp4.js')
//const WSF = require('wa-sticker-formatter')
import WSF from 'wa-sticker-formatter'
let handler = m => m

handler.before = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    if (chat.stiker && !user.banned && !chat.isBanned && !m.fromMe && !m.isBaileys) {
        // try {
        if (/^.*s(tic?ker)?(gif)?$/i.test(m.text)) return
        let q = m
        let stiker = false
        let wsf = false
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) return
        if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) return
            stiker = await sticker(img, false, global.packname, global.author)
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!\nJika hasilnya tidak bergerak, ubah menjadi gif dengan ukuran file sekecil mungkin.')
            let img = await q.download()
            if (!img) return
            stiker = await sticker(img, false, global.packname, global.author)
        }
        if (stiker) await this.sendFile(m.chat, stiker, '', '', m, false, {
            asSticker: true
        })
        // } finally {
        //     if (stiker) {
        //     }
        // }
    }
    return true
}

export default handler