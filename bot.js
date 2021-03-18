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
    
    if(msg==prefix+"setupbot"){

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

    else if(msg==prefix+"register"){
        if(message.channel==nomeCanal){
            //faz coisas
        } else{
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"teste")){
        var messageee = message.content.replace(prefix+"teste","").toLowerCase().substring(1);
        
        var coisa2 = "twisted fate";
        var result = client.set4.filter( obj => obj.name.toLowerCase() == messageee);
        console.log(result);
        if(result.length==0){
            console.log(coisa2);
            console.log(messageee + "gay");
        }
        
   }

    else if(msg.startsWith(prefix+"card")){
        if(message.channel.name==nomeCanal){
            var card = message.content.replace(prefix+"card","").toLowerCase().substring(1);
            var cardName = "";
            var cardImg = "";

            var cardChampLvl1Img = "";
            var cardChampLvl2Img = "";

            var numset = 4;

            for(let i = 1;i<=numset;i++){
                switch(i){
                    case 1: 
                        var result = client.set1.filter( obj => obj.name.toLowerCase()==card);
                        if(result.length>0){
                            if(result[0].rarity=="Champion"){
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                cardChampLvl1Img = result[1].assets[0].gameAbsolutePath;
                                break;
                            }
                            else {
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                break;
                            }   
                        }
                        break;
                    case 2: 
                        var result = client.set2.filter( obj => obj.name.toLowerCase()==card);
                        if(result.length>0){
                            if(result[0].rarity=="Champion"){
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                cardChampLvl1Img = result[1].assets[0].gameAbsolutePath;
                                break;
                            }else {
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                break;
                            } 
                        }
                    break;
                    case 3: 
                        var result = client.set3.filter( obj => obj.name.toLowerCase()==card);
                        if(result.length>0){
                            if(result[0].rarity=="Champion"){
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                cardChampLvl1Img = result[1].assets[0].gameAbsolutePath;
                                break;
                            }else {
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                break;
                            } 
                        }
                    break;
                    case 4: 
                        var result = client.set4.filter( obj => obj.name.toLowerCase()==card);
                        if(result.length>0){
                            if(result[0].rarity=="Champion" && result[0].subtype=="ASCENDED"){
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                cardChampLvl1Img = result[2].assets[0].gameAbsolutePath;
                                cardChampLvl2Img = result[1].assets[0].gameAbsolutePath; 
                                break;
                            } 
                            else if(result[0].rarity=="Champion" && result[0].subtype!="ASCENDED"){
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                cardChampLvl1Img = result[1].assets[0].gameAbsolutePath;
                                break;
                            }
                            else {
                                cardName = result[0].name;
                                cardImg = result[0].assets[0].gameAbsolutePath;
                                break;
                            } 
                        }
                    break;
                    default: break;
                }
            }

            if(cardName!="" && cardImg!=""){
                message.channel.send(
                    embeded.setTitle(cardName)
                    .setDescription("")
                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                    .setImage(cardImg)
                    .setFooter("If you neeed help use ld!help for more commands")
                    .setTimestamp()
                );
                if(cardChampLvl1Img!=""){
                    message.channel.send(
                        embeded.setTitle(cardName + " Level Up")
                        .setDescription("")
                        .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                        .setImage(cardChampLvl1Img)
                        .setFooter("If you neeed help use ld!help for more commands")
                        .setTimestamp()
                    );
                    if(cardChampLvl2Img!=""){
                        message.channel.send(
                            embeded.setTitle(cardName + "Level GROSSO")
                            .setDescription("")
                            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                            .setImage(cardChampLvl2Img)
                            .setFooter("If you neeed help use ld!help for more commands")
                            .setTimestamp()
                        );
                    }
                }
                
            } else {
                message.channel.send(
                    embeded.setTitle("Error")
                    .setDescription("The card you tried to search doesn't exist")
                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                    .setFooter("If you neeed help use ld!help for more commands")
                    .setTimestamp()
                );
            }

            
        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"deck")){
        if(message.channel.name==nomeCanal){
            const deck = DeckEncoder.decode(message.content.replace(prefix+"deck",''));

            var printDeck = new Array;

            printDeck.push("CARTA | Nº DE CARTAS");

            for(let i = 0;i<deck.length;i++){
                
                switch(deck[i].set){
                    case 1:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set1.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    case 2:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set2.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    case 3:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set3.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    case 4:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set4.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    default: break;
                }
            }

            message.channel.send(
                embeded.setTitle("Deck")
                .setDescription(printDeck)
                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                .setFooter("If you neeed help use ld!help for more commands")
                .setTimestamp()
            );

        } else {
            wrongChannel();
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

    function wrongChannel(){
        //se canal existir
        if(lorDeckChannelId!=0){
            message.channel.send(
                embeded.setTitle("Error")
                .setDescription("To use this command you need to be in the " + message.guild.channels.cache.get(lorDeckChannelId()).toString() + " channel")
                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                .setFooter("If you neeed help use ld!help for more commands")
                .setTimestamp()
            );
        } 
        //se cananl ainda nao existir
        else {
            message.channel.send(
                embeded.setTitle("Error")
                .setDescription("To use the bot you need to set it up")
                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                .setFooter("If you neeed help use ld!help for more commands")
                .setTimestamp()
            );
        }
        
    }

});