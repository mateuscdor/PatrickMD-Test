import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let res = await fetch(global.API('xteam', '/randomimage/wpmobile', {}, 'APIKEY'))
    if (!res.ok) throw eror
    let img = await res.buffer()
    if (!img) throw img
    conn.sendFile(m.chat, img, '', wm, m, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['wallpaperanime']
handler.tags = ['internet']
handler.command = /^(wallpaper|wp)anime$/i
handler.limit = true

export default handler