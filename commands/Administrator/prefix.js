const db = require("quick.db");
const Sempack = require("discord.js");
//check cmd translate -,-
module.exports = {
  name: "prefix",
  description: "Set a server's prefix",
  alias: ["setprefix"],
  category: "Administrator",
  usage: "prefix [newprefix] or prefix reset.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You don't have permission to use that.");

    if (!args[0])
      return message.channel.send(
        "```\nUsage: !prefix set <prefix>\nExample: !prefix set +\n\nChange the guild prefix.\n\nSub-command:\n\nreset: set the default prefix\nset: set the prefix of your choice```"
      );

    if (args[0] === "set") {
      db.set(`prefix_${message.guild.id}`, args[1]);

      let embed = new Sempack.MessageEmbed()
        .setTitle("Prefix")
        .setColor("#00BFFF")
        .setDescription(`**The new prefix for the guild is** \`${args[1]}\`.`);
      message.channel.send(embed);
    }

    if (args[0] === "reset") {
      db.delete(`prefix_${message.guild.id}`);

      message.channel.send(`**Succesffully set new prefix to** \`s!\``);
    }
  }
};
