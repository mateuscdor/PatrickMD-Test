import { tiktok, twitter, pin } from '../lib/scrape.js'
import { tiktokdl, youtubeSearch, facebookdl, facebookdlv2, instagramdlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import axios from 'axios'
import yts from 'yt-search'
import util from 'util'

export async function all(m, { isPrems }) {

    if (m.isCommand) return
    if (m.chat.endsWith('broadcast')) return
    if (!db.data.chats[m.chat].download) return
    if (db.data.users[m.sender].banned) return
    if (db.data.chats[m.chat].isBanned) return

    let url = m.text.split(/\n| /i)[0]

    if (/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com/i.test(m.text)) {
        url = m.text.match(/https?:\/\/(www\.|v(t|m)\.|t\.)?tiktok\.com\/.*/i)[0].split(/\n| /i)[0]
        let res = await fetch(API('stikerinapi', '/tiktok', { url }, 'apikey'))
        if (!res.ok) return m.reply('Error: ' + res.statusText)
        let json = await res.json()
        if (!json.status) return m.reply(json)
        await m.reply(wait)
        await this.sendFile(m.chat, json.video, 'tiktok.mp4', json.caption, m)
        /*tiktokdl(url).then(async res => {
            let tt = JSON.stringify(res)
            let json = JSON.parse(tt)
            if (!json.video.no_watermark && !json.video.no_watermark2) return
            await m.reply(wait)
            await conn.sendFile(m.chat, json.video.no_watermark || json.video.no_watermark2, 'tiktok.mp4', json.description, m).catch(err => m.reply('\`\`\`' + err + '\`\`\`'))
        })*/
    }

    if (/^.*(fb.watch|facebook.com)/i.test(m.text)) {
        const { result } = await facebookdl(url).catch(async _ => await facebookdlv2(url))
        let { url: link, isVideo } = result.reverse()[0]
        if (!link) return //throw `${eror} atau Video tidak ditemukan`
        await m.reply(wait)
        await conn.sendFile(m.chat, link, `facebook.${!isVideo ? 'bin' : 'mp4'}`, wm, m)
    }

    if (/^.*instagram.com\/(p|reel|tv)/i.test(m.text)) {
        const results = await instagramdlv2(url)
        const { url: res } = results
        if (!res) return //throw `${eror} atau Media tidak di temukan`
        await conn.sendFile(m.chat, res, 'instagram' + (/mp4/i.test(res) ? '.mp4' : '.jpg'), wm, m)
    }

    if (/^.*(pinterest.com\/pin|pin.it)/i.test(m.text)) {
        pin(url).then(async res => {
            let pin = JSON.stringify(res)
            let json = JSON.parse(pin)
            if (!json.status) return m.reply(eror)
            await m.reply(wait)
            m.reply(util.format(json))
            await this.sendFile(m.chat, json.data.url, '', wm, m)
        }).catch(_ => _)
    }

    if (/^.*twitter.com\//i.test(m.text)) {
        twitter(url).then(async res => {
            let twit = JSON.stringify(res)
            let json = JSON.parse(twit)
            let pesan = json.data.map((v) => `Link: ${v.url}`).join('\n------------\n')
            await m.reply(wait)
            for (let { url } of json.data) {
                this.sendFile(m.chat, url, 'ig' + (/mp4/i.test(url) ? '.mp4' : '.jpg'), wm, m)
            }
        }).catch(_ => _)
    }

    if (/^https?:\/\/.*youtu/i.test(m.text)) {
        let vid = (await youtubeSearch(url)).video[0]
        if (!vid) throw 'Video/Audio Tidak ditemukan'
        let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
        const url = 'https://www.youtube.com/watch?v=' + videoId
        await conn.send2ButtonLoc(m.chat, await (await fetch(thumbnail)).buffer(), `
📌 *Title:* ${title}
⏲️ *Published:* ${publishedTime}
⌚ *Duration:* ${durationH}
👁️ *Views:* ${viewH}
  `.trim(), wm, 'Audio 🎧', `${usedPrefix}yta ${url}`, 'Video 🎥', `${usedPrefix}ytv ${url}`)



        /*let results = await yts(url)
        let vid = results.all.find(video => video.seconds < 3600)
        if (!vid) return m.reply('Video/Audio Tidak ditemukan')
        let yt = false
        let usedServer = servers[0]
        for (let i in servers) {
            let server = servers[i]
            try {
                yt = await yta(vid.url, server)
                yt2 = await ytv(vid.url, server)
                usedServer = server
                break
            } catch (e) {
                m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
            }
        }
        if (yt === false) return m.reply(eror)
        if (yt2 === false) return m.reply(eror)
        let { dl_link, thumb, title, filesize, filesizeF } = yt
        await this.send2ButtonLoc(m.chat, await (await fetch(thumb)).buffer(), `
*Judul:* ${title}
*Server y2mate:* ${usedServer}
`.trim(), wm, `Audio ${filesizeF}`, `.yta ${vid.url}`, `Video ${yt2.filesizeF}`, `.yt ${vid.url}`)*/
    }

}