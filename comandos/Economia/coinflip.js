const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const { Capitalize } = require('tech-tip-cyber')
const { coin, reloj } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['coinflip', 'cf'],
    description: 'Gira la moneda para ganar o perder dinero',
    callback: (message, args) => {

        const user = message.author
        const coins = ['cara', 'sello']
        const cs = args[0]
        if(!cs) return message.channel.send(`<@${user.id}>, Debes escoger el lado de la moneda\n\`cara | sello\``)
        const cantidad = args[1]
        if(!cantidad) return message.channel.send(`<@${user.id}>, Debes especificar la cantidad de coins`)
        const bal = db.fetch(`dinero_${user.id}`)

        const timeout = 10000
        const cftime = db.fetch(`cftime_${user.id}`)
        if(cftime !== null && timeout - (Date.now() - cftime) > 0) {
            const timeleft = ms(timeout - (Date.now() - cftime))

            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            ${reloj} Espera un momento...\nVuelve a usar este comando en ${timeleft.seconds} segundos.
            `)
            message.channel.send(embed)
        } else {
            if(!coins.includes(cs)) return message.channel.send(`<@${user.id}>, Esa no es una opción\nOpciones: \`cara, sello\``)
        if(cantidad > bal) return message.channel.send(`<@${user.id}>, No tienes esas coins`)
        if(isNaN(cantidad)) return message.channel.send(`<@${user.id}>, La cantidad debe ser un número`)
        if(cantidad < 100) return message.channel.send(`<@${user.id}>, La apuesta mínima es de ${coin} 100`) //La apuesta mínima es de ${coin} 100

        const flip = coins[Math.floor(Math.random() * coins.length)]
        const fliped = Capitalize({
            Capital: flip
        })

        if(flip === cs) {
            const embed1 = new MessageEmbed()
            .setTitle('Girando moneda...')
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            Giraste la moneda a ${fliped} y ganaste ${coin} **${cantidad.toLocaleString()}**.
            `)
            .setThumbnail('https://cdn.discordapp.com/attachments/890312722590339142/893988790539026493/coinflip.gif')
            message.channel.send(embed1)
            db.add(`dinero_${user.id}`, cantidad)
            db.set(`cftime_${user.id}`, Date.now())
        } else {
            const embed2 = new MessageEmbed()
            .setTitle('Girando moneda...')
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            Giraste la moneda a ${fliped} y perdiste ${coin} **${cantidad.toLocaleString()}**.
            `)
            .setThumbnail('https://cdn.discordapp.com/attachments/890312722590339142/893988790539026493/coinflip.gif')
            message.channel.send(embed2)
            db.subtract(`dinero_${user.id}`, cantidad)
            db.set(`cftime_${user.id}`, Date.now())
        }
        }
    }
}