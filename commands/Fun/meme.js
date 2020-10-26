const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");
const statusAnimation =
{
	'meme' : `<:meme:767211992107974656>`
};
  
const StatusText =
{
    'meme' : 'meme'
}
module.exports = {
  name: "meme",
  alias: ["meme(k)"],
  description: "Get a meme from reddit!",
  category: "Fun",
  usage:"meme",
  run: async (bot, message, args) => {
    let subreddits = ["comedyheaven", "dank", "meme", "memes"];
    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    let img = await api(subreddit, true);
    const Embed = new MessageEmbed()
      .setTitle(`${statusAnimation.meme} | Meme from reddit/${subreddit}`)
      .setURL(`https://reddit.com/r/${subreddit}`)
      .setColor("#00BFFF")
      .setFooter(`Powered by Reddit`)
      .setImage(img);
    message.channel.send(Embed);
  },
};