//let fetch = require('node-fetch')
import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
    let res = await fetch('https://api.waifu.pics/sfw/megumin')
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.url) throw 'Eror!'
    conn.sendFile(m.chat, json.url, '', wm, m, 0, { thumbnail: await (await fetch(json.url)).buffer() })
}
handler.help = ['megumin']
handler.tags = ['internet']
handler.command = /^(megumin)$/i

export default handler