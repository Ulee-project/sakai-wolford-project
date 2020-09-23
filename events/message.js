const Discord = require("discord.js");

module.exports = async (client, msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;

  if (msg.content == `<@${client.user.id}>`) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`:wave: | My prefix is ${client.prefix}`)
      .setColor("RANDOM")
      .setFooter("© Client Developer 2020");
    msg.channel.send(embed);
  }
  if (msg.content == client.prefix) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Hey, It's me!
You can type ${client.prefix}help to get bot commands list`
      )
      .setColor("RANDOM")
      .setFooter("© Client Developer 2020");
    return msg.channel.send(embed);
  }

  let args = msg.content
    .slice(client.prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  if (!msg.content.startsWith(client.prefix)) return;

  try {
    const file = client.commands.get(cmd) || client.aliases.get(cmd);
    if (!file) return msg.reply("Command that you want doesn't exist.");

    const now = Date.now();
    if (client.db.has(`cooldown_${msg.author.id}`)) {
      const expirationTime = client.db.get(`cooldown_${msg.author.id}`) + 3000;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${file.name}\` command.`
        );
      }
    }

    client.db.set(`cooldown_${msg.author.id}`, now);
    setTimeout(() => {
      client.db.delete(`cooldown_${msg.author.id}`);
    }, 3000);

    file.run(client, msg, args);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(
      `${msg.author.tag} using ${cmd} in ${msg.channel.name} | ${msg.guild.name}`
    );
  }
};
