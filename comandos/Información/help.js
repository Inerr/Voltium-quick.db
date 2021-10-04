const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['help', 'h', 'ayuda'],
    description: 'Muestra un poco de ayuda',
    callback: (message, args) => {
        

        const banner = 'https://cdn.discordapp.com/attachments/862419104618381312/892952373310390272/voltium_banner.gif'
        //dS6uXdqF2f
        //https://discord.com/api/oauth2/authorize?client_id=891900837616566333&permissions=388160&scope=bot

        const embed = new MessageEmbed()
        .setTitle('🤖 Menú de ayuda 🤖')
        .addField('Links importantes', `[Invitación](https://discord.com/api/oauth2/authorize?client_id=891900837616566333&permissions=388160&scope=bot)\`|\`[Soporte](https://discord.gg/dS6uXdqF2f)`)
        .addField('Desarrollador', `<:voltium_dev:892925613059481621> Inerr#0416`)
        .addField('Colaboradores', `<:voltium_estrella:892924703889563699> EKIZ#9732\n<:voltium_estrella2:893238140347752478> TheLuis#6307`)
        .addField('Prefijo', 'v!')
        .addField('Comandos', 'v!comandos')
        .addField('Versión', '`1.0.0B`')
        .setColor('#ebd804')
        .setImage(banner)

        message.channel.send(embed)
    }
}