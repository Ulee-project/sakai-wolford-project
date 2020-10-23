const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "hug",
    alias: ["hug"],
    description: "Hug people",
    category: "Fun",
    usage:"hug <@user>",
    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/animu/hug';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`@${message.author.username} has hugged @${message.mentions.users.first().username || message.mentions.members.first()}`)
            .setImage(data.link)
            .setColor(`#00BFFF`)
        await message.channel.send(embed)
    }
}