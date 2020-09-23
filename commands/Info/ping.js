const discord = require("discord.js")
module.exports = {
  name: "ping",
  alias:[""],
  category: "Info",
  description: "Show list of bot's commands",
  run: async(client, msg, args) => {
     const m = await msg.channel.send("Ping...");
   const embed = new discord.MessageEmbed()
      .addField("⏳ Latency", `__**${m.createdTimestamp - msg.createdTimestamp}ms**__`)
      .addField("💓 API", `__**${Math.floor(client.ping)}ms**__`);
    return m.edit(`🏓 P${"".repeat(Math.floor(client.ping) % 5 === 0 ? 0 : Math.floor(Math.random() * 5))}ong!`, { embed: embed });
  }
}