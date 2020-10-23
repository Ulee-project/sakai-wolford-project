const discord = require("discord.js");
const { readdirSync } = require("fs");
const statusAnimation = {
  amelia_stars: `<a:amelia_stars:767224079530852372>`,
  musrik: `<a:musrik:767228110974091274>`,
  amelia_fun: `<a:amelia_fun:768983514573438996>`,
  utility: `<:utility:767237827318120488>`,
  administrator: `<a:administrator:767241297881989130>`
};
const Statustext = {
  amelia_stars: "amelia_stars",
  musrik: "musrik",
  amelia_fun: "amelia_fun",
  utility: "utility",
  administrator: "administrator"
  
  
};

module.exports = {
  name: "help",
  alias: ["h"],
  category: "Information",
  description: "Show list of bot's commands",
  usage: "help <commands>",
  run: async (client, msg, args) => {
    if (!args[0]) {
      const helpembed = new discord.MessageEmbed()
        .setAuthor(`${client.user.username} | Help Commands`, msg.guild.iconURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `_Type \`${client.prefix}help <commands>\` to get more help eg. \`${client.prefix}help stats\`\nif you need help or just want to chat please join the [Support Server](https://discord.gg/VzUR95y)_\n`)
        
        .addField(
          `${statusAnimation.administrator} **| Administrator Commands**`,
          client.commands
            .filter(c => c.category === "Administrator")
            .map(m => `_\`${m.name}\`_`)
            .join(", ")
        )
        .addField(
          `${statusAnimation.amelia_stars} **| Information Commands**`,
          client.commands
            .filter(c => c.category === "Information")
            .map(m => `_\`${m.name}\`_`)
            .join(", ")
        )
        .addField(
          `${statusAnimation.musrik} **| Music Commands**`,
          client.commands
            .filter(c => c.category === "Music")
            .map(m => `_\`${m.name}\`_`)
            .join(", ")
        )
        .addField(
         `${statusAnimation.amelia_fun} **| Fun Commands**`,
         client.commands
           .filter(c => c.category == "Fun")
           .map(m => `_\`${m.name}\`_`)
           .join(", ")
        )
         .addField(
         `${statusAnimation.utility} **| Utility Commands**`,
         client.commands
           .filter(c => c.category == "Utility")
           .map(m => `_\`${m.name}\`_`)
           .join(", ")
        )
        .setColor("#00BFFF")
        .setFooter(
          `© ${client.user.username} Discord server. | ${client.prefix}invite | Total Commands: ${client.commands.size}.`,
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
        .setTitle(`**${client.prefix}${cmd.name}**`)
        .setThumbnail(msg.guild.iconURL({ dynamic: true }))
        .setDescription(`\`\`\`${cmd.description}\`\`\``)
        .addField("_Category_", `\`${cmd.category}\``)
        .addField("_Usage_", `\`${client.prefix}${cmd.usage}\``,true)
        .addField(
          "_Aliases_",
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
