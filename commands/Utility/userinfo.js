const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../functions");
const badges = require("../../data/badges.json");

module.exports = {
  name: "userinfo",
  description: "Get user info",
  usage: "userinfo <user>",
  category: "Utility",
  alias: ["user"],
  run: async(client, message, args) =>  {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

    if (!member) {
      return message.channel.send("User wasn't found!");
    }

    const joinedAt = formatDate(member.joinedAt);
    const createdAt = formatDate(member.user.createdAt);
    const nickname = member.nickname || "None";
    const isBot = member.user.bot;
    const userFlags = (await member.user.fetchFlags())
      .toArray()
      .map((flag) => badges[flag])
      .join(" ");

    const roles =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .sort((a, b) => b.rawPosition - a.rawPosition)
        .map((r) => r)
        .join(", ") || "None";
    const roleCount = member.roles.cache.filter(
      (r) => r.id !== message.guild.id
    ).size;

    const { username, id, tag } = member.user;

    const embed = new MessageEmbed()
      .addField("**ID**", id, true)
      .addField("**Username**", username, true)
      .addField("**Tag**", tag, true)
      .addField("**Created At**", createdAt, true)
      .addField(
        `**${lang.MEMBER.BADGES}**`,
        userFlags.length > 0 ? userFlags : "None",
        true
      )
      .addField("**Joined At**", joinedAt, true)
      .addField(`**Roles (${roleCount})**`, roles)
      .setTitle(`${username}'s info`)
      .setColor(0xFF0000)
      .setThumbnail(avatar, { dynamic: true })
      .setTimestamp();

    message.channel.send(embed);
  },
};
