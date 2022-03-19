let handler = async (m, { conn }) => await conn.sendButton(m.chat, `
┏ ┅ ━━━━━━「 DONASI 」━━━ ┅ ━
┇
┃ ❖ https://bit.ly/ViaSaweria
┃ ❖ https://bit.ly/ViaTrakteer
┗ ┅ ━━━━━━━━━━━━━━━━━━━ ┅ ━
Hasil dari *Donasi* akan saya gunakan Untuk Membeli/Menyewa _*RDP/VPS*_ agar bot berjalan 24 jam tanpa kendala, Terima Kasih
`.trim(), wm, null, ['Donasi', '.donasi'], m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
