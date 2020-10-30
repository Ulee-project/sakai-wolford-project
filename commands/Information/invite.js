const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "invite",
  alias: ["add"],
  description: "Get a link to invite the bot to your server",
  category: "Information",
  usage:"invite",
  run: async (client, msg, args) => {
    const Embed = new MessageEmbed()
      .setAuthor(`Invite ${client.user.username}`,client.user.displayAvatarURL({ format: "png" }))
      .setDescription(`Want to invite me to your server? [Click here](https://discord.com/oauth2/authorize?client_id=663112788461355039&permissions=21474836398&scope=bot)`)
      .setColor("#00BFFF")
      .setFooter(`© ${client.user.username}`)
    msg.channel.send(Embed);
  },
};