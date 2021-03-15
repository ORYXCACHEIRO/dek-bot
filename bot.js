const discord = require('discord.js');

var client = new discord.Client();

var nomeCanal = "lor-decks";

client.login("ODE5NjU4Mjc1MDAzMDM5NzU1.YEp0QQ.Jagcb3mbIZQDB4_bk9Tan06JyE8");

client.on("ready", () => {
    console.log("Bot ready and online (and updated as well)");
    client.user.setActivity ("Being a good bot");                                                                                                                                                                                                                                                                                                                                                         
});
          
client.on("message", async (message) => {

    const {member, content, guild, channel} = message;

    if(message.author.bot) return; 

    const prefix = "ld!";

    const embeded = new discord.MessageEmbed().setColor("#fcc603");

    const verificaCanal = guild.channels.cache.find((channel) => { 
        if(channel.name === nomeCanal){
            return true;
        } else {
            message.reply(channel.name);
            return false;
        }
    });
    

    if(message.content==prefix+"setupbot"){
        if(verificaCanal!=true){
            message.guild.channels.create("LOR DECKS").then(ch => {
                channel_Id = ch.id;
            });
            message.reply("Bot is setup");
        }
        else {
            message.reply("The bot was already setup");
        }
    }

    

});