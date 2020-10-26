const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "tickle",
  alias:["tickle"],
  description: "Tickle other people",
  category: "Fun",
  usage:"tickle <@mention>",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/tickle").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const tickle = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setColor("#00BFFF")
      .setAuthor(`${message.author.username} has Tickled ${tickle}`, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**:small_blue_diamond: Click below if the image failed to load.** 
[Image URL](${data.url})`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};