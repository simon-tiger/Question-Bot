const { questionArr, execCmd } = require("./bot");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

client.once("ready", () => {
  console.log("Beep boop. Boop beep?");
});

// TODO: Refactor
function condition(message) {
  return message.guild.name == "Simon's Discord Bot Playground"
    || message.channel.id == "276366150713999363";
}

client.on("message", message => {
  const msg = message.content;

  if (!condition(message)) {
    return;
  }

  const result = execCmd(msg, message);

  if (result === null) {
    message.channel.send("Command not found");
  } else if (result !== undefined) {
    message.channel.send(result)
  }

});

client.login(process.env.BOT_TOKEN);

app.use(express.static("public"));
app.use(express.json());

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/check", (request, response) => {
  console.log("Submission in!");
  console.log(request.body);
  response.json({
    right: request.body.secret == process.env.SECRET
  });
});

app.get("/questions/:removeId/:approval", (request, response) => {
  if (request.params.approval == process.env.SECRET) {
    let idx = -1;
    for (let i = 0; i < questionArr.length; i++) {
      if (questionArr[i].id == request.params.removeId) {
        idx = i;
        break;
      }
    }
    if (idx >= 0) questionArr.splice(idx, 1);
  }
  response.json(questionArr);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
