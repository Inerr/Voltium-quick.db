const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const e = require('../../Configs/emojis.json')

module.exports = {
    commands: ['inventory', 'backpack', 'bp', 'inv'],
    description: 'Mira todos tus objetos',
    callback: (message, args) => {

        const user = message.author

        const embed = new MessageEmbed()
        .setTitle('Inventario')
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(items)
        .setThumbnail('https://cdn.discordapp.com/attachments/890312722590339142/894000893173841940/backpack.png')

        message.channel.send(embed)

    }
}