const { MessageEmbed } = require('discord.js');
const { GENIUS_API_KEY } = require('../../config');
const fetch = require('node-fetch');
const cheerio = require('cheerio')

module.exports = {
    name: "lyrics",
    alias: ["ly"],
    category: "Music",
    description: "Shows lyrics of the song being played",
    usage: "lyrics",
  run: async (client, message, args, ops) => {
    const { channel } = message.member.voice;
    if (!channel) return message.channel.send('**❌I\'m sorry but you need to be in a voice channel to see lyrics!**');
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send("**❌You Have To Be In The Same Channel With The Bot!**");
    }
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send('❌ **Nothing playing in this server**');

    let songName = queue.songs[0].title
      songName = songName.replace(/lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi, "");

    const sentMessage = await message.channel.send(
      '🔍Searching for lyrics...'
    );

    let url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

    const headers = {
      Authorization: `Bearer ${GENIUS_API_KEY}`
    };
    try {
      let body = await fetch(url, { headers });
      let result = await body.json();
      const songID = result.response.hits[0].result.id
      if (!songID) return message.channel.send("not available")

      url = `https://api.genius.com/songs/${songID}`;
      body = await fetch(url, { headers });
      result = await body.json();

      const song = result.response.song;

      let lyrics = await getLyrics(song.url);
      lyrics = lyrics.replace(/(\[.+\])/g, '');
      if (lyrics.length > 8192) {
        return sentMessage.edit("**Not Availble**");
      } if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.trim());
        return sentMessage.edit('', lyricsEmbed);
      } if (lyrics.length > 2048) {
        const firstLyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(2048, 4096));
        sentMessage.edit('', firstLyricsEmbed);
        message.channel.send('', secondLyricsEmbed);
      } if (lyrics.length > 4096 && lyrics.length < 6144) {
        const firstLyricsEmbed2 = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed2 = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(2048, 4096));
        const thirdLyricsEmbed = new MessageEmbed()
          .setColor(0x7289da)
          .setDescription(lyrics.slice(4096, lyrics.length));
        await sentMessage.edit('', firstLyricsEmbed2);
        message.channel.send(secondLyricsEmbed2);
        message.channel.send(thirdLyricsEmbed);
        return;
      } if (lyrics.length > 6144 && lyrics.length < 8192) {
        const firstLyricsEmbed3 = new MessageEmbed()
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
          .setDescription(lyrics.slice(6144, lyrics.length))
        await sentMessage.edit('', firstLyricsEmbed3);
        message.channel.send(secondLyricsEmbed3);
        message.channel.send(thirdLyricsEmbed2);
        message.channel.send(fourthLyricsEmbed);
      }
    } catch (e) {
      return sentMessage.edit(
        '**❌Not Available**'
      );
    }

    async function getLyrics(url) {
      const response = await fetch(url);
      const text = await response.text();
      const $ = cheerio.load(text);
      return $('.lyrics')
        .text()
        .trim();
    };
  }
};