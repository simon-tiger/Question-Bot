const msgs = require("./msgs");

const questionArr = [];
let idCounter = 1;
const NOTFOUND = Symbol();
const DENIED = Symbol();


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

function execCmd(input, message) {
  if (!input.startsWith("qar!")) return null;

  input = input.slice(4);
  for (const cmdName in cmds) {
    if (cmds.hasOwnProperty(cmdName) && input.startsWith(cmdName)) {
      return cmds[cmdName](input.slice(1 + cmdName.length), message);
    }
  }

  return null;
}

function parseQuesID(value) {
  if (value.startsWith("#")) {
    value = value.slice(1);
  }

  return parseInt(value);
}

const cmds =
{
  help: (_args, _message) => msgs.help,
  list: (_args, _message) => questionArr.map(msgs.question).join("\n\n"),
  question: (arg, message) => {
    questionArr.push({
      question: arg,
      author: {
        name: message.author.username,
        id: message.author.id
      },
      likes: [],
      id: idCounter
    });
    return msgs.addSuccess(idCounter++);
  },

  like: (arg, message) => {
    const quesID = parseQuesID(arg);
    const res = like(message.author, quesID, false);

    if (res === NOTFOUND) {
      return msgs.quesNotFound
    } else if (res === DENIED) {
      return msgs.relike;
    }
  },

  unlike: (arg, message) => {
    const quesID = parseQuesID(arg);
    const res = like(message.author, quesID, true);
    
    if (res === NOTFOUND) {
      return msgs.quesNotFound
    } else if (res === DENIED) {
      return msgs.nonExistLike;
    }
  },

  delete: (arg, message) => {
    const id = parseQuesID(arg);
    const idx = questionArr.findIndex(q => q.id == id);

    if (idx < 0) {
      return msgs.quesNotFound;
    }

    if (questionArr[idx].author.id != message.author.id && !modsOrMe.includes(message.author.name)) {
      return msgs.permDel;
    }

    questionArr.splice(idx, 1);
    return msgs.delSuccess;
  }
}

function like(author, quesID, toRemove) {
  const question = questionArr.find(q => q.id == quesID);

  if (question === undefined) {
    return NOTFOUND;
  }

  // already liked
  if (question.likes.includes(author.id) && !toRemove) {
    return DENIED;
  }

  if (toRemove) {
    const idx = question.likes.indexOf(author.id);
    if (idx >= 0) question.likes.splice(idx, 1);
    else return DENIED;
  } else {
    question.likes.push(author.id);
  }

  questionArr.sort((a, b) => {
    if (a.likes.length == b.likes.length) return a.id - b.id;
    else return b.likes.length - a.likes.length;
  });
}


module.exports = {
  execCmd,
  parseQuesID,
  cmds,
  questionArr
}