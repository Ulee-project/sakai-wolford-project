const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "stats",
  alias:["st"],
  category: "Information",
  description: "Display bot stats",
  usage: "stats",
  run: async (client, message) => {
    const serverQueue = client.queue.get(message.guild.id);
    const uptime = require("pretty-ms")(client.uptime, { verbose:true})
    let status;
    let lup;
    const mbed = new MessageEmbed()
    .setTitle(`${client.user.username} music stats`)
    .setFooter(`© ${client.user.username}`)
    .setColor("#00BFFF")
    .addField("Uptime", uptime)
    if (!serverQueue) return message.channel.send(mbed).catch(console.error);
    if(serverQueue.playing === true) status = "Playing"
    if(serverQueue.playing === false) status = "Paused"
    if(serverQueue.loop === true) lup = "Yes"
    if(serverQueue.loop === false) lup = "No"
    mbed.addField("Music", `Playing: ${serverQueue.songs[0].title}
Queued: ${parseInt((serverQueue.songs.length) - 1)} songs
In: ${serverQueue.channel.name}
Volume: ${serverQueue.volume}%
Status: ${status}
Loop? ${lup}
Requester: <@${serverQueue.songs[0].playUser}>`)
    message.channel.send(mbed)
  }
}