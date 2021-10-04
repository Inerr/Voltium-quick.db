const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const { pescadoc, pescador, calamarc, fishrod } = require('../../../../Configs/emojis.json')

module.exports = {
    commands: ['fish'],
    description: 'Pesca para conseguir dinero',
    callback: (message, args) => {
        
        const user = message.author
        const fishrodc = db.fetch(`fishrodc_${user.id}`)
        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min)) + min
        }
        const timeout = 120000 //120000
        let options = [
            'Exitoso',
            'Fallido'
        ]
        let pesca = random(0, parseInt(options.length))
        let final = options[pesca]

        const fishtime = db.fetch(`fishtime_${user.id}`)

        if(fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
            const timeleft = ms(timeout - (Date.now() - fishtime))

            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`
            Espera un momento...\nVuelve a usar este comando en ${timeleft.minutes} minuto y ${timeleft.seconds} segundos.`)
            message.channel.send(embed)
        } else {
            const pescados = [
                'Pescado comun',
                'Pescado raro',
                'Calamar comun',
            ]
            const fishoption = random(0, parseInt(pescados.length))
            let pescado = pescados[fishoption]

            let lugares = [
                'Océano',
                'Lago',
                'Arroyo',
                'Río'
            ]
            const lugar = Math.floor(Math.random() * lugares.length)

            if(!fishrodc || fishrodc === null || fishrodc === 0) return message.channel.send(`<@${user.id}>, Necesitas tener una caña de pescar ${fishrod}.\nUsa \`v!buy 2\`.`)
            else if(fishrodc !== null || fishrodc !== 0) {
                if(final === 'Exitoso' && pescado === 'Pescado comun') {
                    const pescadocomun = Math.floor(Math.random() * 7) + 1
                    const embed1 = new MessageEmbed()
                    .setTitle('Pesca exitosa')
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
                    Pescaste en un ${lugares[lugar]} y conseguiste **x${pescadocomun}** ${pescadoc}.
                    `)
                    message.channel.send(embed1)
                    db.add(`pescadoc_${user.id}`, pescadocomun)
                    db.set(`fishtime_${user.id}`, Date.now())
                } else if(final === 'Exitoso' && pescado === 'Pescado raro') {
                    const pescadoraro = Math.floor(Math.random() * 4) + 1
                    const embed2 = new MessageEmbed()
                    .setTitle('Pesca exitosa')
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
                    Pescaste en un ${lugares[lugar]} y conseguiste **x${pescadoraro}** ${pescador}.
                    `)
                    message.channel.send(embed2)
                    db.add(`pescador_${user.id}`, pescadoraro)
                    db.set(`fishtime_${user.id}`, Date.now())
                } else if(final === 'Exitoso' && pescado === 'Calamar comun') {
                    const calamarcomun = Math.floor(Math.random() * 3) + 1
                    const embed3 = new MessageEmbed()
                    .setTitle('Pesca exitosa')
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
                    Pescaste en un ${lugares[lugar]} y conseguiste **x${calamarcomun}** ${calamarc}.
                    `)
                    message.channel.send(embed3)
                    db.add(`clamarc_${user.id}`, calamarcomun)
                    db.set(`fishtime_${user.id}`, Date.now())
                }
            } else if(final === 'Fallido' && pescado === 'Pescado comun' || final === 'Fallido' && pescado === 'Pescado raro' || final === 'Fallido' && pescado === 'Calamar comun') {
                message.channel.send(`<@${user.id}>, Mientras pescabas tu canoa se volteó y no pudiste pescar nada`)
                db.set(`fishtime_${user.id}`, Date.now())
            }
        }
    }
}