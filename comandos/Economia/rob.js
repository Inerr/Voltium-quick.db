const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const err = require('../../Configs/errores.json')
const { coin, reloj, robber } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['rob', 'robar'],
    description: 'Roba dinero a una persona',
    callback: async (message, args) => {
        
        const user = message.author
        const mencion = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() == args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() == args.join(" ").toLowerCase())
        if(!mencion) return message.channel.send(err.nomencion)
        const userwall = db.fetch(`dinero_${user.id}`)
        const mencionwall = db.fetch(`dinero_${mencion.id}`)

        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min
        }
        const timeout = 300000
        let options = [
            'Exitoso',
            'Fallido'
        ]
        let robado = random(0, parseInt(options.length))
        let final = options[robado]
        const robtime = db.fetch(`rob-time_${user.id}`)

        if(robtime !== null && timeout - (Date.now() - robtime) > 0) {
            const timeleft = ms(timeout - (Date.now() - robtime))
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            ${reloj} Espera un momento...\nVuelve a usar este comando en ${timeleft.minutes} minutos y ${timeleft.seconds} segundos.
            `)
            message.channel.send(embed)
        } else {
            if(userwall < 2000) return message.channel.send(`<@${user.id}>, Necesitas 2,000 coins para poder robar a alguien`)
            else if(mencionwall < 0) return message.channel.send(`<@${user.id}>, Este usuario no tiene coins para robar`)
            else if(mencionwall < 1500) return message.channel.send(`<@${user.id}>, El usuario debe tener al menos 1,500 coins`)
            else {
                if(final === 'Exitoso') {
                const amount = Math.floor(Math.random() * 1400) + 100
                const embed1 = new MessageEmbed()
                .setTitle('Robo exitoso')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                ${robber} Le robaste ${coin} **${amount.toLocaleString()}** a ${mencion}.
                `)
                message.channel.send(embed1)
                db.add(`dinero_${user.id}`, amount)
                db.subtract(`dinero_${mencion.id}`, amount)
                db.set(`rob-time_${user.id}`, Date.now())
                } else if(final === 'Fallido') {
                const amountf = Math.floor(Math.random() * 900) + 100
                const embed2 = new MessageEmbed()
                .setTitle('Robo fallido')
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
               Tu intento de robo a ${mencion} no resulto bien y perdiste ${coin} **${amountf.toLocaleString()}**
                `)
                message.channel.send(embed2)
                db.subtract(`dinero_${user.id}`, amountf)
                db.set(`rob-time_${user.id}`, Date.now())
                }
            }
        }
    }
}