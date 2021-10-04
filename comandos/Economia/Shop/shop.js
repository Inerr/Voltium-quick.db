const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const e = require('../../../Configs/emojis.json')

module.exports = {
    commands: ['shop'],
    description: 'Muestra la tienda',
    callback: (message, args) => {

        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Necesito el permiso `MANAGE_CHANNELS` para poder quitar reacciones')

        const embedprincipal = new MessageEmbed()
        .setTitle('Menu de la tienda')
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
        Bienvenido a la tienda de objetos, reacciona en el debido emoji para ir a la tienda correspondiente.\n\n> ➖ | Tienda de Compra\n> ➕ | Tienda de Venta`)
        
        const compra = new MessageEmbed()
        .setTitle('Compra de objetos')
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
        Para comprar un objeto usa v!buy <id>, ejemplo: v!buy 1\n\n\`1\` ${e.laptop} Laptop - ${e.coin} 10,000\nObjeto necesario para los comandos \`post-meme\`\n\`2\` ${e.fishrod} Caña de pescar - ${e.coin} 4,000\nObjeto necesario para los comandos \`fish\`\n`)
        const venta = new MessageEmbed()
        .setTitle('Venta de objetos')
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
        Para vender un objeto usa v!sell <id>, ejemplo: v!sell 1\n\n\`1\` ${e.pescadoc} Pescado Comun - ${e.coin} 100\nConsigue este objeto con el comando \`fish\`\n\`2\` ${e.pescador} Pescado Raro - ${e.coin} 250\nConsigue este objeto con el comando \`fish\`\n\`3\` ${e.calamarc} Calamar Comun - ${e.coin} 400\nConsigue este objeto con el comando \`fish\``)

        message.channel.send(embedprincipal).then(msg => {
            msg.react('➖')
            msg.react('➕').then(m => {
                msg.awaitReactions((reaction, user) => {
                    if(user.bot) return;
                    if(message.author.id !== user.id) return;
                    if(reaction.emoji.name === "➖"){
                        msg.edit(compra)
                        reaction.users.remove(user.id)
                    }
                    if(reaction.emoji.name === "➕"){
                        msg.edit(venta)
                        reaction.users.remove(user.id)
                    }
                })
            })
        })
    }
}