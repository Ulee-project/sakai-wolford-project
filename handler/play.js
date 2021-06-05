const ytdlDiscord = require("ytdl-core-discord");
const statusAnimation = {
YouTube: `<:YouTube:735293606973276180>`
};
const Statustext = {
  YouTube: "YouTube"
};
module.exports.play = async (song, client, message) => {
  const queue = client.queue.get(message.guild.id);
  const Discord = require("discord.js");
  if (!song) {
    queue.channel.leave();
    message.client.queue.delete(message.guild.id);
    return queue.textChannel.send("**🚫 Music queue ended.**").catch(console.error);
  }

  try {
    var stream = await ytdlDiscord(song.url);
  } catch (error) {
    if (queue) {
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
    }
  }

  const dispatcher = queue.connection
    .play(stream, { type: "opus" })
    .on("finish", () => {
      if (playingMessage && !playingMessage.deleted)
        playingMessage.delete().catch(console.error);

      if (queue.loop) {
        // if loop is on, push the song back at the end of the queue
        // so it can repeat endlessly
        let lastSong = queue.songs.shift();
        queue.songs.push(lastSong);
        module.exports.play(queue.songs[0], client, message);
      } else {
        // Recursively play the next song
        queue.songs.shift();
        module.exports.play(queue.songs[0], client, message);
      }
    })
    .on("error", err => {
      console.error(err);
      queue.songs.shift();
      module.exports.play(queue.songs[0], client, message);
    });
  dispatcher.setVolumeLogarithmic(queue.volume / 100);

  try {
    var playingMessage = await queue.textChannel.send({
      embed: {
        color: 0x7289da,
        title: `${statusAnimation.YouTube} Now playing`,
        description: `**[${song.title}](${song.url}) Requested by: <@${song.playUser}>**`,
        fields: [
          {
            name: "Duration", value: song.duration
          }
        ],
        thumbnail: {
          url: song.thumbnail,
        timestamp: new Date(),
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
