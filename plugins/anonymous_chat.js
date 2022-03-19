import fetch from 'node-fetch'

async function handler(m, { command, usedPrefix }) {
    /*if (!global.db.data.settings.anon) throw `Fitur ini tidak aktif`
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await this.sendButton(m.chat, '_Kamu tidak sedang berada di anonymous chat_', wm, null, ['Cari Partner', `${usedPrefix}start`])
                throw false
            }
            m.reply('_Ok_')
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '_Partner meninggalkan chat_', wm, null, ['Cari Partner', `${usedPrefix}start`])
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                await this.sendButton(m.chat, '_Kamu masih berada di dalam anonymous chat, menunggu partner_', wm, null, ['Keluar', `${usedPrefix}leave`])
                throw false
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '_Partner ditemukan!_', wm, null, ['Next', `${usedPrefix}next`])
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButton(room.b, '_Partner ditemukan!_', wm, null, ['Next', `${usedPrefix}next`])
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '_Menunggu partner..._', wm, null, ['Keluar', `${usedPrefix}leave`])
            }
            break
        }
    }*/
    this.sendMessage(m.chat, {
        location: { jpegThumbnail: await (await fetch(await this.profilePictureUrl('62896543604477@s.whatsapp.net'), 'image')).buffer() },
        caption: "Klik tombol di bawah ini untuk memulai Anonymous Chat",
        footer: wm,
        templateButtons: [
            {
                urlButton: { displayText: 'Anonymous Chat', url: 'https://wa.me/62896543604477?text=/start' }
            }
        ],
    })
}
handler.help = ['start']
handler.tags = 'anonymous'

handler.command = ['start']
handler.private = true

export default handler
