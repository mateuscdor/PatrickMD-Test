//const { instagramStory } = require('@bochilteam/scraper')
import { instagramStory, instagramStoryv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw `uhm.. username nya mana?\n\ncontoh:\n\n${usedPrefix + command} aniqshehyar_`
    if (args[0].startsWith('http') || args[0].startsWith('@')) throw `username salah`

    let { results } = await instagramStory(args[0])
    for (const { url, isVideo, thumbnail } of results) {
        conn.sendFile(m.chat, url, isVideo ? 'ig.mp4' : 'ig.jpg', wm, m, { thumbnail: await (await fetch(thumbnail)).buffer() })
    }

}
handler.help = ['igstory'].map(v => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(igs(tory)?)$/i

handler.limit = true

export default handler