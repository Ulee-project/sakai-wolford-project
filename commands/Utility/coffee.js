const Discord = require("discord.js");
const superagent = require("superagent");
module.exports = {
  name: "coffee",
  alias:["coffee"],
  category: "Utility",
  description: "let's coffee together",
  run: async (client, message, args) => {

    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!user) return message.reply("Mention someone to give coffe")
  //  var user = message.author.username
    let {body} = await superagent
    .get(`https://nekobot.xyz/api/image?type=coffee`);
  //  var embed = new Discord.MessageEmbed()
    const embed = new Discord.RichEmbed()
    .setTitle("Mmmm coffee")
    .setDescription(`Ahhh heres some nice coffee for you ${user}`)
    .setImage(body.message)
    .setFooter(`Requested by ${message.author.tag}`)
    message.channel.send(embed)
}
};

