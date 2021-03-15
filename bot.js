const discord = require('discord.js');

var client = new discord.Client();

client.login("ODE5NjU4Mjc1MDAzMDM5NzU1.YEp0QQ.Jagcb3mbIZQDB4_bk9Tan06JyE8");

client.on("ready", () => {
    console.log("Bot ready and online (and updated as well)");
    client.user.setActivity ("Being a good bot");                                                                                                                                                                                                                                                                                                                                                         
});
          
client.on("message", (message) => {

    var channel_Id = "";

    if(message.author.bot) return; 

    const prefix = "ld!"

    const embeded = new discord.MessageEmbed().setColor("#fcc603");

    if(message.content==prefix+"setupbot"){
        if(channel_Id!=""){
            message.guild.channels.create("LOR DECKS").then(ch => {
                channel_Id = ch.id;
            });
        }
       else {
           message.reply("The bot was already setup");
       }
    }

});