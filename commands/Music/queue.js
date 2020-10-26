const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  alias: ["q"],
  category: "Music",
  description: "Show the music queue and now playing.",
  usage:"queue",
  run: async(client, message) => {
    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) return message.reply("**❌There is nothing playing.**").catch(console.error);
    
    let queueEmbed = new MessageEmbed()
      .setTitle("Music Queue")
      .setDescription(serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`))
      .setColor(0x7289da)
      .setFooter(`© ${client.user.username}`)

    queueEmbed.setTimestamp();
    return message.channel.send(queueEmbed);
  }
};