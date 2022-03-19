let handler = async (m, { conn }) => {
    let blocked = conn.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
    await conn.reply(m.chat, `
┌「 Daftar Terblokir 」
│◦❒ Total : ${blocked.length} Pengguna
${blocked.map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join`\n`}
└────`.trim(), m, { mentions: blocked })
}
handler.help = ['blocklist']
handler.tags = ['owner']
handler.command = /^listbloc?k|bloc?klist|daftarbloc?k|blocks$/i
handler.owner = true

export default handler