const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
  name:"neko",
  alias:["Neko"],
  category:"Fun",
  description:"Get Fresh Neko Images",
  usage:"neko",
  run: async(client, message, args) => {
    let data = await random.getNeko()
    message.channel.send(data)
  }
}
