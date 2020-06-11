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

const modsOrMe = [
  "shiffman",
  "Alca",
  "David",
  "Gruselhaus",
  "Kobe",
  "kwichmann",
  "meiamsome",
  "Nola si Forritun",
  "simontiger", // I ain't a mod, but, I am the maker of the bot!
  "SolarLiner"
];

function like(message, number, remove, permissionFailiure, _404Failiure) {
  let question = null;
  for (const q of questionArr) {
    if (q.id == number) {
      question = q;
      break;
    }
  }
  if (question) {
    if (!question.likes.includes(message.author.id) || remove) {
      if (remove) {
        const idx = question.likes.indexOf(message.author.id);
        if (idx >= 0) question.likes.splice(idx, 1);
        else          message.channel.send(permissionFailiure);
      } else {
        question.likes.push(message.author.id);
      }
    } else {
      message.channel.send(permissionFailiure); //"Sorry, you already liked this question! To avoid spam protection, I only allow 1 like per person per question!");
    }
  } else {
    message.channel.send(_404Failiure); //"Sorry, the ID you specified doesn't belong to any question! :(")
  }
  questionArr.sort((a, b) => {
    if (a.likes.length == b.likes.length) return a.id - b.id;
    else                                  return b.likes.length - a.likes.length;
  });
}

// TODO: Refactor
function condition(message) {
  return message.guild.name == "Simon's Discord Bot Playground" || message.channel.id == "276366150713999363";
}

function nf(num, digits) {
  let str = "" + num;
  while (str.length < digits) {
    str = "0" + str;
  }
  return str;
}

client.on("message", message => {
  let msg = message.content;
  if (msg.slice(0, 4) == "qar!" && condition(message)) {
    msg = msg.slice(4);
    console.log(msg);
    if (msg.slice(0, 8) == "question") {
      const q = msg.slice(9);
      questionArr.push({
        question: q,
        author: {
          name: message.author.username,
          id: message.author.id
        },
        likes: [],
        id: idCounter
      });
      message.channel.send(`Thanks for your question! Your question was recorded with ID #${nf(idCounter, 2)}.`);
      idCounter++;
    } else if (msg.slice(0, 4) == "list") {
      for (const q of questionArr) {
        message.channel.send(`Question #${nf(q.id, 2)}:
${q.question}
:+1: ${q.likes.length}`);
      }
    } else if (msg.slice(0, 4) == "like") {
      let number = msg.slice(5);
      if (number[0] == "#") number = +number.slice(1);
      else                  number = +number;
      like(message, number, false, "Sorry, you already liked this question! To avoid spam, I only allow 1 like per person per question!", "Sorry, the ID you specified doesn't belong to any question! :(");
    } else if (msg.slice(0, 6) == "unlike") {
      let number = msg.slice(7);
      if (number[0] == "#") number = +number.slice(1);
      else                  number = +number;
      like(message, number, true, "Sorry, you can't take back a non-existant like!", "Sorry, the ID you specified doesn't belong to any question! :(");
    } else if (msg.slice(0, 6) == "delete") {
      let number = msg.slice(7);
      if (number[0] == "#") number = +number.slice(1);
      else                  number = +number;
      let question = null;
      let idx = -1;
      for (let i = 0; i < questionArr.length; i++) {
        if (questionArr[i].id == number) {
          question = questionArr[i];
          idx = i;
          break;
        }
      }
      // TODO: Refactor
      if (question) {
        if (question.author.id == message.author.id || modsOrMe.includes(message.author.name)) {
          questionArr.splice(idx, 1);
          message.channel.send("Successfully deleted question!");
        } else {
          message.channel.send("You do not have permission to delete this question!");
        }
      } else {
        message.channel.send("Sorry, the ID you specified doesn't belong to any question! :(");
      }
    } else if (msg.slice(0, 4) == "help") {
      message.channel.send(`\`qar!question <question>\` => Ask a quetion with text \`<question>\`. I will reply with the ID number of the question.
\`qar!like <id>\` => Like the question with ID \`<id>\`.
\`qar!list\` => Get a list of all the questions, sorted by likes.
\`qar!delete <id>\` => Delete the question with id \`<id>\`. Unless you are a mod or Simon, you can only delete one of your questions.
\`qar!help\` => Well...you see what it does.
http://questionbot-discord.herokuapp.com => Website with a "nice" list of all the questions, sorted by likes. It live-updates!`);
    }
  }
});

client.login(process.env.BOT_TOKEN);

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/questions/:removeId", (request, response) => {
  if (request.params.removeId) {
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
