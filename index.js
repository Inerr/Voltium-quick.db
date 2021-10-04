const Discord = require('discord.js')
const { token } = require('./Configs/bot.json')
const client = new Discord.Client()
require('discord-buttons')(client)
loadCommands = require('./comandos/load-commands')
const mongoose = require('mongoose')

client.on('ready', () => {
//     setInterval(() => {
//         const estados = [
//             'Siendo desarrollado por Inerr#0416',
//             'Ultimas pruebas :)'
//         ]

//         const estado = estados[Math.floor(Math.random() * estados.length)]
//         client.user.setActivity(estado, {type: 'PLAYING'})
//     }, 5000)
    client.user.setStatus('online')

    loadCommands(client)

    console.log(`${client.user.tag} Activo`)
})
// client.bal = (id) => new Promise(async ful => {
//     const data = await eco.findOne({ id })
//     if(!data) return ful(0);
//     ful(data.coins)
// })
// client.add = (id, coins) => {
//     eco.findOne({ id }, async(err, data) => {
//         if(err) throw err;
//         if(data) {
//             data.coins += coins
//         } else {
//             data = new eco({ id, coins })
//         }
//         data.save()
//     })
// }
// client.rmv = (id, coins) => {
//     eco.findOne({ id }, async(err, data) => {
//         if(err) throw err;
//         if(data) {
//             data.coins -= coins
//         } else {
//             data = new eco({ id, coins: -coins })
//         }
//         data.save()
//     })
// }

client.login(token)