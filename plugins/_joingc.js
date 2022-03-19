export async function before(m) {
    let user = db.data.users[m.sender]
    if (!(user.grup in Object.keys(this.chats)) && user.grup.endsWith('g.us')) {
        user.grup = ''
    }
}