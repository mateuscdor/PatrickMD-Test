let { mediafire } = await import('../lib/scrape.js')

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw `Uhm.. Url nya mana?\n\ncontoh:\n${usedPrefix + command} https://www.mediafire.com/file/a8cermi1xtwwnk7/`
    if (!args[0].match(/mediafire/gi)) throw `Url salah`

    mediafire(args[0]).then(async res => {
        //console.log(res)
        m.reply(wait)
        let text = `┌── 「 *Mediafire Downloader* 」 ──
│◦❒ File Name: ${res[0].nama}
│◦❒ Size: ${res[0].size}
│◦❒ Mime: ${res[0].mime}
│◦❒ Link: ${res[0].link}
└────
_*Tunggu sebentar file akan segera di Kirim...*_`

        await m.reply(text)
        conn.sendFile(m.chat, res[0].link, res[0].nama, '', m)
    }).catch(err => m.reply(err))
}

handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire?)$/i

handler.limit = true

export default handler