const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"cat",
  alias:["puss"],
  category:"Fun",
  description:"Get Fresh cat Images",
  usage:"cat",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/meow").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#00BFFF")
      .setAuthor(`| 🐈 Meow Meow~`, message.guild.iconURL({ dynamic: true }))
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};