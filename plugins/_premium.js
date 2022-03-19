export async function before(m) {
    let user = db.data.users[m.sender]
    //const data = global.owner.filter(([id, isCreator]) => id && isCreator)
    if (m.key.remoteJid.endsWith('broadcast')) return
    if (user.premiumTime != 0 && user.premium) {
        if (new Date() * 1 >= user.premiumTime) {
            await m.reply(`Waktu premium kamu sudah habis!`)
            /*await this.reply(user.grup, `Waktunya *${this.user.name}* untuk meninggalkan grup`, null).then(() => {
                this.sendContact(user.grup, data.map(([id, name]) => [id, name]), m).then(() => {
                    this.groupLeave(user.grup).then(() => {
                        db.data.chats[m.chat].expired = 0
                    })
                })
            })*/
            user.premiumTime = 0
            user.premium = false
        }
    }
}
