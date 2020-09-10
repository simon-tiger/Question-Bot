# Question Bot
A "question-answering round" Discord bot.
Client ID to add to your Discord server: `715519484848504864`

## Commands
* `qar!question <question>` Ask a question (with text `<question>`). The bot will reply with the ID number of the question.
* `qar!like <id>` Like/Upvote the question with ID number `<id>`.
* `qar!list` List all of the questions, sorted by number of likes.
* `qar!delete <id>` Delete the question with ID number `<id>`. Unless you're a mod or me, you will only be able to delete one of your questions.

## Website
See a "nice" list of all the questions here: http://questionbot-discord.herokuapp.com

## TODO
- [x] Question command
- [x] Like command
  - [x] Unlike command
  - [ ] Like with Reactions
- [x] List command
- [x] Website
- [x] Help command
- [x] Delete command
  - [ ] Permissions
    - [x] From Discord
    - [ ] From Website
- [ ] Route for all NEW questions, not all questions
- [ ] Make it fancy, I guess?
