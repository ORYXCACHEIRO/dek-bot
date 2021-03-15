const discord = require('discord.js');

var client = new discord.Client();

var nomeCanal = "lor-decks";

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

        var found = false;

        message.guild.channels.cache.find((channel) => { 
            if(channel.name === nomeCanal){
                message.reply("The bot was already setup.");
                message.mentions(channel.name)
                found = true;
            } else {
                found = false;
            }
        });

        if(found!=true){
            message.guild.channels.create("lor decks").then(ch => {
                channel_Id = ch.id;
            });
            message.reply("Bot is setup");
        }

    }

    

});