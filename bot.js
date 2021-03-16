const discord = require('discord.js');

const { DeckEncoder } = require('runeterra');

const mysql = require("mysql");

var client = new discord.Client();

var con = mysql.createConnection({
    host: "sql11.freesqldatabase.com",
    user: "sql11399230",
    password: "Qz2uiayKDC",
    database: "sql11399230"
});

con.connect(err =>{
    if(err) throw err;
    console.log("Connected to DB");
});

client.login("ODE5NjU4Mjc1MDAzMDM5NzU1.YEp0QQ.Jagcb3mbIZQDB4_bk9Tan06JyE8");

client.on("ready", () => {
    console.log("Bot ready and online (and updated as well)");
    client.user.setActivity ("Being a good bot");                                                                                                                                                                                                                                                                                                                                                         
});
          
client.on("message", (message) => {

    if(message.author.bot) return; 

    var nomeCanal = "lor-decks";

    const prefix = "ld!";

    const embeded = new discord.MessageEmbed().setColor("#fcc603");

    const msg = message.content.toLowerCase();
    
    if(msg==prefix+"setupbot"){

        var found = false;

        message.guild.channels.cache.find((channel) => { 
            if(channel.name === nomeCanal){
                message.reply("The bot is already setup " + message.guild.channels.cache.get(channel.id).toString());
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

    else if(msg==prefix+"deck"){
        if(message.channel.name==nomeCanal){
            const deck = DeckEncoder.decode('CMCACAYFAQBAEBIBAYBAIBYDDIDACBILCQKROIRKAIAQCBIHAICAOOJ3AEAQCBID');
            message.reply(deck);
        } else {
            if(lorDeckChannelId!=0){
                message.reply("To execute this command you need to be on " + message.guild.channels.cache.get(lorDeckChannelId()).toString());
            } else {
                message.reply("To execute you need to setup the bot first");
            }
        }  
    }

    function lorDeckChannelId(){
        let idd = 0; 
        message.guild.channels.cache.find((channel) => { 
            if(channel.name === nomeCanal){
                idd = channel.id;    
            }
        });
        return idd;
    }

});