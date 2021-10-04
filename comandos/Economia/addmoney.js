const { admin } = require('../../Configs/bot.json')
const { nomencion, solodevs } = require('../../Configs/errores.json')
const { coin } = require('../../Configs/emojis.json')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['addmoney', 'addm', 'add-money'],
    description: 'Agrega dinero a un usuario',
    callback: (message, args) => {
        if(!admin.includes(message.author.id)) return message.channel.send(solodevs)

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() == args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() == args.join(" ").toLowerCase())
        if(!user) return message.channel.send(nomencion)
        const dinero = args[1]
        if(!dinero) return message.channel.send('Debes especificar la cantidad de dinero')
        if(isNaN(parseInt(args[1]))) return message.channel.send(`**${dinero}** No es un numero`)
        if(!args[2]) args[2] = 'coins'

        if(args[2] === 'coins') {
            db.add(`dinero_${user.id}`, dinero)

            const embed = new MessageEmbed()
            .setTitle('Coins agregadas')
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`
            Se agregaron ${coin} **${dinero.toLocaleString()}** a las coins de ${user}
            `)
            message.channel.send(embed)
        } else if(args[2] === 'banco') {
            db.add(`bank_${user.id}`, dinero)

            const embed = new MessageEmbed()
            .setTitle('Coins agregadas')
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`
            Se agregaron ${coin} **${dinero.toLocaleString()}** al banco de ${user}
            `)
            message.channel.send(embed)
        }
    }
}