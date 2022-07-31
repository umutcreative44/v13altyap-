const { SlashCommandBuilder } = require("@discordjs/builders")
let db = require("quick.db")
let Embed = require("../embed.js")
let ayarlar = require("../ayarlar.json")
// Star Coders Youtube kanalına abone olmayı unutmayın
module.exports = {
    data: new SlashCommandBuilder()
.setName("ping")
.setDescription("Botun gecikme değerlerine bakarsınız.")
.addStringOption(option => 
    option.setName("tür")
    .setRequired(true)
    .setDescription("Hangi gecikme türüne bakacaksınız?")
    .addChoice("Bot Ping","normal")
    .addChoice("Discord Ping","interaction")
    
    ),
async execute(interaction, client) {
if(interaction.options.getString("tür") == "normal"){
interaction.reply("Bot Ping: " + client.ws.ping)
} else {
let time = Date.now() - interaction.createdTimestamp
interaction.reply("Discord Ping: " + time)
}
}
// Star Coders Youtube kanalına abone olmayı unutmayın
}