const { MessageEmbed } = require('discord.js')
const { dineroin } = require('../../../../Configs/errores.json')
const db = require('quick.db')
const { laptop, coin, fishrod } = require('../../../../Configs/emojis.json')

module.exports = {
    commands: ['buy'],
    description: 'Compra una Laptop para desbloquear comandos',
    callback: (message, args) => {

        const user = message.author
        if(!args[0]) return message.channel.send(`<@${user.id}>, Debes especificar una ID.\nUsa \`v!shop\` para ver todas las ID's.`)
        let items = db.fetch(`items_${user.id}`, {items: []})

        if(args[0].toLowerCase() === '1') {
            const amount = 10000
            const bal = db.fetch(`dinero_${user.id}`)
            const laptopp = db.fetch(`laptop_${user.id}`)
            if(bal < amount) {
                return message.channel.send(dineroin)
            } else if (laptopp === 1) {
                return message.channel.send(`<@${user.id}>, El límite de este objeto es 1.`)
            } else {
                const embed = new MessageEmbed()
                .setTitle('Objeto comprado')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                > Has comprado una **Laptop** ${laptop}.\n\n> Se descontaron ${coin} **10,000** de tu cuenta.`)
                .setFooter('Usa v!inventory para ver todos tus objetos')
                message.channel.send(embed)
                db.add(`laptop_${user.id}`, 1)
                db.subtract(`dinero_${user.id}`, amount)
            }
        }
        if(args[0].toLowerCase() === '2') {
            const amount = 4000
            const bal = db.fetch(`dinero_${user.id}`)
            const fishrodc = db.fetch(`fishrodc_${user.id}`)
            if(bal < amount) {
                return message.channel.send(dineroin)
            } else if (fishrodc === 1) {
                return message.channel.send(`<@${user.id}>, El límite de este objeto es 1.`)
            } else {
                const embed = new MessageEmbed()
                .setTitle('Objeto comprado')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                > Has comprado una **Caña de pescar** ${fishrod}.\n\n> Se descontaron ${coin} **4,000** de tu cuenta.`)
                .setFooter('Usa v!inventory para ver todos tus objetos')
                message.channel.send(embed)
                db.add(`fishrodc_${user.id}`, 1)
                db.subtract(`dinero_${user.id}`, amount)
            }
        }
    }
}