const discord = require('discord.js');

const DeckEncoder  = require('runeterra');

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

    const msg = message.content.toLowerCase();

    var encontrou = encontrarCanal();
    
    if(msg==prefix+"setupbot"){      

        if(encontrou!=true){
            message.guild.channels.create("lor decks").then(ch => {
                channel_Id = ch.id;
            });
            message.reply("Bot is setup");
        }

    }

    else if(msg==prefix+"deck" && message.guild.channels.cache.get(canalId)){
        const deck = DeckEncoder.decode('CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL');
        message.reply(deck);
    }

    function encontrarCanal(){
        message.guild.channels.cache.find((channel) => { 
            if(channel.name === nomeCanal){
                message.reply("The bot is already setup " + message.guild.channels.cache.get(channel.id).toString());
                return true;
            } else {
                return null;
            }
        });
    }

    function canalId(){
        message.guild.channels.cache.find((channel) => { 
            if(channel.name===nomeCanal){
                return channel.id;
            }
        });
    }

    

});