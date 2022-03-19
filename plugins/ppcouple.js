//let fetch = require("node-fetch")
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let res = await fetch(global.API('LeysCoder', '/api/ppcouple', {}, 'apikey'))
    await m.reply(global.wait)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.status) throw json
    await conn.sendFile(m.chat, json.result.male, '', 'Cowo', m)
    await conn.sendFile(m.chat, json.result.female, '', 'Cewe', m)
}
handler.help = ['ppcouple', 'ppcp']
handler.tags = ['internet']
handler.command = /^(pp(cp|couple))$/i

export default handler