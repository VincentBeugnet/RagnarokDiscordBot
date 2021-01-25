const Discord = require("discord.js");

const power = require("./commands/power")
const list = require("./commands/list")

const client = new Discord.Client();
client.once('ready', () => {
    console.log(`Il est maintenant l'heure du ${client.user.tag}!`);
});


client.on("message", function(message) {
    if (!message.author.bot) {
        const command = message.content.toLowerCase();

        if (command === "be power") {
            return power(message)
        }
        else if (command === "be liste") {
            return list(message)
        }
    }
});


client.login(BOT_TOKEN).then();