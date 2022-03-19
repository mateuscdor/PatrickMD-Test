import { instagramdl, instagramdlv2 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `uhm.. url nya mana?\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CQU21b0JKwq/`
    if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `url salah, perintah ini untuk mengunduh post/reel/tv`
    const results = await instagramdlv2(args[0])
    for (const { url } of results) {
        if (!url) throw `${eror} atau Media tidak di temukan`
        await conn.sendFile(m.chat, url, 'instagram' + (/mp4/i.test(url) ? '.mp4' : '.jpg'), `🔗 *Url:* ${url}`, m)
    }
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i

export default handler
