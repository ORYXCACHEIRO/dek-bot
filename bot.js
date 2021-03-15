const discord = require('discord.js');

var client = new discord.Client();

var channel_Id = "";

var createChannels = new discord.CategoryChannel();

client.login("ODE5NjU4Mjc1MDAzMDM5NzU1.YEp0QQ.Jagcb3mbIZQDB4_bk9Tan06JyE8");

client.on("ready", () => {
    console.log("Bot ready and online (and updated as well)");
    client.user.setActivity ("Being a good bot");           
    
    
});
          
client.on("message", (message) => {
   
    if(message.author.bot) return; 

    const prefix = "ld!";

    const embeded = new discord.MessageEmbed().setColor("#fcc603");

    if(message.content==prefix+"setupbot"){
        
    }

});