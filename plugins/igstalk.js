//const { instagramStalk } = require('@bochilteam/scraper')
//const fetch = require('node-fetch')
import { instagramStalk } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `contoh:\n${usedPrefix + command} aniqshehyar_`

    /*let res = await fetch(global.API('zekais', '/igs', { username: args[0] }))
    if (!res.ok) throw eror
    let json = await res.json()
    if (json.status != 200) throw json
    conn.sendFile(m.chat, json.data.profilehd, 'eror.jpg', `*Nama:* ${json.data.fullname}\n*Bio:* ${json.data.bio}\n*Followers:* ${json.data.follower}\n*Following:* ${json.data.following}\n*Posts:* ${json.data.timeline}\n*Private:* ${json.data.private ? 'Ya' : 'Tidak'}\n\nhttps://www.instagram.com/aniqshehyar_/`, m, 0, { thumbnail: await (await fetch(json.data.profilehd)).buffer() })*/

    let results = await instagramStalk(args[0])
    const { name, username, description, posts, postsH, followersH, followers, following, followingH } = results
    m.reply(`*Nama:* ${name}\n*Bio:* ${description}\n*Followers:* ${followersH || followers}\n*Following:* ${followingH || following}\n*Posts:* ${postsH || posts}\n\nhttps://www.instagram.com/${username.replace('@', '')}/`)
}
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk)$/i
handler.limit = true
export default handler