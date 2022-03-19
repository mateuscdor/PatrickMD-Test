//let { tiktokdl, tiktokdlv2 } = require('@bochilteam/scraper')
//let { toAudio } = require('../lib/converter')
//let { tiktok } = require('../lib/scrape')
import { tiktokdl, tiktokdlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
let handler = async (m, { conn, args, usedPrefix, command }) => {

    let wet
    if (m.sender !== owner[3] + '@s.whatsapp.net') {
        wet = wait
    } else if (m.sender === owner[3] + '@s.whatsapp.net') {
        wet = wait2
    }

    let teks
    if (m.quoted) {
        teks = m.quoted.text
    } else {
        teks = args[0]
    }

    if (!args[0]) return m.reply(`Uhm.. Url nya mana?\n\ncontoh:\n${usedPrefix + command} https://vt.tiktok.com/yqyjPX/`)
    if (!args[0].match(/tiktok/gi)) return m.reply(`Url Salah`)


    if (/^(tiktok|tt)(audio|mp3)$/i.test(command)) {
        /*tiktokdl(args[0]).then(async res => {
            let tt = JSON.stringify(res)
            let json = JSON.parse(tt)

            if (!json.music) return m.reply(`${eror} atau Audio tidak di Temukan`)
            await m.reply(wet)

            conn.sendFile(m.chat, json.music, 'tiktok.mp3', '', m, null, {
                mimetype: 'audio/mp4'
            })
        })*/ //.catch(async e => {
        //await m.reply('Server 1 gagal!\nmencoba server 2...')
        let res = await fetch(API('stikerinapi', '/tiktok', { url: args[0] }, 'apikey'))
        let json = await res.json()
        if (!json.status) return m.reply(json)
        await m.reply(wet)
        await conn.sendFile(m.chat, json.audio, 'tiktok.mp3', '', m, null, {
            mimetype: 'audio/mp4'
        })
        //})
    }


    if (/^(tiktok|tt)$/i.test(command)) {

        //await m.reply(wet)
        //tiktokdl(args[0]).then(async res => {
        //let tt = JSON.stringify(res)
        //let json = JSON.parse(tt)
        //console.log(json.video)
        //if (!json.video.no_watermark && !json.video.no_watermark2) return m.reply(`${eror} atau Video tidak di Temukan`)

        //await m.reply(wet)
        //await conn.sendFile(m.chat, json.video.no_watermark || json.video.no_watermark2, 'tiktok.mp4', json.description, m)
        //await conn.sendButtonVid(m.chat, json.video.no_watermark, json.description, wm, 'Audio', `${usedPrefix}ttaudio ${teks}`, m)
        //}).catch(async e => {
        let res = await fetch(API('stikerinapi', '/tiktok', { url: args[0] }, 'apikey'))
        if (!res.ok) return m.reply('Error: ' + res.statusText)
        let json = await res.json()
        if (!json.status) return m.reply(json.toString())
        await m.reply(wait)
        await conn.sendFile(m.chat, json.video, 'tiktok.mp4', json.caption, m)
        //})
    }
}
handler.help = ['tiktok', 'tiktokmp3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((tiktok|tt)|((tiktok|tt)(audio|mp3)))$/i

handler.limit = true

export default handler