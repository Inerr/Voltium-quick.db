const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')

module.exports = {
    commands: ['comandos', 'commands'],
    description: 'Muestra un poco de ayuda',
    callback: (message, args, client) => {

        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Necesito el permiso `MANAGE_CHANNELS` para poder quitar reacciones')

        const embedecocmds = new MessageEmbed()
    .setTitle(`Economía 💵`)
    .setColor('RANDOM')
    .setDescription(`
\`balance\`
Muestra tus coins y tus coins en el banco
\`beg\`
Mendiga por coins
\`rob\`
Roba coins de alguna persona
\`deposit\`
Deposita coins a tu banco
\`withdraw\`
Retira coins de tu banco
\`daily\`
Obten tu premio diario
\`weekly\`
Obten tu premio semanal
\`monthly\`
Obten tu premio mensual
\`coinflip\`
Gira la moneda para ganar o perder coins
\`inventory\`
Mira todos tus items
\`shop\`
Compra y vende objetos
\`buy\`
Compra un objeto
\`sell\`
Vende un objeto
    `)

        const embedinfocmds = new MessageEmbed()
        .setTitle(`Información 📌`)
        .setColor('RANDOM')
        .setDescription(`
\`ayuda\`
Obtén un poco de ayuda
\`comandos\`
Muestra todos los comandos
        `)

        const embed = new MessageEmbed()
        .setTitle(`Comandos 🤖`)
        .setColor('#ebd804')
        .setDescription(`
Para ir a la categoría dale click al emoji correspondiente.

> 💵 | Economía
> 📌 | Información
> 🔙 | Volver al menú
        `)
        .setFooter('Despues de 5 minutos este mensaje se auto eliminara')

        message.channel.send(embed).then((msg, reaction) => {
            setTimeout(function() {
                msg.delete()
            }, 300000)
            msg.react('💵')
            msg.react('📌')
            msg.react('🔙').then(m => {
                msg.awaitReactions((reaction, user) => {
                    if(user.bot) return;
                    if(message.author.id !== user.id) return;
                    if(reaction.emoji.name === "💵"){
                        msg.edit(embedecocmds)
                        reaction.users.remove(user.id)
                    }
                    if(reaction.emoji.name === "📌"){
                        msg.edit(embedinfocmds)
                        reaction.users.remove(user.id)
                    }
                    if(reaction.emoji.name === "🔙"){
                        msg.edit(embed)
                        reaction.users.remove(user.id)
                    }
                })
            })
        })
        
    }
}