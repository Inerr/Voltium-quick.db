const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { coin } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['withdraw', 'with', 'retirar'],
    description: 'Retira tu dinero del banco',
    callback: async (message, args) => {

        const user = message.author

        const totalCashInBank = db.fetch(`bank_${user.id}`)
        if( totalCashInBank === null ||  totalCashInBank === 0) return message.channel.send(`<@${user.id}>, No tienes coins para retirar`)
        if(args[0] === 'all' || args[0] === 'todo' || args[0] === 'a' || args[0] === 'max') {
            const embed = new MessageEmbed()
            .setTitle('Dinero retirado')
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            Retiraste ${coin} **${totalCashInBank.toLocaleString()}** de tu banco
            `)
            message.channel.send(embed)
            db.subtract(`bank_${user.id}`, totalCashInBank)
            db.add(`dinero_${user.id}`, totalCashInBank)
        } else {
            const amount = args[0]
            if(!amount) return message.channel.send(`<@${user.id}>, Debes especificar la cantidad de coins`)
            else if(amount % 1 != 0 || amount <= 0) return message.channel.send(`<@${user.id}>, No puedes retirar coins negativas`)
            else if(amount > totalCashInBank) return message.channel.send(`<@${user.id}>, No tienes esas coins`)
            else if(isNaN(parseInt(args[0]))) return message.channel.send(`<@${user.id}>, **${dinero}** No es un numero`)
            else {
                const embed1 = new MessageEmbed()
                .setTitle('Dinero retirado')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                Retiraste ${coin} **${amount.toLocaleString()}** de tu banco
                `)
                message.channel.send(embed1)
                db.subtract(`bank_${user.id}`, amount)
                db.add(`dinero_${user.id}`, amount)
            }
        }

    }
}