const translate = require("google-translate");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const cheerio = require("cheerio");
module.exports = {
  name: "translate",
  alias: ["tr"],
  description: "used to interpret language",
  category: "Utility",
  usage: "translate <iso> <message>",
  run: async (client, message, args) => {
    let language = args[0];
    let text = args.join(" ").slice(2);

    if (!language)
      return message.reply("**What language am I supposed to translate to?**");
    if (language.length !== 2)
      return message.reply(
        "**Language must be the 2 letter alias. E.g `English` -> `en`**"
      );
    if (!text) return message.reply("**What am I supposed to translate?**");

    const $ = await fetch(
      `http://translate.google.com/m?hl=${language}&sl=auto&q=${encodeURIComponent(
        text
      )}`
    )
      .then(res => res.text())
      .then(html => cheerio.load(html));

    const results = $("div.t0")
      .first()
      .text();
    const lang = $("div a.s1")
      .next()
      .next()
      .first()
      .text();

    try {
      
      if (results.length < 2048) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            `Translated.`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("#00BFFF")
          .addField("Original Text", "```" + text + "```")
          .addField(
            "Translated Text",
            `Language: ${lang}\n` + "```" + results + "```"
          )
          .setFooter(`Thankyou! Translate provided by Google.`);
        return message.reply({ embed });
      }
    } catch (e) {
      message.channel.send("Error");
    }
  }
};
