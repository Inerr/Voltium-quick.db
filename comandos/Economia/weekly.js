const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const { coin, reloj } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['weekly', 'w'],
    description: 'Recibe un premio semanal',
    callback: (message, args) => {

        const user = message.author
        const timeout = 604800000
        const amount = Math.floor(Math.random() * 8000) + 2000
        const weeklytime = db.fetch(`weeklytime_${user.id}`)

        if(weeklytime !== null && timeout - (Date.now() - weeklytime) > 0) {
            const timeleft = ms(timeout - (Date.now() - weeklytime))

            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            ${reloj} Ya reclamaste tu premio semanal.\nVuelve a reclamarlo en ${timeleft.days} dias, ${timeleft.hours} horas, ${timeleft.minutes} minutos y ${timeleft.seconds} segundos
            `)
            message.channel.send(embed)
        } else {
            const embed2 = new MessageEmbed()
            .setTitle('Premio semanal reclamado')
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            Reclamaste ${coin} **${amount.toLocaleString()}** de tu premio semanal.
            `)
            message.channel.send(embed2)
            db.add(`dinero_${user.id}`, amount)
            db.set(`weeklytime_${user.id}`, Date.now())
        }
    }
}