require("moment-duration-format");
const { version, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "botinfo",
    alias:["binfo"],
    usage:"botinfo",
    description: "Shows info about the bot",
    category: "Utility",
    run: async(client, message, args) => {
        const uptime = moment
            .duration(client.uptime)
            .format(" D [days], H [hrs], m [mins], s [secs]");
        const nodev = process.version;
        const createdAt = moment(client.user.createdAt).format("MM/DD/YYYY");

        const embed = new MessageEmbed()
            .setColor(0xFF0000)
            .setFooter(message.author.username)
            .setAuthor(`${client.user.username} | Bot Information`, client.user.displayAvatarURL({ dynamic:true}))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField("Bot Id:", client.user.id)
            .addField("Bot username:", client.user.username)
            .addField("Add Bot", "[Invite the Bot to your server ](https://discord.com/oauth2/authorize?client_id=706346679263035392&permissions=21474836398&scope=bot)")
            .addField("Support server", "https://discord.gg/VzUR95y")
            .addField("__**Bot info:**__", `
**Status:** ${client.user.presence.status}
**Prefix:** ${client.prefix}
**Users:** ${client.users.cache.size}
**Servers:** ${client.guilds.cache.size}
**Channels:** ${client.channels.cache.size}
**Created on:** ${createdAt}
**Command Count:** ${client.commands.size}
**Voice connections:** ${client.voice.connections.size}
            `)
            .addField(
                "__**System Info**__",
                `**RAM Usage:**  ${(
                    process.memoryUsage().heapUsed /
                    1024 /
                    1024
                ).toFixed(2)}MB
**Bot Uptime:** ${uptime}
**Node Version:** ${nodev}
**Discord.js version:** ${version}`
            )
            .setImage('https://media.giphy.com/media/p38lEw3bnOMvJAkCWJ/giphy.gif')

        message.channel.send(embed);
    }
};