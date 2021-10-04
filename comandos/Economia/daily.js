const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const { coin, reloj } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['daily', 'd'],
    description: 'Recibe un premio diario',
    callback: (message, args) => {

        const user = message.author
        const timeout = 86400000
        const amount = Math.floor(Math.random() * 4000) + 1000
        const dailytime = db.fetch(`dailytime_${user.id}`)

        if(dailytime !== null && timeout - (Date.now() - dailytime) > 0) {
            const timeleft = ms(timeout - (Date.now() - dailytime))

            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            ${reloj} Ya reclamaste tu premio diario.\nVuelve a reclamarlo en ${timeleft.hours} horas, ${timeleft.minutes} minutos y ${timeleft.seconds} segundos.
            `)
            message.channel.send(embed)
        } else {
            const embed2 = new MessageEmbed()
            .setTitle('Premio diario reclamado')
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            Reclamaste ${coin} **${amount.toLocaleString()}** de tu premio diario.
            `)
            message.channel.send(embed2)
            db.add(`dinero_${user.id}`, amount)
            db.set(`dailytime_${user.id}`, Date.now())
        }
    }
}