const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767});
client.setMaxListeners(300) // Fazla komutlu bot yapacaksanız silmeyin.
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
require("./util/eventLoader")(client);

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("warn", e => {
  console.log(e.replace(regToken, "that was redacted"));
});
client.on("error", e => {
  console.log(e.replace(regToken, "that was redacted"));
});

client.slashcommands = new Discord.Collection()
 

client.on("ready", () => {
log("Slash (/) komutları yüklenmeye başlandı.")
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
client.slashcommands.set(command.data.name, command)
log("/" + command.data.name)
  client.guilds.cache.forEach(siy => { 
    
  client.guilds.cache.get(siy.id).commands.create(command.data.toJSON());
    }) 
}
log("Slash (/) komutları yüklendi.")

})

client.login(process.env.token).catch(err => {
if(!process.env.token){
console.log("Lütfen .env dosyasına token giriniz.")
} else if(err.toString().includes("TOKEN_INVALID")){
console.log("Girdiğiniz token doğru bir token değil")
} else if(err.toString().includes("DISALLOWED_INTENTS")){
console.log("Lütfen tokenini girdiğin botun intentlerini aç (tek yapman gereken https://discord.com/developers/applications sayfasına girip bot kısmına girip alta inip tüm gri yerleri açıp mavi yap.)")
} else {
console.error(err)
}
process.exit(0)
})

