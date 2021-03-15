const discord = require('discord.js');

var client = new discord.Client();

client.login("ODE5NjU4Mjc1MDAzMDM5NzU1.YEp0QQ.Jagcb3mbIZQDB4_bk9Tan06JyE8");

var channel_Id = "";

client.on("ready", () => {
    console.log("Bot ready and online (and updated as well)");
    client.user.setActivity ("Being a good bot");                                                                                                                                                                                                                                                                                                                                                         
});
          
client.on("message", (message) => {

    if(message.author.bot) return; 

    if(message.content=="setupbot"){
       message.guild.channels.create("LOR DECKS").then(ch => {
           channel_Id = ch.id; 
       });
    }
    if(message.content=="id"){
        message.require(channel_Id);
    } 

});