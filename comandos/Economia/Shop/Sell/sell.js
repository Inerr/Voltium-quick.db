const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { coin, pescadoc, pescador, calamarc } = require('../../../../Configs/emojis.json')

module.exports = {
    commands: ['sell'],
    description: 'Vende un objeto',
    callback: (message, args, client) => {

        if(!args[0]) return message.channel.send(`<@${message.author.id}>, Debes especificar una ID.\nUsa \`v!shop\` para ver todas las ID's.`)

        if(args[0].toLowerCase() === '1') {
            const user = message.author
            const amount = 100
            const pescadocomun = db.fetch(`pescadoc_${user.id}`)
            const bal = db.fetch(`dinero_${user.id}`)
            if(pescadocomun === null || pescadocomun === 0) {
                return message.channel.send(`<@${user.id}>, No tienes ningún Pescado común ${pescadoc}.`)
            } else if(pescadocomun !== null | pescadocomun !== 0) {
                const embed = new MessageEmbed()
                .setTitle('Objeto vendido')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                Vendiste 1 Pescado común ${pescadoc} por ${coin} **${amount}**.
                `)
                .setFooter('Tienda')
                message.channel.send(embed)
                db.add(`dinero_${user.id}`, amount)
                db.subtract(`pescadoc_${user.id}`, 1)
            }
        }
        if(args[0].toLowerCase() === '2') {
            const user = message.author
            const amount = 250
            const pescadoraro = db.fetch(`pescador_${user.id}`)
            const bal = db.fetch(`dinero_${user.id}`)
            if(pescadoraro === null || pescadoraro === 0) {
                return message.channel.send(`<@${user.id}>, No tienes ningún Pescado raro ${pescador}.`)
            } else if(pescadoraro !== null | pescadoraro !== 0) {
                const embed = new MessageEmbed()
                .setTitle('Objeto vendido')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                Vendiste 1 Pescado raro ${pescador} por ${coin} **${amount}**.
                `)
                .setFooter('Tienda')
                message.channel.send(embed)
                db.add(`dinero_${user.id}`, amount)
                db.subtract(`pescador_${user.id}`, 1)
            }
        }
        if(args[0].toLowerCase() === '3') {
            const user = message.author
            const amount = 400
            const calamarcomun = db.fetch(`calamarc_${user.id}`)
            const bal = db.fetch(`dinero_${user.id}`)
            if(calamarcomun === null || calamarcomun === 0) {
                return message.channel.send(`<@${user.id}>, No tienes ningún Calamar común ${calamarc}.`)
            } else if(calamarcomun !== null | calamarcomun !== 0) {
                const embed = new MessageEmbed()
                .setTitle('Objeto vendido')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                Vendiste 1 Calamar común ${calamarc} por ${coin} **${amount}**.
                `)
                .setFooter('Tienda')
                message.channel.send(embed)
                db.add(`dinero_${user.id}`, amount)
                db.subtract(`calamarc_${user.id}`, 1)
            }
        }
    }
}