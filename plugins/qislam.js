//let fetch = require('node-fetch')
import fetch from 'node-fetch'
let handler = async (m, { conn, command, usedPrefix }) => {
    let res = await fetch(API('islamic', '/api/data/quotes', {}))
    if (!res.ok) throw eror
    let json = await res.json()
    await conn.sendButton(m.chat, json.result.text_id, wm, 'Quotes Islami', usedPrefix + command, m)
}
handler.help = ['qislam']
handler.tags = ['quotes']
handler.command = /^(q(uotes?)?islami?)$/i

export default handler