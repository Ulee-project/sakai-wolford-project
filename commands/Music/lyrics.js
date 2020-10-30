const { MessageEmbed } = require("discord.js");
const { GENIUS_API_KEY } = require("../../config");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = {
  name: "lyrics",
  alias: ["ly"],
  category: "Music",
  description: "Shows lyrics of the song being played",
  usage: "lyrics",
  run: async (client, message, args, ops) => {
    let queue = client.queue.get(message.guild.id);
    let songName = args.join(" ") || queue.songs[0].title
    if (!songName)
      return message.channel.send({
        embed: { color: 0x7289da, description: `Please enter the name song!` }
      });
    songName = songName.replace(
      /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
      ""
    );

    const sentMessage = await message.channel.send(
      "**🔍Searching for lyrics...**"
    );

    const hits = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(songName)}`,
      {
        headers: { Authorization: `Bearer ${GENIUS_API_KEY}` }
      }
    )
      .then(res => res.json())
      .then(body => body.response.hits);

    const headers = {
      Authorization: `Bearer ${GENIUS_API_KEY}`
    };
    try {
      const url = hits[0].result.url;
      const image = hits[0].result.song_art_image_thumbnail_url;
      const title = hits[0].result.full_title;
      let lyrics = await getLyrics(url);
      lyrics = lyrics.replace(/(\[.+\])/g, "");

      if (lyrics.length > 8192) {
        return sentMessage.edit("**❌Not Availble**");
      }
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setTitle(`Lyrics ${title}`)
          .setThumbnail(image)
          .setColor(0x7289da)
          .setDescription(lyrics.trim());
        return sentMessage.edit("", lyricsEmbed);
      }
      if (lyrics.length > 2048) {
        const firstLyricsEmbed = new MessageEmbed()
          .setTitle(`Lyrics ${title}`)
          .setThumbnail(image)
          .setColor(0x7289da)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(2048, 4096));
        sentMessage.edit("", firstLyricsEmbed);
        message.channel.send("", secondLyricsEmbed);
      }
      if (lyrics.length > 4096 && lyrics.length < 6144) {
        const firstLyricsEmbed2 = new MessageEmbed()
          .setTitle(`Lyrics ${title}`)
          .setThumbnail(image)
          .setColor(0x7289da)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed2 = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(2048, 4096));
        const thirdLyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(4096, lyrics.length));
        await sentMessage.edit("", firstLyricsEmbed2);
        message.channel.send(secondLyricsEmbed2);
        message.channel.send(thirdLyricsEmbed);
        return;
      }
      if (lyrics.length > 6144 && lyrics.length < 8192) {
        const firstLyricsEmbed3 = new MessageEmbed()
          .setTitle(`Lyrics ${title}`)
          .setThumbnail(image)
          .setColor(0x7289da)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed3 = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(2048, 4096));
        const thirdLyricsEmbed2 = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(4096, 6144));
        const fourthLyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(6144, lyrics.length));
        await sentMessage.edit("", firstLyricsEmbed3);
        message.channel.send(secondLyricsEmbed3);
        message.channel.send(thirdLyricsEmbed2);
        message.channel.send(fourthLyricsEmbed);
      }
    } catch (e) {
      return sentMessage.edit("**❌Not Available**");
    }

    async function getLyrics(url) {
      const response = await fetch(url);
      const text = await response.text();
      const $ = cheerio.load(text);
      return $(".lyrics")
        .text()
        .trim();
    }
  }
};
