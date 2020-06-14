const input = require("input");
const { execCmd } = require("./bot");
let msg = {
    author: {
        name: "Test",
        id: "01"
    }
};

(async () => {
    while (true) {
        let cmd = await input.text(">");
        console.log(execCmd("qar!" + cmd, msg));
    }
})()