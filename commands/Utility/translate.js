const { MessageEmbed } = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
  name: "translate",
  alias: ["tr"],
  description: "Translate a sentence",
  usage: "!translate <language/iso> <sentence>",
  category: "Utility",
  run: async (client, message, args) => {
    let language = args[0];
    let text = args.slice(1).join(" ");

    if (!language)
      return message.reply("**❌What language am I supposed to translate to?**");
    if (language.length !== 2)
      return message.reply(
        "**❌Language must be the 2 letter alias. E.g `English` -> `en`**"
      );
    if (!text) return message.reply("**❌What am I supposed to translate?**");

    const result = await translate(text, { to: language });

    const embed = new MessageEmbed()
      .setDescription(result.text)
      .setColor('#00BFFF')
      .setFooter(`Translate provided by Google.`)
      .setAuthor("Google Translate", message.author.displayAvatarURL());

    message.channel.send(embed);
  }
};