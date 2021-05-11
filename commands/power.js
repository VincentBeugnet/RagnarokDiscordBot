const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = message => {
    const getPower = async () => {
        const url = 'https://questland-public-api-dot-questland-tools.uc.r.appspot.com/guild/plan/Vikings %26 SKDN'
        const params = '?' + new URLSearchParams({server: 'EUROPE'})
        return await fetch(url + params)
            .then(res => res.json())
            .then(list => {

                let names = "";
                let powers = "";
                list["heroPlans"].forEach(mem => {
                    if (mem["battleEventMulti"] !== 0) {
                        names = names + mem["name"] + "\n"
                        powers = powers + mem["beHeroPower"] + "\n"
                    }
                })

                const embedMessage = new Discord.MessageEmbed()
                    .setAuthor("BE Power")
                    .setColor('#0099ff')
                    .setTitle('Classement Vikings & SKDN Battle Event Power')
                    .addFields(
                    { name: 'Nom', value: names, inline: true },
                        { name: 'Battle Event Power', value: powers, inline: true }
                    )

                message.channel.send(embedMessage).then()
            })
    }

    message.channel.send(new Discord.MessageEmbed().setTitle("Recupération de la liste des participants"))
        .then(msg => {
            getPower().catch(e => console.log(e))
            msg.delete({timeout: 25000}).then()
        })
}

