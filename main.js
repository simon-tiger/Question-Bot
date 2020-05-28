const express = require("express");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();

require("dotenv").config();

client.once("ready", () => {
  console.log("Beep boop. Boop beep?");
});

const questionArr = [];
let idCounter = 1;

function nf(num, digits) {
  let str = "" + num;
  while (str.length < digits) {
    str = "0" + str;
  }
  return str;
}

client.on("message", message => {
  let msg = message.content;
  if (msg.slice(0, 4) == "qar!") {
    msg = msg.slice(4);
    console.log(msg);
    if (msg.slice(0, 8) == "question") {
      const q = msg.slice(9);
      questionArr.push({
        question: q,
        likes: 0,
        id: idCounter
      });
      message.channel.send(`Thanks for your question! Your question was recorded with ID #${nf(idCounter, 2)}.`);
      idCounter++;
    } else if (msg.slice(0, 4) == "list") {
      for (const q of questionArr) {
        message.channel.send(`Question #${nf(q.id, 2)}:
${q.question}
:+1: ${q.likes}`);
      }
    } else if (msg.slice(0, 4) == "like") {
      let number = msg.slice(5);
      if (number[0] == "#") number = +number.slice(1);
      else                  number = +number;
      let question = null;
      for (const q of questionArr) {
        if (q.id == number) {
          question = q;
          break;
        }
      }
      if (question) {
        question.likes++;
      } else {
        message.channel.send("Sorry, the ID you specified doesn't belong to any question! :(")
      }
      questionArr.sort((a, b) => {
        if (a.likes == b.likes) return a.id - b.id;
        else                    return b.likes - a.likes;
      });
    }
  }
});

client.login(process.env.BOT_TOKEN);

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/questions", (request, response) => {
  response.json(questionArr);
});

const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
