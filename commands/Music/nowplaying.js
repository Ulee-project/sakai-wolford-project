const statusAnimation = {
  youtube: `<:youtube:734037069537607791>`
};
const Statustext = {
  youtube: "youtube"
};
module.exports = {
  name: "nowplaying",
  alias:["np"],
  category: "Music",
  description: "Get info of now playing music",
  usage:"nowplaying",
  run: async(client, message) => {
     const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.reply("**❌There is nothing playing.**").catch(console.error);
    const song = serverQueue.songs[0]
      message.channel.send(`**${statusAnimation.youtube}Now Playing:** \`${song.title} from ${song.channel}.\` **Requested by <@${song.playUser}>**`)
  }
};