async function handler(m) {
  const data = global.owner.filter(([id, isCreator]) => id && isCreator)
  let msg = await this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)//.then(msg => this.reply(m.chat, 'Tuh Ownerku, *Bukan Bot!*, msg))
  this.reply(m.chat, 'Tuh Ownerku, *Bukan Bot!*', msg)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler
