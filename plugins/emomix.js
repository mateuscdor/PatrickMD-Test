const { sticker } = await import('../lib/sticker.js')
//let fetch = require('node-fetch')
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Penggunaan:\n${usedPrefix + command}  <emoji> <emoji>\n\nContoh:\n${usedPrefix + command}  🤔|😂`
    let [e1, e2] = text.split(/[&|\. ]/i)
    let res = await fetch(API('stikerinapi', '/emojimix', { e1, e2 }, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let stiker = await sticker(false, json.data, packname, author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'emojimix.webp', '', m, 0, { asSticker: true })
    else throw stiker.toString()
}
handler.help = ['emojimix <emoji>|<emoji>']
handler.tags = ['sticker']
handler.command = /^emo(ji)?mix$/i

handler.limit = 1

export default handler