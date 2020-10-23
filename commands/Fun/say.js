module.exports = {
  name: "say",
  alias:["say"],
  category: "Fun",
  description: "Get the bot to say what ever you want!",
  usage: "say <message>",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let MSG = message.content.split(`${bot.prefix}say `).join("");
    if (!MSG)
      return message.channel.send(`**❌You did not specify your message to send!**`);
    message.channel.send(MSG);
    message.delete();
  },
};