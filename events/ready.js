module.exports = client => {
  console.log(
    `(👌) Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );
  
  client.user.setActivity(`s!help ${client.guilds.cache.size} servers.`, { type: "LISTENING" },5000)
}
