const { MessageEmbed, MessageAttachment, MessageCollector } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const { coin, laptop, laptopbrok } = require('../../../../Configs/emojis.json')

module.exports = {
    commands: ['post-meme', 'pm'],
    description: 'Postea un meme y gana dinero',
    callback: (message, args) => {
        
        const user = message.author
        const laptopp = db.fetch(`laptop_${user.id}`)
        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min
        }
        const timeout = 120000
        let options = [
            'Exitoso',
            'Fallido'
        ]
        let posteado = random(0, parseInt(options.length))
        let final = options[posteado]

        const memetime = db.fetch(`pmtime_${user.id}`)

        if(memetime !== null && timeout - (Date.now() - memetime) > 0) {
            const timeleft = ms(timeout - (Date.now() - memetime))

            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            Espera un momento...\nVuelve a usar este comando en ${timeleft.minutes} minuto y ${timeleft.seconds} segundos.`)
            message.channel.send(embed)
        } else {
            if(!laptopp || laptopp === null || laptopp === 0) return message.channel.send(`<@${user.id}>, Necesitas tener una laptop ${laptop}.\nUsa \`v!buy 1\``)
            else if(laptopp !== null || laptopp !== 0) {
                if(final === 'Exitoso') {
                    let redessociales = [
                        'Twitter',
                        'Instagram',
                        'Pinterest',
                        'Facebook',
                        'Tik Tok',
                        'Reddit',
                        'Twitch',
                        'LinkedIn',
                        'Snapchat',
                        'Telegram'
                    ]
                    const redsocial = Math.floor(Math.random() * redessociales.length)

                    let virales = [
                        `Posteaste un meme en ${redessociales[redsocial]} y fue __**apoyado**__`,
                        `Posteaste un meme en ${redessociales[redsocial]} y obtuvo respuestas __**decentes**__`,
                    ]
                    const viral = Math.floor(Math.random() * virales.length)

                    const amount = Math.floor(Math.random() * 1600) + 400

                    let preguntas = [
                    `¿Que tipo de meme publicaste?
\`a\` Meme fresco
\`b\` Meme copiado
\`c\` Meme auto generado

Tienes 20 segundos para responder
                    `
                    ]

                    const filter = (m) => {
                        return m.author.id === user.id
                    }
                    const collector = new MessageCollector(message.channel, filter, {
                        max: preguntas.length,
                        time: 20000,
                    })
                    message.channel.send(`
<@${user.id}>
                    ¿Que tipo de meme quieres publicar?
\`a\` Meme fresco
\`b\` Meme copiado
\`c\` Meme auto generado
                    
**Tienes 20 segundos para responder**
                                        `)

                    // collector.on('end', (collected) => {
                    //     if(collected.size < preguntas.length) {
                    //         b.channel.send('Apagando la computadora porque no respondiste a tiempo')
                    //         collector.stop
                    //         return
                    //     }
                    // }) 

                    collector.on('collect', (m) => {
                        if(m.content === 'a') {
                            const embed2 = new MessageEmbed()
                            .setTitle('Posteaste un meme fresco 😎')
                            .setTimestamp()
                            .setColor('RANDOM')
                            .setDescription(`
                            ${virales[viral]} por lo que conseguiste ${coin} **${parseInt(amount).toLocaleString()}**
                            `)
                            message.channel.send(embed2)
                            db.add(`dinero_${user.id}`, amount)
                            db.set(`pmtime_${user.id}`, Date.now())
                            collector.stop
                        } else if(m.content === 'b') {
                            const embed3 = new MessageEmbed()
                            .setTitle('Posteaste un meme copiado 😐')
                            .setTimestamp()
                            .setColor('RANDOM')
                            .setDescription(`
                            ${virales[viral]} por lo que conseguiste ${coin} **${parseInt(amount).toLocaleString()}**
                            `)
                            message.channel.send(embed3)
                            db.add(`dinero_${user.id}`, amount)
                            db.set(`pmtime_${user.id}`, Date.now())
                            collector.stop
                        } else if(m.content === 'c') {
                            const embed4 = new MessageEmbed()
                            .setTitle('Posteaste un meme auto generado 🤑')
                            .setTimestamp()
                            .setColor('RANDOM')
                            .setDescription(`
                            ${virales[viral]} por lo que conseguiste ${coin} **${parseInt(amount).toLocaleString()}**
                            `)
                            message.channel.send(embed4)
                            db.add(`dinero_${user.id}`, amount)
                            db.set(`pmtime_${user.id}`, Date.now())
                            collector.stop
                        } else if (m.content !== 'a' || m.content !== 'b' || m.content !== 'c') {
                            m.channel.send(`<@${user.id}>, Esa no es una opción`)
                            collector.stop
                            return
                        }
                    })
                    collector.on('end', async (collected) => {
                        if(collected.size < preguntas.length) {
                            message.channel.send(`<@${user.id}>, Apagando la laptop porque no respondiste a tiempo`)
                            collector.stop
                            return
                        }
                    }) 
                } else if(final === 'Fallido') {
                    message.channel.send(`<@${user.id}>, Tu laptop crasheo ${laptopbrok} al intentar postear un meme`)
                    db.set(`pmtime_${user.id}`, Date.now())
                }
            }
        }

    }
}