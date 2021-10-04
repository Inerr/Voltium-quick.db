const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const { coin, reloj } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['monthly', 'm'],
    description: 'Recibe un premio mensual',
    callback: (message, args) => {

        const user = message.author
        const timeout = 2629800000
        const amount = Math.floor(Math.random() * 16000) + 4000
        const monthlytime = db.fetch(`monthlytime_${user.id}`)

        if(monthlytime !== null && timeout - (Date.now() - monthlytime) > 0) {
            const timeleft = ms(timeout - (Date.now() - monthlytime))

            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            ${reloj} Ya reclamaste tu premio mensual.\nVuelve a reclamarlo en ${timeleft.days} dias, ${timeleft.hours} horas, ${timeleft.minutes} minutos y ${timeleft.seconds} segundos.
            `)
            message.channel.send(embed)
        } else {
            const embed2 = new MessageEmbed()
            .setTitle('Premio mensual reclamado')
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            Reclamaste ${coin} **${amount.toLocaleString()}** de tu premio mensual.
            `)
            message.channel.send(embed2)
            db.add(`dinero_${user.id}`, amount)
            db.set(`monthlytime_${user.id}`, Date.now())
        }
    }
}