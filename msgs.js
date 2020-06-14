function nf(num, digits) {
    let str = "" + num;
    while (str.length < digits) {
        str = "0" + str;
    }
    return str;
}

module.exports = {
    help: `\`qar!question <question>\` => Ask a quetion with text \`<question>\`. I will reply with the ID number of the question.
\`qar!like <id>\` => Like the question with ID \`<id>\`.
\`qar!unlike <id>\` => Take back your like from the question with ID \`<id>\`.
\`qar!list\` => Get a list of all the questions, sorted by likes.
\`qar!delete <id>\` => Delete the question with id \`<id>\`. Unless you are a mod or Simon, you can only delete one of your questions.
\`qar!help\` => Well...you see what it does.
http://questionbot-discord.herokuapp.com => Website with a "nice" list of all the questions, sorted by likes. It live-updates!`,
    question: (ques) => `Question #${nf(ques.id, 2)}:\n${ques.question}\n+1: ${ques.likes.length}`,
    addSuccess: (id) => `Thanks for your question! Your question was recorded with ID #${nf(id, 2)}.`,
    relike: "Sorry, you already liked this question! To avoid spam, I only allow 1 like per person per question!",
    quesNotFound: "Sorry, the ID you specified doesn't belong to any question! :(",
    nonExistLike: "Sorry, you can't take back a non-existant like!",
    permDel: "You do not have permission to delete this question!",
    delSuccess: "Successfully deleted question!",
}