const { sticker } = await import('../lib/sticker.js')
import { EmojiAPI } from "emoji-api"
const emoji = new EmojiAPI()

let handler = async (m, { conn, args, usedPrefix, command, isPrems }) => {
    let er = `contoh:
*${usedPrefix}${command}(spasi)ap(spasi)❤️*
*${usedPrefix}${command} ap ❤️*
┌〔 Opsi 〕
├ ap = apple
├ fa = facebook
├ go = google
├ ht = htc
├ lg
├ mi = microsoft
├ mo = mozilla
├ op = openmoji
├ pi = pixel
├ sa = samsung
├ tw = twitter
├ wh = whatsapp
└────
Hanya bisa 1 emoji, perhatikan spasi, jangan spam!`
    if (!args[0]) throw er

    let template = (args[0] || '').toLowerCase()
    if (!args[1]) throw er
    if (/emo/i.test(command)) {
        try {
            switch (template) {
                case 'apple':
                case 'ip':
                case 'ap':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[0].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'facebook':
                case 'fb':
                case 'fa':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[6].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'google':
                case 'go':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[1].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'htc':
                case 'ht':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[12].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'lg':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[11].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'microsoft':
                case 'mc':
                case 'mi':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[3].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'mozilla':
                case 'moz':
                case 'mo':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[13].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'openmoji':
                case 'omoji':
                case 'op':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[8].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'pixel':
                case 'pi':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[7].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'samsung':
                case 'ss':
                case 'sa':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[2].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'twitter':
                case 'tw':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[5].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
                case 'whatsapp':
                case 'wa':
                case 'wh':
                    emoji.get(`${args[1]}`)
                        .then(async emoji => {
                            let stiker = await sticker(false, emoji.images[4].url, global.packname, global.author)
                            await conn.sendFile(m.chat, stiker, '', '', m, false, {
                                asSticker: true
                            })
                        })
                    break
            }
        } catch (e) {
            throw er
        }
    }
}
handler.help = ['semoji']
handler.tags = ['sticker']
handler.command = /^((s(tic?ker)?)?emo(ji)?)$/i

export default handler