const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = message => {
    const getList = async () => {
        const url = 'https://questland-public-api-dot-questland-tools.uc.r.appspot.com/guild/plan/vikingsfr'
        const params = '?' + new URLSearchParams({server: 'EUROPE'})
        return await fetch(url + params)
            .then(res => res.json())
            .then(list => {
                let memList = "";
                list["heroPlans"].forEach(mem => {
                    if (mem["battleEventMulti"] !== 0)
                        memList = "@"+mem["name"]+" "+memList
                })

                const embedMessage = new Discord.MessageEmbed()
                    .setAuthor("BE Liste")
                    .setColor('#0099ff')
                    .setTitle('Liste ordonnée des VikingsFR participant au Battle Event')
                    .setDescription(memList)

                message.channel.send(embedMessage).then()
            })
    }

    message.channel.send(new Discord.MessageEmbed().setTitle("Recupération de la liste des participants"))
        .then(msg => {
            getList().catch(e => console.log(e))
            msg.delete({timeout: 25000}).then()
        })
}