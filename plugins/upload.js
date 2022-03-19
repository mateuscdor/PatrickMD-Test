import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Tidak ada media yang ditemukan'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let asu = isTele ? uploadImage : uploadFile
    let link = await asu(media)
    m.reply(`${link}
${media.length} Byte(s)
${isTele ? '(Tidak Ada Tanggal Kedaluwarsa)' : '(Tidak diketahui)'}`)
}
handler.help = ['upload']
handler.tags = ['tools']
handler.command = /^upload$/i

export default handler
