//const request = require('request');
//const spotifyWebApi = require('spotify-web-api-node');
import request from 'request';
import spotifyWebApi from 'spotify-web-api-node';

var client_id = 'e97aee88c78a492b8f075cefbf06ca83';
var client_secret = 'ff1a795a143d47009dbe8577f5375f4c';

let spotifyApi = new spotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: ''
})

spotifyApi.setRefreshToken(spotifyApi.getRefreshToken())

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        spotifyApi.setAccessToken(body.access_token)
    }
});


//let fetch = require('node-fetch')
import fetch from 'node-fetch'

let playlist = '3AaKHE9ZMMEdyRadsg8rcy'
let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklagu[id][0])
        throw false
    }
    // ubah isi 'id' kalo mau ganti playlist spotifynya
    /*let res = await fetch(global.API('xteam', '/game/tebaklagu/', { id: '3AaKHE9ZMMEdyRadsg8rcy' }, 'APIKEY'))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let result = await res.json()
    let json = result.result
    if (!result.status) throw json*/

    await spotifyApi.getPlaylist(playlist).then(async function (data) {
        let r = Math.floor(Math.random() * data.body.tracks.items.length)
        let json = {
            judul: data.body.tracks.items[r].track.name,
            durasi: data.body.tracks.items[r].track.duration_ms,
            url: data.body.tracks.items[r].track.href,
            artist: data.body.tracks.items[r].track.artists[0].name,
            preview: data.body.tracks.items[r].track.preview_url
        }


        let caption = `
TEBAK JUDUL LAGU
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *${usedPrefix}cek* untuk bantuan
Bonus: ${poin} XP
*Balas pesan ini untuk menjawab!*`.trim()
        conn.tebaklagu[id] = [
            await m.reply(caption),
            json, poin,
            setTimeout(async () => {
                if (conn.tebaklagu[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.judul}*`, wm, null, ['Tebak Lagu', `.tebaklagu`], conn.tebaklagu[id][0])
                delete conn.tebaklagu[id]
            }, timeout)
        ]
        await conn.sendFile(m.chat, json.preview, 'eror.m4a', '', m, 1)//, { mimetype: "audio/mp4" })
    }, function (err) {
        throw `Tebak Lagu Sedang Error : (${err})`
        spotifyApi.refreshAccessToken().then(
            function (data) {
                //console.log('The access token has been refreshed!');

                //Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
                m.reply('The access token has been refreshed!, Try again')
            },
            function (err) {
                console.log('Could not refresh access token', err);
            }
        );
    })
}
handler.help = ['tebaklagu']
handler.tags = ['game']
handler.command = /^tebaklagu$/i

export default handler
