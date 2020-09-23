module.exports = client => {
  console.log(
    `(👌) Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );
  
  client.user.setActivity(`u!help, Guild ${client.guilds.cache.size}.`);
}