import fs from 'fs'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import WSF from 'wa-sticker-formatter'

let handler = m => m
handler.all = async function (m, { isBlocked }) {

    let filenya = fs.readFileSync('./src/Stiker/apasi.webp')
    let stiker = await sticker(filenya, false, global.packname, global.author)
    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            /*await this.send2Button(m.chat,
                isBanned ? 'PatrickBot tidak aktif' : banned ? 'kamu dibanned' : 'PatrickBot disini',
                wm,
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)*/

            await this.sendFile(m.chat, stiker, 'apasi.webp', '', m, 0, { asSticker: true })
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(m.chat, `Ketik\n*.join <linkGroup>*\n\nContoh:\n.join https://chat.whatsapp.com/blabla\n\n*Fitur Khusus Member Premium*
`.trim(), wm, null, ['Pemilik Bot', '.owner'], m)
    }

    // salam
    /*let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`)
    }*/

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0][0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0][0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }

}

export default handler

function clockString(ms) {
    let remain = ms

    let d = isNaN(ms) ? '--' : Math.floor(remain / 86400000) + ' Hari'
    remain = remain % (1000 * 60 * 60 * 24)
    let h = isNaN(ms) ? '--' : Math.floor(remain / 3600000) + ' Jam'
    remain = remain % (1000 * 60 * 60)
    let m = isNaN(ms) ? '--' : Math.floor(remain / 60000) % 60 + ' Min'
    remain = remain % (1000 * 60)
    return [d, h, m].map(v => v.toString().padStart(2, 0)).join(', ')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}