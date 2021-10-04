const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const { coin, banco } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['balance', 'bal'],
    description: 'Mira tu dinero actual',
    callback: async (message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() == args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.member

        let bal = db.fetch(`dinero_${user.id}`)
        if(bal === null) bal = '0'

        let bank = db.fetch(`bank_${user.id}`)
        if(bank === null) bank = '0'

        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
**Cuenta de \`${user.user.tag}\`**

${coin} Coins: **__${bal.toLocaleString()}__**.
${banco} Banco: **__${bank.toLocaleString()}__**.
        `)
        message.channel.send(embed)
    }
}