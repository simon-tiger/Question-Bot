//console.log(questions);

function nf(num, digits) {
  let str = "" + num;
  while (str.length < digits) {
    str = "0" + str;
  }
  return str;
}

async function getQuestions() {
  let params = -1;
  setInterval(async () => {
    const response = await fetch(`/questions/${params}`);
    const questionArr = await response.json();
    questions.innerHTML = "";
    if (params) params = -1;
    for (const q of questionArr) {
      const idDiv = document.createElement("DIV");
      idDiv.textContent = "#" + nf(q.id, 2);
      idDiv.className = "id";
      const qDiv = document.createElement("DIV");
      qDiv.textContent = q.question;
      qDiv.className = "q";
      const likesDiv = document.createElement("DIV");
      likesDiv.textContent = "👍 " + q.likes.length;
      likesDiv.className = "q";
      const crossImg = document.createElement("IMG");
      crossImg.src = "cross.png";
      crossImg.style.width = "12px";
      crossImg.className = "cross";
      const questionDiv = document.createElement("DIV");
      questionDiv.className = "question";
      questionDiv.appendChild(idDiv);
      questionDiv.appendChild(qDiv);
      questionDiv.appendChild(likesDiv);
      questionDiv.appendChild(crossImg);
      questions.appendChild(questionDiv);
      crossImg.onclick = () => {
        questions.removeChild(questionDiv);
        params = q.id;
      }
    }
  }, 1000);
}

getQuestions();
