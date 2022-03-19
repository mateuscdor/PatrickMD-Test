//let fetch = require('node-fetch')
//let puppeteer = require('puppeteer')
//let googleIt = require('google-it')
//import fetch from 'node-fetch'
//import puppeteer from 'puppeteer'
import googleIt from 'google-it'

let handler = async (m, { conn, command, args, usedPrefix }) => {
    //let full = /f$/i.test(command)
    let text = args.join` `
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} Bahasa pemrograman`
    let url = 'https://google.com/search?q=' + encodeURIComponent(text)
    let search = await googleIt({ query: text })
    let msg = search.map(({ title, link, snippet }) => {
        return `*${title}*\n_${link}_\n_${snippet}_`
    }).join`\n\n`
    //try {
    /*const browser = await puppeteer.launch({
        headless: false,
        product: 'chrome',
        defaultViewport: { height: 720, width: 1280, isLandscape: true },
        userDataDir: 'C:/PatrickBot-Whatsapp/tmp/puppeteer_test'
    });

    const page = await browser.newPage();

    await page.setViewport({
        isLandscape: true,
        height: 720,
        width: 1280
    })
    await page.goto(url);

    let ss = await page.screenshot({
        path: "./tmp/google.png",
        //fullPage: full
    })//.buffer();

    await conn.sendFile(m.chat, ss, 'google.png', url + '\n\n' + msg, m, 0, { thumbnail: ss })

    await page.close();

    await browser.close();*/
    //await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m, 0, { thumbnail: await (await fetch(ss)).buffer() })
    //} catch (e) {
    await m.reply(msg)
    //}
}
handler.help = ['google'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^google$/i

export default handler