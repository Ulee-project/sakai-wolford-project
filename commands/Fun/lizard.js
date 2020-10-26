const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"lizard",
  alias:["lizard"],
  category:"Fun",
  description:"Get Fresh Lizard Images",
  usage:"lizard",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/lizard").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#00BFFF")
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};