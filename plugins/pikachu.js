//let fetch = require("node-fetch")
const { sticker } = await import('../lib/sticker.js')
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let res = await fetch(global.API('https://some-random-api.ml', '/img/pikachu'))
    if (!res.ok) throw eror
    let json = await res.json()
    let stiker = await sticker(null, json.link, global.packname, global.author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m, false, {
        asSticker: true
    })
    throw stiker.toString()
}
handler.help = ['pikachu']
handler.tags = ['internet']
handler.customPrefix = /^pik{1,2}a(c{1,2}hu)?$/i
handler.command = new RegExp

export default handler