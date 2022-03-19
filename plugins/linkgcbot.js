let handler = async (m, { conn }) => {
    m.reply('PatrickBot Official 1:\nhttps://chat.whatsapp.com/HtsPTbNsfLZFcWiGNiN33p\n\nPatrickBot Official 2:\nhttps://chat.whatsapp.com/K6jXU5WRe8oLKEh9YpYdSL')
}


handler.help = ['linkgcbot']
handler.tags = ['info']
handler.command = /^link(group|gc)bot$/i

//handler.register = true

export default handler