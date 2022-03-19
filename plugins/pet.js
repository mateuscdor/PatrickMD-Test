//const { MessageType, Presence } = require("@adiwajshing/baileys");
//const petPetGif = require("pet-pet-gif");
let { sticker } = await import("../lib/sticker.js")
import petPetGif from 'pet-pet-gif';

let handler = async (m, { conn }) => {
    let who =
        m.mentionedJid && m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.fromMe
                ? conn.user.jid
                : m.sender;
    let animatedGif = await petPetGif(
        await conn
            .profilePictureUrl(who, 'image')
            .catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
    );
    const stiker = await sticker(animatedGif, false, global.packname, global.author);
    await conn.sendFile(m.chat, stiker, '', '', m, false, {
        asSticker: true
    })
};

handler.help = ["pet", "petpet"];
handler.tags = ["maker"];

handler.command = /^(petpet|pet)$/i;

export default handler;