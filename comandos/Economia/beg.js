const db = require('quick.db')
const { MessageEmbed, Client, Message } = require('discord.js')
const ms = require('parse-ms')
const { coin, reloj } = require('../../Configs/emojis.json')

module.exports = {
    commands: ['beg'],
    description: 'Mendiga por dinero',
    callback: async (message, args) => {

        const user = message.author
        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min
        }

        const timeout = 120000
        const amount = Math.floor(Math.random() * 900) + 100

        let names = [
            'Inerr',
            'MrBeast',
            'Logan Paul',
            'Ariana Grande',
            'Maikel',
            'La Roca',
            'Kevin Kaarl',
            'Adam Sandler',
            'Will Smith',
            'Sylvester Stallone'
        ]

        const name = Math.floor(Math.random() * names.length)

        let options = [
            'Exitosa',
            'Fallida'
        ]
        let begged = random(0, parseInt(options.length))
        let final = options[begged]
        const begtime = db.fetch(`beg-time_${user.id}`)

        if(begtime !== null && timeout - (Date.now() - begtime) > 0) {
            const timeleft = ms(timeout - (Date.now() - begtime))
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            ${reloj} Espera un momento...\nVuelve a usar este comando en ${timeleft.minutes} minuto y ${timeleft.seconds} segundos.
            `)
            message.channel.send(embed)
        } else {
            if(final === 'Exitosa') {
                let gave = [
                    'te dono',
                    'te dio'
                ]
                const give = Math.floor(Math.random() * gave.length)

                db.add(`dinero_${user.id}`, amount)
                const embed1 = new MessageEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
                **${names[name]}** ${gave[give]} ${coin} **${amount.toLocaleString()}**
                `)
                message.channel.send(embed1)
                db.set(`beg-time_${user.id}`, Date.now())
            } else if(final === 'Fallida') {

                let notgave = [
                    'no tiene dinero para dar',
                    'esta pobre',
                    'no te quiere dar dinero',
                    'le caes mal y no te dio nada',
                    'ya le dio dinero a otra persona',
                    'dejo de dar dinero'
                ]
                const notgive = Math.floor(Math.random() * notgave.length)

                const embed2 = new MessageEmbed()
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
                **${names[name]}** ${notgave[notgive]}
                `)
                message.channel.send(embed2)
                db.set(`beg-time_${user.id}`, Date.now())
            }
        }
    }
}