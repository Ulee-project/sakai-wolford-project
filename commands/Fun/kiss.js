const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "kiss",
  alias:["muach"],
  description: "Shows a picture of people kissing",
  category: "Fun",
  usage:"kiss <@mention>",
  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/kiss").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const kissed = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username} has Kissed ${kissed}`, message.guild.iconURL({ dynamic: true }))
      .setColor("#00BFFF")
      .setDescription(`**:small_blue_diamond: Click below if the image failed to load.** 
[Image URL](${data.url})`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)
    
    message.channel.send(embed);
  },
};