const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "emojis",
  alias:["emot"],
  description: "View all emojis in the guild",
  category: "Utility",
  usage: "emojis",
  run: async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setAuthor(`Emojis in ${message.guild.name}.`, message.guild.iconURL({ dynamic: true }))
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
      )
      .setColor(`#00BFFF`);
    message.channel.send(Embed);
  },
};