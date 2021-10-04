const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { coin } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['deposit', 'dep', 'depositar'],
    description: 'Deposita dinero en el banco',
    callback: async (message, args) => {

        const user = message.author
        const totalCashWallet = db.fetch(`dinero_${user.id}`)
        if(totalCashWallet === null || totalCashWallet === 0) return message.channel.send(`<@${user.id}>, No tienes coins para depositar`)
        if(args[0] === 'all' || args[0] === 'todo' || args[0] === 'a' || args[0] === 'max') {
            const embed = new MessageEmbed()
            .setTitle('Coins depositadas')
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Depositaste ${coin} **${totalCashWallet.toLocaleString()}** a tu banco.
            `)
            message.channel.send(embed)
            db.subtract(`dinero_${user.id}`, totalCashWallet)
            db.add(`bank_${user.id}`, totalCashWallet)
        } else {
            const amount = args[0]
            if(!amount) return message.channel.send(`<@${user.id}>, Debes especificar la cantidad de coins`)
            else if(amount % 1 != 0 || amount <= 0) return message.channel.send(`<@${user.id}>, No puedes depositar coins negativas`)
            else if(amount > totalCashWallet) return message.channel.send(`<@${user.id}>, No tienes esas coins.`)
            else if(isNaN(parseInt(args[0]))) return message.channel.send(`<@${user.id}>, **${dinero}** No es un número.`)
            else {
                const embed1 = new MessageEmbed()
                .setTitle('Coins depositadas')
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                Depositaste ${coin} **${amount.toLocaleString()}** a tu banco.
                `)
                message.channel.send(embed1)
                db.subtract(`dinero_${user.id}`, amount)
                db.add(`bank_${user.id}`, amount)
            }
        }
    }
}