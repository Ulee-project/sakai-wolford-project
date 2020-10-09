const Discord = require("discord.js");
const { readdirSync } = require("fs");
const statusAnimation =
{
	'commands' : `<:commands:734037080249729085>`,
  'bot' :  `<:bot:706352736127680602>`,
  'whatsapp' : `<:whatsapp:708045531020001280>`,
  'discord' : `<:discord:708169961700589628>`,
  'instagram' : `<:instagram:709976308670791720>`,
  'facebook' : `<:facebook:735487953710874706>`,
  Kitten_Cat_roll: `<a:Kitten_Cat_roll:741771529024438353>`
};
  
const StatusText =
{
    'commands' : 'commands',
    'bot' : 'bot',
    'whatsapp' : 'whatsapp',
    'discord' : 'discord',
    'instagram' : 'instagram',
    'facebook' : 'facebook',
  Kitten_Cat_roll: "Kitten_Cat_roll"
}

module.exports = {
  name: "help",
  alias: ["h"],
  category: "Info",
  description: "Show bot information",
  run: async (client, msg, args) => {
    if (!args[0]) {
      const helpembed = new Discord.MessageEmbed() //Awas biar w fix awas -,-
        .setTitle(client.user.username + statusAnimation.bot)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `Thank you for using **${client.user.username} ${statusAnimation.bot}** \n If you want to donate as your support please **[click here.](https://saweria.co/donate/Uleekun)**
Use \`${client.prefix}help <command>\` to get more help!`)
      
      .addField(`**${statusAnimation.Kitten_Cat_roll}Prefix**`,`>>> The prefix **${client.user.username} ${statusAnimation.bot}** uses \`${client.prefix}\`.`)
      .addField(`**${statusAnimation.commands}Commands List**`,`>>> To see my **commands list**, use \`${client.prefix}commands\`.`)
      .addField('**📬Add to Discord**', `>>> **${client.user.username} ${statusAnimation.bot}** can be added to as many servers as you want! **[Click here to add it to your server.](https://discord.com/oauth2/authorize?client_id=663112788461355039&permissions=21474836398&scope=bot)**`)
      .addField(`**${statusAnimation.discord}Support Server**`,'>>> Join **[Anime Universe☕](https://discord.gg/VzUR95y)** if you need help or just want to chat!.')
      .setColor("#00BFFF")
      .setFooter(`© ${client.user.username} Discord server. | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL({ format: "png" })
      );
      return msg.channel.send(helpembed);
     } else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));

      if (!cmd) return msg.channel.send("❌ | Invalid Command.");
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          msg.author.tag,

          msg.author.displayAvatarURL({ dynamic: true })
        )
        .setTitle(cmd.name)
        .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
        .setDescription(cmd.description)
        .addField("Category", cmd.category)
        .addField(
          "Aliases",
          cmd.alias.length > 0 ? cmd.alias.join(" ") : "None"
        )
        .setColor("#FFFF00")
        .setFooter(
          `${client.user.username} - Commands`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return msg.channel.send(embed);
    }
  }
};
