import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
    let res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, '', 'Istri kok kartun', m, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['waifu']
handler.tags = ['internet']
handler.command = /^(waifu)$/i

export default handler