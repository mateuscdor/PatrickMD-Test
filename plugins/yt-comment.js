import { Canvacord } from 'canvacord'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'No Text'

    Canvacord.youtube({
        username: conn.getName(m.sender),
        content: text,
        avatar: await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/0a1c029c9e570691fa4ae.jpg'),
        dark: true
    }).then(data => {
        conn.sendFile(m.chat, data, 'youtube.png', '', m, 0, { thumbnail: Buffer.alloc(0) })
    })

}

handler.help = ['ytcomment <komen>']
handler.tags = ['maker']

handler.command = /^(ytcomment|ytc)$/i

export default handler