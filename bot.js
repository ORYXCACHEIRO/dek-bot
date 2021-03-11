const discord = require('discord.js');

var client = new discord.Client();

const token = "ODE5NjU4Mjc1MDAzMDM5NzU1.YEp0QQ.Jagcb3mbIZQDB4_bk9Tan06JyE8";

client.on("ready", () => {
    console.log("ready");
    client.user.setActivity ("Being a good bot");
});
          
client.on("message", async (message) => {

    if(message.author.bot){
        return;
    } 

    msg = message.content.toLowerCase();

    if(message.content=="hello"){
        message.reply("Aqui tens os comandos");
    }

});