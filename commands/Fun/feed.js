const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"feed",
  alias:["feed"],
  category:"Fun",
  description:"Get Fresh feed Images",
  usage:"feed",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/feed").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#00BFFF")
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)

    message.channel.send({ embed });
  },
};