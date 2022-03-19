import baileys from '@adiwajshing/baileys';
import fs, { watchFile, unwatchFile, readFileSync } from 'fs';
import chalk from 'chalk';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
let bs = await import('@bochilteam/scraper');

global.owner = [
  ['62895338193140', 'Aniq', true],
  //['6287880878027', false, false],
]
// [number, dia creator/owner?, dia developer?]
// Put your number here
global.mods = [] // Want some help?
global.prems = JSON.parse(readFileSync('./src/premium.json')) // Premium user has unlimited limit
global.APIs = { // API Prefix
  // nama: 'https://website'
  bx: 'https://bx-hunter.herokuapp.com',
  rey: 'https://server-api-rey.herokuapp.com',
  dhnjing: 'https://dhnjing.xyz',
  hardianto: 'https://hardianto-chan.herokuapp.com',
  jonaz: 'https://jonaz-api-v2.herokuapp.com',
  neoxr: 'https://api.neoxr.eu.org',
  nrtm: 'https://nurutomo.herokuapp.com',
  chipa: 'https://api.chipa.xyz',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zekais: 'http://zekais-api.herokuapp.com',
  zeks: 'https://api.zeks.me',
  islamic: 'https://islamic-api-indonesia.herokuapp.com',
  LeysCoder: 'https://leyscoders-api.herokuapp.com',
  stikerinapi: 'http://stikerinapi.herokuapp.com'
}
global.APIKeys = { // APIKey nya disini
  // 'https://website': 'apikey'
  'https://server-api-rey.herokuapp.com': 'apirey',
  'https://api.neoxr.eu.org': 'yourkey',
  'https://bx-hunter.herokuapp.com': 'Ikyy69',
  'https://hardianto-chan.herokuapp.com': 'hardianto',
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://api.chipa.xyz': 'MW87I6YV0MX0NNGKYV9TQJ2P',
  'https://api.xteam.xyz': 'Vanz',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.me': 'apivinz',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll',
  'http://stikerinapi.herokuapp.com': 'amel'
}

// Sticker WM
const spack = readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = '© PatrickBot'
  var sticker_author = ''
} else {
  var sticker_name = stickerpack.spackname
  var sticker_author = stickerpack.sauthor
}

const file_exif = "lib/exif.json"
watchFile(file_exif, () => {
  unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  //delete require.cache[file_exif]
  import('./lib/exif.json')
})

global.packname = sticker_name
global.author = sticker_author

global.done = '_*Success*_'
global.eror = '_*Server Error*_'
global.wait = '_*Tunggu sedang di proses...*_'
global.wm = '© PatrickBot'
global.baileys = baileys
global.fetch = fetch
global.fs = fs
global.bs = bs
global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='

global.multiplier = 60 // The higher, The harder levelup

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: '🧬',
      limit: '🌌',
      health: '❤️',
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(file)
})