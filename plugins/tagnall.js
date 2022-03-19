let handler = async (m, { conn, text, participants, isAdmin, isOwner, command }) => {
    if (/^tagc(e)?we(k)?$/i.test(command)) {
        let jidnyah = ['6281519202658@s.whatsapp.net', '62895338193140@s.whatsapp.net', '6285776085457@s.whatsapp.net', '12267411820@s.whatsapp.net']
        if (m.chat !== '628179060771-1623660360@g.us') return

        let users = participants.map(u => u.id).filter(v => !jidnyah.includes(v))
        m.reply(`${text ? `${text}\n` : ''}┌─「 Tag All 」\n` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
            contextInfo: { mentionedJid: users }
        })
    }

    if (/^(tag6c)$/i.test(command)) {
        let jidnyah = ['628118901805@s.whatsapp.net', '6281519202658@s.whatsapp.net', '12267411820@s.whatsapp.net']
        if (m.chat !== '628179060771-1623660360@g.us') return

        let users = participants.map(u => u.id).filter(v => !jidnyah.includes(v))
        m.reply(`${text ? `${text}\n` : ''}┌─「 Tag All 」\n` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
            contextInfo: { mentionedJid: users }
        })
    }

    if (/^tagtekon$/i.test(command)) {
        let jidnyah = ['12267411820@s.whatsapp.net', '62895338193140@s.whatsapp.net', '6287880878027@s.whatsapp.net', '6285776085457@s.whatsapp.net', '6281210043259@s.whatsapp.net']
        if (m.chat !== '628179060771-1623660360@g.us') return

        let users = participants.map(u => u.id).filter(v => !jidnyah.includes(v))
        m.reply(`${text ? `${text}\n` : ''}┌─「 Tag All 」\n` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
            contextInfo: { mentionedJid: users }
        })
    }
}


handler.help = ['']
handler.tags = ['']
handler.command = /^(tagc(e)?we(k)?|tag6c|tagtekon)$/i


export default handler