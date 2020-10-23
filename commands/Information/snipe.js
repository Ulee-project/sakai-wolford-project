const Discord = require("discord.js");
module.exports = {
  name: "snipe",
  alias: ["snipe"],
  category: "Information",
  description: "Shows the last deleted message.",
  usage: "snipe <#mentions channel>",
  run: async (client, message, args) => {
    let channel = message.mentions.channels.first() || message.channel;
    let check = await client.db.fetch(`snipe.${channel.id}`);
    if (check === null || !check)
      return message.channel.send(`There's Nothing To Snipe!`);

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${check.user}`)
      .setDescription(`${check.content}`);
    message.channel.send(embed);
  }
};
