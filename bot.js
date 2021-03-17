const discord = require('discord.js');

const { DeckEncoder } = require('runeterra');

const fs = require('fs');

const mysql = require("mysql");

var client = new discord.Client();

client.set1 = require("./cardsets/set1_data/set1.json");
client.set2 = require("./cardsets/set2_data/set2.json");
client.set3 = require("./cardsets/set3_data/set3.json");
client.set4 = require("./cardsets/set4_data/set4.json");
client.globals = require("./cardsets/core/globals.json");

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
    client.user.setActivity ("ld!help for commands");                                                                                                                                                                                                                                                                                                                                                         
});
          
client.on("message", (message) => {

    if(message.author.bot) return; 

    var nomeCanal = "lor-decks";

    const prefix = "ld!";

    const embeded = new discord.MessageEmbed().setColor("#fcc603");

    const msg = message.content.toLowerCase();

    var region22 = client.globals["regions"][0].name;

    if(msg.startsWith(prefix+"teste")){
        var result = client.set1.filter( obj => obj.region === 'Shadow Isles' && obj.cardCode=="01SI042")[0];
        console.log(result.name);   
    }

    
    if(msg.startsWith(prefix+"coisa")){
        for(let z = 0;z<client.globals["regions"].length;z++){
            if(client.globals["regions"][z]["abbreviation"]=="PZ"){
                console.log(client.globals["regions"][z]["name"]);
            }
        }
    }
    
    if(msg.startsWith(prefix+"setupbot")){

        var found = false;

        message.guild.channels.cache.find((channel) => { 
            if(channel.name === nomeCanal){
                message.channel.send(
                embeded.setTitle("Error")
                .setDescription("The bot is already setup " + message.guild.channels.cache.get(channel.id).toString())
                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                .setFooter("If you neeed help use ld!help for more commands")
                .setTimestamp()
                );
                found = true;
            }
        });

        if(found!=true){
            message.guild.channels.create("lor decks").then((chanel) => {
                message.channel.send(
                    embeded.setTitle("Bot Setup")
                    .setDescription("The bot was succefully setup " + message.guild.channels.cache.get(chanel.id).toString())
                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                    .setFooter("If you neeed help use ld!help for more commands")
                    .setTimestamp()
                )
            });  
        }

    }

    else if(msg.startsWith(prefix+"deck")){
        if(message.channel.name==nomeCanal){
            const deck = DeckEncoder.decode(message.content.replace(prefix+"deck",''));
            
            var cardNames = new Array;

            var cardCount = new Array;

            var printDeck = new Array;

            var set1Length = client.set1.length;
            var set2Length = client.set2.length;
            var set3Length = client.set3.length;
            var set4Length = client.set4.length;

            for(let i = 0;i<deck.length;i++){
                
                switch(deck[i].set){
                    case 1:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set1.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                console.log(result.name); 
                                cardNames.push(result.name);
                                cardCount.push(deck[i].count);
                                break;
                            }
                        }
                    break;
                    case 2:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set2.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                console.log(result.name); 
                                cardNames.push(result.name);
                                cardCount.push(deck[i].count);
                                break;
                            }
                        }
                    break;
                    case 3:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set3.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                console.log(result.name); 
                                cardNames.push(result.name);
                                cardCount.push(deck[i].count);
                                break;
                            }
                        }
                    break;
                    case 4:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set4.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                console.log(result.name); 
                                cardNames.push(result.name);
                                cardCount.push(deck[i].count);
                                break;
                            }
                        }
                    break;
                    default: break;
                }
            }

            for(let i = 0; i<cardNames.length; i++){
                for(let j = 0; i<cardCount.length; j++){
                    var info = cardNames[i] + " | Nº " + cardCount[j];
                    printDeck.push(info);
                }
            }


            console.log(cardNames);
            console.log(cardCount);
            console.log(printDeck);
            console.log(deck);
            message.channel.send(
                embeded.setTitle("Deck")
                .setDescription(printDeck)
                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                .setFooter("If you neeed help use ld!help for more commands")
                .setTimestamp()
            );

        } else {
            if(lorDeckChannelId!=0){
                message.channel.send(
                    embeded.setTitle("Error")
                    .setDescription("To use this command you need to be in the " + message.guild.channels.cache.get(lorDeckChannelId()).toString() + " channel")
                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                    .setFooter("If you neeed help use ld!help for more commands")
                    .setTimestamp()
                );
            } else {
                message.channel.send(
                    embeded.setTitle("Error")
                    .setDescription("To use the bot you need to set it up")
                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                    .setFooter("If you neeed help use ld!help for more commands")
                    .setTimestamp()
                );
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