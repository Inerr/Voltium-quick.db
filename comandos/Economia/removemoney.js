const { admin } = require('../../Configs/bot.json')
const { nomencion, solodevs } = require('../../Configs/errores.json')
const { coin } = require('../../Configs/emojis.json')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['removemoney', 'remm', 'remove-money'],
    description: 'Remueve dinero de un usuario',
    callback: (message, args) => {
        if(!admin.includes(message.author.id)) return message.channel.send(solodevs)

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() == args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() == args.join(" ").toLowerCase())
        if(!user) return message.channel.send(nomencion)
        const dinero = args[1]
        if(!dinero) return message.channel.send('Debes especificar la cantidad de dinero')
        if(isNaN(parseInt(args[1]))) return message.channel.send(`**${dinero}** No es un numero`)

        if(args[2] === 'coins') {
            db.subtract(`dinero_${user.id}`, dinero)

            const embed = new MessageEmbed()
            .setTitle('Dinero removido')
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`
            Se removio ${coin} **${dinero.toLocaleString()}** de las coins de ${user}
            `)
            message.channel.send(embed)
        } else if(args[2] === 'banco') {

            const embed = new MessageEmbed()
            .setTitle('Dinero removido')
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`
            Se removio ${coin} **${dinero.toLocaleString()}** del banco de ${user}
            `)
            message.channel.send(embed)

            db.subtract(`bank_${user.id}`, dinero)
        }
    }
}