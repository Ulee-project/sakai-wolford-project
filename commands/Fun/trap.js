const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name:"trap",
  alias:["trap"],
  category:"Fun",
  description:"Get Fresh trap Images",
  usage:"trap",
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/trap").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("#00BFFF")
      .setAuthor(`Its a TRAP`, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**:small_blue_diamond: Click below if the image failed to load.** 
[Image URL](${data.url})`)
      .setImage(`${data.url}`)
      .setFooter(`Powered by nekos.life`)
    
    message.channel.send({ embed });
  },
};