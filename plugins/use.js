let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = db.data.users[m.sender]
    let msgerror = (pickRandom(['Error', 'astagfirullah error', 'Nice Error', 'Salah format keknya :v', 'error bro', 'Kocak error :v', 'wtf error :v', 'Ciaaa error', 'error cuyy', 'dahlah🗿 error']))
    try {
        let msgkurang = (pickRandom(['potionmu tidak cukup', 'ciaa gk cukup potionyya :v', 'wtf gk cukup :v', 'beli potion dulu, potionmu gk cukup', 'Duaarr potionmu gk cukup', 'eyyyy potionmu kurang', 'beli dulu lah, masak mau pakai potion tapi gk ada potionnnya :v', 'minta ke orang lain suruh transfer potion, biar potionmu gk kurang :v', 'Beli potion dulu KK']))
        let msgpenuh = (pickRandom(['Nyawamu sudah penuh', 'coba deh liat inv mu, nyawamu kan dah 100 ngapain ngunain potion lagi?', 'health mu dah penuh woyy', 'nyawamu dah penuh :v', 'udh weh', 'udh penuh']))
        let kucing = user.kucing
        let usepotion = (kucing == 0 ? 40 : '' || kucing == 1 ? 45 : '' || kucing == 2 ? 50 : '' || kucing == 3 ? 55 : '' || kucing == 4 ? 60 : '' || kucing == 5 ? 65 : '' || kucing == 6 ? 70 : '' || kucing == 7 ? 75 : '' || kucing == 8 ? 80 : '' || kucing == 9 ? 85 : '' || kucing == 10 ? 90 : '')
        let healt = user.healt
        if (/use|pakai/i.test(command)) {
            try {
                let count = (/[0-9]/g.test(args[1])) ? !args[1] || args.length < 2 ? Math.max((Math.ceil((100 - global.DATABASE._data.users[m.sender].healt) / usepotion)), 1) : Math.max(args[1], 1) : Math.max((Math.ceil((100 - global.DATABASE._data.users[m.sender].healt) / usepotion)), 1)
                let msgsucces = (pickRandom(['success memakai', 'Nice succes menggunakan', 'berhasil meminum ', 'primitif anda menggunakan', 'anda memakai', 'Anda menggunakan']) + ' *' + (count * 1) + '* Potion')
                if (args[0] === 'potion') {
                    if (user.healt < 100) {
                        if (user.potion >= count * 1) {
                            user.potion -= count * 1
                            user.healt += usepotion * count
                            conn.reply(m.chat, msgsucces, m)
                        } else conn.reply(m.chat, msgkurang, m)
                    } else conn.reply(m.chat, msgpenuh, m)
                } else if (args.length > 2 && args[0] === !'potion') m.reply(pickRandom(['Hanya bisa menggunakan potion', 'Mau ngunain apa? Cuma bisa gunain potion :v', 'Wih mau gunain apa kamu, kan hanya bisa potion', 'Waduheck, hanya bisa potion', 'lah, mau gunain apa?, kan hanya bisa potion']) + '\nContoh penggunaan: *' + usedPrefix + 'potion 1*')
            } catch (e) {
                console.log(e)
                m.reply(msgerror)
            }
        } else if (/heal/i.test(command)) {
            try {
                let count = (/[0-9]/g.test(args[0])) ? !args[0] || args.length < 1 ? Math.max((Math.ceil((100 - user.healt) / usepotion)), 1) : Math.max(args[0], 1) : Math.max((Math.ceil((100 - user.healt) / usepotion)), 1)
                let msgsucces = (pickRandom(['success memakai', 'Nice succes menggunakan', 'berhasil meminum ', 'anda memakai', 'Anda menggunakan']) + ' *' + (count * 1) + '* Potion')
                if (user.healt < 100) {
                    if (user.potion >= count * 1) {
                        user.potion -= count * 1
                        user.healt += usepotion * count
                        conn.reply(m.chat, msgsucces, m)
                    } else conn.reply(m.chat, msgkurang, m)
                } else conn.reply(m.chat, msgpenuh, m)
            } catch (e) {
                console.log(e)
                m.reply(msgerror)
            }
        }
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, msgerror, m)
    }
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal|use)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}