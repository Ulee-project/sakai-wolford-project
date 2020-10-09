const discord = require("discord.js");
const { readdirSync } = require("fs");
const statusAnimation = {
  bot: `<:bot:706352736127680602>`,
  commands : `<:commands:734037080249729085>`,
  Kitten_Cat_roll: `<a:Kitten_Cat_roll:741771529024438353>`
};
const Statustext = {
  bot: "bot",
  'commands' : 'commands',
  Kitten_Cat_roll: "Kitten_Cat_roll"
};

module.exports = {
  name: "commands",
  alias: ["cmd"],
  category: "Info",
  description: "Show list of bot's commands",
  run: async (client, msg, args) => {
    if (!args[0]) {
      const helpembed = new discord.MessageEmbed()
        .setTitle(client.user.username + statusAnimation.bot)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `${statusAnimation.commands} Below are the commands that i know of \n Use prefix \`${client.prefix}\` example: \`${client.prefix}<commands>\`\nDonate [click here](https://saweria.co/donate/Uleekun) as your support for the developer.`)
        .addField(
          `Info`,
          client.commands
            .filter(c => c.category === "Info")
            .map(m => `\`${m.name}\``)
            .join(", ")
        )
        .addField(
          `Music`,
          client.commands
            .filter(c => c.category === "Music")
            .map(m => `\`${m.name}\``)
            .join(", ")
        )
        .addField(
          `Utility`,
          client.commands
            .filter(c => c.category === "Utility")
            .map(m => `\`${m.name}\``)
            .join(", ")
        )
        .setColor("#00BFFF")
        .setFooter(
          `© ${client.user.username} Discord server. | Total Commands: ${client.commands.size}.`,
          client.user.displayAvatarURL({ format: "png" })
        );

      return msg.channel.send(helpembed);
    } else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));

      if (!cmd) return msg.channel.send("❌ | Invalid Command.");
      const embed = new discord.MessageEmbed()
        .setAuthor(
          msg.author.tag,

          msg.author.displayAvatarURL({ dynamic: true })
        )
        .setTitle(cmd.name)
        .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
        .setDescription(cmd.description)
        .addField("Category", cmd.category)
        .addField(
          "Aliases",
          cmd.alias.length > 0 ? cmd.alias.join(" ") : "None"
        )
        .setColor("#FFFF00")
        .setFooter(
          `${client.user.username} - Commands`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return msg.channel.send(embed);
    }
  }
};
