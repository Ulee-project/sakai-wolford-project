const Discord = require("discord.js")

module.exports =  {
  name: "avatar",
  alias:["ava"],
  category: "Fun",
  description: "Retrieve user profiles",
  usage: "avatar <@mention>",
  run: async (client, message, args) => {
   let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }
  
  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});

  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.tag} Avatar!`)
  .setDescription(`**:small_blue_diamond: Avatar URL of ${user.tag}** 
[click here](${avatar})`)
  .setColor(`#00BFFF`)
  .setImage(avatar)
  
  return message.channel.send(embed);
}
}
