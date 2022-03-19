import { lyrics, lyricsv2 } from '@bochilteam/scraper'
import finder from 'lyrics-finder'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!teks) throw `Use example ${usedPrefix}${command} hallo`
    try {
        const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
        m.reply(`
Lyrics *${result.title}*
Author ${result.author}


${result.lyrics}


Url ${result.link}
`.trim())
    } catch (e) {
        let res = await finder("", text)
        if (!res) throw eror

        m.reply(res)
    }
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

export default handler