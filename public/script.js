(() => {
  let approval = "-";
  let right = false;

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
      const response = await fetch(`/questions/${params}/${approval}`);
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
        let crossImg;
        if (right) {
          crossImg = document.createElement("IMG");
          crossImg.src = "cross.png";
          crossImg.style.width = "12px";
          crossImg.className = "cross";
        }
        const questionDiv = document.createElement("DIV");
        questionDiv.className = "question";
        questionDiv.appendChild(idDiv);
        questionDiv.appendChild(qDiv);
        questionDiv.appendChild(likesDiv);
        if (right) questionDiv.appendChild(crossImg);
        questions.appendChild(questionDiv);
        if (right) {
          crossImg.onclick = () => {
            questions.removeChild(questionDiv);
            params = q.id;
          }
        }
      }
    }, 1000);
  }

  getQuestions();

  dialog.style.display = "none";
  modorme.onclick = () => {
    dialog.style.display = "block";
    submit.onclick = async () => {
      if (secret.value == "") {
        error.textContent = "The text box is required.";
      } else {
        const response = await fetch("/check", {
          method: "POST",
          body: JSON.stringify({
            secret: secret.value
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        if (data.right) {
          dialog.style.display = "none";
          approval = secret.value;
          right = true;
        } else {
          error.innerHTML = "Sorry, what you entered is <em>not</em> the secret.";
        }
      }
    }
    nah.onclick = () => {
      dialog.style.display = "none";
    }
  }
})();
