let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length < 3) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <@tag> <type> <jumlah>\ncontoh penggunaan: *${usedPrefix}transfer @tag money 100*`.trim(), m)
    } else try {
        let type = (args[1] || '').toLowerCase()
        let count = args[2] && args[2].length > 0 ? Math.min(9999999, Math.max(parseInt(args[2]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if (!m.mentionedJid || !args[0]) throw 'Tag salah satu, atau ketik Nomernya!!'
        let users = db.data.users
        switch (type) {
            case 'money':
                if (users[m.sender].money >= count * 1) {
                    try {
                        users[m.sender].money -= count * 1
                        users[who].money += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer money sebesar ${count}`.trim(), m)
                    } catch (e) {
                        users[m.sender].money += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Money sebesar ${count}`.trim(), m)
                break
            case 'potion':
                if (users[m.sender].potion >= count * 1) {
                    try {
                        users[m.sender].potion -= count * 1
                        users[who].potion += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Potion`.trim(), m)
                    } catch (e) {
                        users[m.sender].potion += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Potion kamu tidak cukup`.trim(), m)
                break
            case 'sampah':
                if (users[m.sender].sampah >= count * 1) {
                    try {
                        users[m.sender].sampah -= count * 1
                        users[who].sampah += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Sampah`.trim(), m)
                    } catch (e) {
                        users[m.sender].sampah += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Sampah kamu tidak cukup`.trim(), m)
                break
            case 'diamond':
                if (users[m.sender].diamond >= count * 1) {
                    try {
                        users[m.sender].diamond -= count * 1
                        users[who].diamond += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Diamond`.trim(), m)
                    } catch (e) {
                        users[m.sender].diamond += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Diamond kamu kamu tidak cukup`.trim(), m)
                break
            case 'common':
                if (users[m.sender].common >= count * 1) {
                    try {
                        users[m.sender].common -= count * 1
                        users[who].common += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Common Crate`.trim(), m)
                    } catch (e) {
                        users[m.sender].common += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Common crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'uncommon':
                if (users[m.sender].uncommon >= count * 1) {
                    try {
                        users[m.sender].uncommon -= count * 1
                        users[who].uncommon += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Uncommon Crate`.trim(), m)
                    } catch (e) {
                        users[m.sender].uncommon += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Uncommon crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'mythic':
                if (users[m.sender].mythic >= count * 1) {
                    try {
                        users[m.sender].mythic -= count * 1
                        users[who].mythic += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Mythic crate`.trim(), m)
                    } catch (e) {
                        users[m.sender].mythic += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                    }
                } else conn.reply(m.chat, `Mythic crate kamu kamu tidak cukup`.trim(), m)
                break
            case 'legendary':
                if (users[m.sender].legendary >= count * 1) {
                    try {
                        users[m.sender].legendary -= count * 1
                        users[who].legendary += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer ${count} Legendary crate`.trim(), m)
                    } catch (e) {
                        users[m.sender].legendary += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)

                    }
                } else conn.reply(m.chat, `Legendary crate kamu kamu tidak cukup`.trim(), m)
                break
            default:
                return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <@tag> <type> <jumlah>\ncontoh penggunaan: *${usedPrefix}transfer @tag money 100*\n\n*List yang bisa di transfer*\nMoney\nPotion\nSampah\nDiamond\nCommon\nUncommon\nMythic\nLegendary`.trim(), m)
        }
    } catch (e) {
        conn.reply(m.chat, `Format yang anda gunakan salah\n\nGunakan format ${usedPrefix}transfer <@tag> <type> <jumlah>\ncontoh penggunaan: *${usedPrefix}transfer @tag money 100*`.trim(), m)
        console.log(e)
    }
}

handler.help = ['transfer <@tag> <type> <jumlah>']
handler.tags = ['rpg']
handler.command = /^(transfer|tf)$/i

export default handler