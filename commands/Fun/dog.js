const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"dog",
  alias:["doggy"],
  category:"Fun",
  description:"Get Fresh dot Images",
  usage:"dot",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/woof").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#00BFFF")
      .setAuthor(`| 🐕Guk Guk Guk~`, message.guild.iconURL({ dynamic: true }))
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};