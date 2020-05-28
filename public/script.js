//console.log(questions);

function nf(num, digits) {
  let str = "" + num;
  while (str.length < digits) {
    str = "0" + str;
  }
  return str;
}

async function getQuestions() {
  setInterval(async () => {
    const response = await fetch("/questions");
    const questionArr = await response.json();
    questions.innerHTML = "";
    for (const q of questionArr) {
      const idDiv = document.createElement("DIV");
      idDiv.textContent = "#" + nf(q.id, 2);
      idDiv.className = "id";
      const qDiv = document.createElement("DIV");
      qDiv.textContent = q.question;
      qDiv.className = "q";
      const likesDiv = document.createElement("DIV");
      likesDiv.textContent = "👍 " + q.likes;
      likesDiv.className = "q";
      const questionDiv = document.createElement("DIV");
      questionDiv.className = "question";
      questionDiv.appendChild(idDiv);
      questionDiv.appendChild(qDiv);
      questionDiv.appendChild(likesDiv);
      questions.appendChild(questionDiv);
    }
  }, 1000);
}

getQuestions();
