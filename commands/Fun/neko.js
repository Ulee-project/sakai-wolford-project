const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"neko",
  alias:["neko"],
  category:"Fun",
  description:"Get Fresh Neko Images",
  usage:"neko",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/neko").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(`Powered by nekos.life`)
      .setColor("#00BFFF")
      .setDescription(`NEKO`)
      .setImage(`${data.url}`)


    message.channel.send({ embed });
  },
};