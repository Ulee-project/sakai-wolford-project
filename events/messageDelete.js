const Discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let construct = {
    user: message.author.tag,
    content: message.content,
    channel: message.channel.id
  };

  await client.db.set(`snipe.${message.channel.id}`, construct);

  setInterval(() => {
    client.db.delete(`snipe.${message.channel.id}`);
  }, 20000);
};
