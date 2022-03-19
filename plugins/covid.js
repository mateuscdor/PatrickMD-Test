//let fetch = require('node-fetch')
import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. negaranya?\n\ncontoh:\n${usedPrefix + command} indonesia`
    let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/' + (text)))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (json.confirmed) m.reply(`
Countries : ${text}
Confirmed : ${json.confirmed.value}
Recovered : ${json.recovered.value}
Deaths : ${json.deaths.value}
Last Update : ${json.lastUpdate}
`.trim())
    else throw json
}
handler.help = ['covid'].map(v => v + ' <negara>')
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19)$/i
export default handler