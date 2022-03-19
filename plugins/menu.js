import { promises } from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

const defaultMenu = {
  before: `*Ⓛ : Memakai Limit*
*Ⓟ : Khusus Pengguna Premium*\n\n%readmore`/*`
╭─「 %me 🤖」
│ 👋🏻 Hai, %name!
│
│ 🧱 Limit : *%limit Limit*
│ 🦸🏼‍♂️ Role : *%role*
│ 🔼 Level : *%level (%exp / %maxexp)*
│ 💫 Total XP : %totalexp ✨
│ 
│ 📅 Tanggal: *%week, %date*
│ 🕰️ Waktu: *%time*
│
│ 📈 Uptime: *%uptime (%muptime)*
│ 📊 Database: %rtotalreg of %totalreg
╰────
%readmore`*/.trimStart(),
  header: '┏ ┅ ━━ *〘 %category 〙*\n┇',
  body: '┃ ⍚  %cmd %islimit %isPremium',
  footer: '┗ ┅ ━━━━━━━━━━━━━━\n',
  after: ``,
}
let handler = async (m, { conn, usedPrefix: _p, args, __dirname }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'rpg', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'jadian', 'database', 'vote', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'Rpg',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'jadian': 'Jadian',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'jadian') tags = {
    'jadian': 'Jadian'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }




  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({})))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return await conn.sendMessage(m.chat, {
        text: wm,
        footer: "https://saweria.co/PatrickBot",
        title: "Daftar Perintah PatrickBot",
        buttonText: "Click Here",
        sections: [
          {
            rows: [
              {
                "title": `Semua Perintah`,
                "description": "",
                "rowId": `${_p}? all`
              }, {
                "title": "Game",
                "description": "",
                "rowId": `${_p}? game`

              }, {
                "title": "Rpg",
                "description": "",
                "rowId": `${_p}? rpg`

              }, {
                "title": "XP",
                "description": "",
                "rowId": `${_p}? xp`

              }, {
                "title": "Stiker",
                "description": "",
                "rowId": `${_p}? stiker`
              }, {
                "title": "Kerang Ajaib",
                "description": "",
                "rowId": `${_p}? kerangajaib`
              }, {
                "title": "Quotes",
                "description": "",
                "rowId": `${_p}? quotes`
              }, {
                "title": "Admin",
                "description": "",
                "rowId": `${_p}? admin`
              }, {
                "title": "Grup",
                "description": "",
                "rowId": `${_p}? grup`
              }, {
                "title": "Premium",
                "description": "",
                "rowId": `${_p}? premium`
              }, {
                "title": "Internet",
                "description": "",
                "rowId": `${_p}? internet`
              }, {
                "title": "Anonymous",
                "description": "",
                "rowId": `${_p}? anonymous`
              }, {
                "title": "Nulis & Logo",
                "description": "",
                "rowId": `${_p}? nulis`
              }, {
                "title": "Downloader",
                "description": "",
                "rowId": `${_p}? downloader`
              }, {
                "title": "Tools",
                "description": "",
                "rowId": `${_p}? tools`
              }, {
                "title": "Fun",
                "description": "",
                "rowId": `${_p}? fun`
              }, {
                "title": "Jadian",
                "description": "",
                "rowId": `${_p}? jadian`
              }, {
                "title": "Database",
                "description": "",
                "rowId": `${_p}? database`
              }, {
                "title": "Vote & Absen",
                "description": "",
                "rowId": `${_p}? vote`
              }, {
                "title": "Al-Qur\'an",
                "description": "",
                "rowId": `${_p}? quran`
              }, {
                "title": "Pengubah Suara",
                "description": "",
                "rowId": `${_p}? audio`
              }, {
                "title": "Jadi Bot",
                "description": "",
                "rowId": `${_p}? jadibot`
              }, {
                "title": "Info",
                "description": "",
                "rowId": `${_p}? info`
              }, {
                "title": "Tanpa Kategori",
                "description": "",
                "rowId": `${_p}? tanpakategori`
              }, {
                "title": "Owner",
                "description": "",
                "rowId": `${_p}? owner`
              }
            ]
          }
        ]
      }, { quoted: m })
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    // conn.reply(m.chat, text.trim(), m)
    /*conn.sendHydrated(m.chat, text.trim(), author, null, 'https://github.com/BochilGaming/games-wabot', 'Github', null, null, [
      ['Donate', '/donasi'],
      ['Speed', '/ping'],
      ['Owner', '/owner']
    ], m)*/
    conn.sendMessage(m.chat, {
      video: Buffer.alloc(0),
      //gifPlayback: true,
      fileLength: 100000000000,
      jpegThumbnail: await (await fetch(fla + teks)).buffer(),
      //location: { jpegThumbnail: await (await fetch(fla + teks)).buffer() },
      caption: text.trim(),
      footer: wm,
      templateButtons: [
        {
          urlButton: { displayText: '💸 Donasi', url: 'https://saweria.co/PatrickBot' }
        }, {
          quickReplyButton: { displayText: '👦🏻 Pemilik Bot', id: `${_p}owner` }
        }, {
          quickReplyButton: { displayText: '🍆 Group Bot', id: `${_p}linkgcbot` }
        }
      ],
      quoted: m
    }, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
