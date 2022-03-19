import uploadImage from '../lib/uploadImage.js'
const { sticker } = await import('../lib/sticker.js')
const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered']

let handler = async (m, { conn, usedPrefix, text, command }) => {
    let effect = text.trim().toLowerCase()
    if (!effects.includes(effect)) throw `
┌─〔 Daftar Efek 〕
${effects.map(effect => `├ ${effect}`).join('\n')}
└────
contoh:
${usedPrefix + command} jail
`.trim()
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'balas gambarnya!'
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak didukung`
    let img = await q.download()
    let url = await uploadImage(img)
    let apiUrl = global.API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
        avatar: url
    })
    try {
        let stiker = await sticker(false, apiUrl, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, '', '', m, false, {
            asSticker: true
        })
    } catch (e) {
        await conn.sendFile(m.chat, apiUrl, 'image.png', null, m, 0, { thumbnail: await (await fetch(apiUrl)).buffer() })
    }
}

handler.help = ['stikermaker']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?maker)$/i

export default handler