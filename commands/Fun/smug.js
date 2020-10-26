const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "smug",
  alias:["smug"],
  description: "Smug",
  category: "Fun",
  usage:"smug",  
  run: async(client, message, args) => {
    const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setFooter(`Powered by nekos.life`)
      .setColor("#00BFFF")
      .setAuthor(`SMUG`, message.guild.iconURL({ dynamic: true }))
      .setDescription(`**:small_blue_diamond: Click below if the image failed to load.** 
[Image URL](${data.url})`)
      .setImage(`${data.url}`)

    message.channel.send({ embed });
  },
};