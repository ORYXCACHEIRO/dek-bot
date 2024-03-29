const discord = require('discord.js');

const { DeckEncoder } = require('runeterra');

const fs = require('fs');

const mongoose = require('mongoose');

//BD FILES---------------------------------------

const deckData = require("./BDtables/decks.js");
const users = require("./BDtables/users.js");

//------------------------------------------------

var client = new discord.Client();

//CARDS AND REGIONS BY SET-------------------------------

client.set1 = require("./cardsets/set1_data/set1.json");
client.set2 = require("./cardsets/set2_data/set2.json");
client.set3 = require("./cardsets/set3_data/set3.json");
client.set4 = require("./cardsets/set4_data/set4.json");
client.globals = require("./cardsets/core/globals.json");

//---------------------------------------------------------

client.login(process.env.DISCORD_CLIENT);

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( console.log("BD is connected"));

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

    if(msg==prefix+"help"){
        message.channel.send(
            embeded.setTitle("Bot Help commands")
            .setDescription( "---------`General Commands`---------\n"+
                            "\n"+prefix+"`setupbot` - setup a channel for you to use the bot\n" + 
                            prefix+"`register` - register yourself to upload and share deck codes in the server\n"+
                            prefix+"`card` + `cardname` - search a card\n"+
                            prefix+"`deck` + `deckcode` - decode a deck and see what cards it contains\n"+
                            "\n---------`Profile Commands`---------\n"+
                            "\n"+prefix+"`profile` - see your profile alongside the decks you uploaded\n"+
                            prefix+"`updeck` + `deckcode` - upload a deck to your profile\n"+
                            prefix+"`deletedeck` + `iddeck` - delete one of your decks\n"+
                            prefix+"`deckname` + `iddeck` + `new name` - change name of one of your decks\n"+
                            prefix+"`profiledeck` + `iddeck` - see one of your decks\n" +
                            prefix+"`deleteprofile` - delete your profile alongside your decks\n"+
                            prefix+"`shprofile` +  `username` - search for profile of a registered user\n" +
                            prefix+"`seedeck` + `deckid` + `username` - search a deck on another registered user")
            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
            .setFooter("If you neeed help use ld!help for more commands")
            .setTimestamp()
        );
    }
    
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
        if(message.channel.name==nomeCanal){
            users.findOne({
                iduser: message.author.id
            }, (err, data) => {
                if(err) console.log(err);
                if(!data){
                    const newUser = new users({
                        iduser : message.author.id,
                    });
                    newUser.save().catch(err => console.log(err));
                    message.channel.send(
                        embeded.setTitle("User register is `complete`")
                        .setDescription("You can now upload and share decks with others")
                        .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                        .setFooter("If you neeed help use ld!help for more commands")
                        .setTimestamp()
                    );
                } else {
                    message.channel.send(
                        embeded.setTitle("You are already `registered`")
                        .setDescription("One cannot register twice with the same account")
                        .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                        .setFooter("If you neeed help use ld!help for more commands")
                        .setTimestamp()
                    );
                }
            });
        } else{
            wrongChannel();
        }
    }
    
    else if(msg==prefix+"profile"){
        if(message.channel.name==nomeCanal){
            users.findOne({
                iduser : message.author.id
            }, (err, data) => {
                if(err) console.log(err);
                if(!data){
                    notRegistered();
                } else {
                    deckData.find({
                        iduser: message.author.id
                    }, (err, data) => {
                        if(err) console.log(err)
                        if(data.length>0){
                            var info = new Array;

                            for(let i = 0;i<data.length;i++){
                                var det = "["+ i +"] - " + data[i].deckName;
                                info.push(det);
                            }
                            info.unshift("`DECK ID` | `DECK NAME`")//PASSA A PRIMEIRA POSIÇÃO

                            message.channel.send(
                                embeded.setTitle("`Profile` " + message.author.username)
                                .setDescription(info)
                                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                .setFooter("If you neeed help use ld!help for more commands")
                                .setTimestamp()
                            );

                        } else {
                            message.channel.send(
                                embeded.setTitle("`Profile` " + message.author.username)
                                .setDescription("You haven't upload any deck yet")
                                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                .setFooter("If you neeed help use ld!help for more commands")
                                .setTimestamp()
                            );
                        }
                    });
                }
            });
        } else {
            wrongChannel();
        }
    } 

    else if(msg==prefix+"deleteprofile"){
        if(message.channel.name==nomeCanal){
            users.findOne({
                iduser: message.author.id
            }, (err,data) => {
                if(err) console.log(err);
                if(!data){
                    notRegistered();
                } else {
                    deckData.deleteMany({
                        iduser: message.author.id
                    }, (err) => {
                        if(err){
                            console.log(err);
                        } else{
                            users.deleteOne({
                                iduser: message.author.id
                            }, (err) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    message.channel.send(
                                        embeded.setTitle("Profile")
                                        .setDescription("Your profile has been `successfully deleted`")
                                        .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                        .setImage(cardImg)
                                        .setFooter("If you neeed help use ld!help for more commands")
                                        .setTimestamp()
                                    );
                                }
                            });
                        }
                    });
                }
            })
        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"profiledeck")){
        if(message.channel.name==nomeCanal){

            let deckId = message.content.replace(prefix+"profiledeck",'');
            deckId.replace(/\d/g,'');

            users.findOne({
                iduser : message.author.id
            }, (err, data) => {
                if(err) console.log(err);
                if(!data){
                    notRegistered();
                } else {
                    deckData.find({
                        iduser: message.author.id
                    }, (err, data) => {
                        if(err) console.log(err);
                        if(data.length>0){
                            let found = false;
                            for(let i = 0;i<data.length;i++){
                                if(i==deckId){      
                                    found = true;
                                    getDeck(data[i].deck);
                                    break;
                                }
                            }
                            if(found==false){
                                errorFindingDeck();
                            }
                        } else {
                            errorFindingDeck();
                        }
                    })
                }
            });

        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"seedeck")){
        if(message.channel.name==nomeCanal){
            let userName = message.content.replace(prefix+"seedeck",'');
            userName = userName.replace(/\d+/g,'');
            userName = userName.replace(/\s/g,'');
            // /\d+/g regex for getting only characters
            // /\s/g regex for removing spaces

            let deckId = message.content.replace(prefix+"seedeck",'');
            deckId = deckId.replace(/[^0-9]/g,'');
            // /[^0-9]/g regex for getting only numbers from string

            let user = client.users.cache.find(u => u.username.replace(/\s/g,'') == userName);

            if(typeof user ==="undefined"){
                errorFindingUser();
            } else {
                users.findOne({
                    iduser : user.id
                }, (err, data) => {
                    if(err) console.log(err);
                    if(!data){
                        errorFindingUser();
                    } else {
                        deckData.find({
                            iduser : user.id
                        }, (err,data) => {
                            if(err) console.log(err);
                            if(data.length>0){
                                let found = false;
                                for(let i = 0; i<data.length;i++){
                                    if(i==deckId){
                                        found = true;
                                        getDeck(data[i].deck);
                                        break;
                                    }
                                }
                                if(found==false){
                                    errorFindingDeck();
                                }
                            } else {
                                message.channel.send(
                                    embeded.setTitle("`Profile` " + userId.username)
                                    .setDescription("This user hasn't created any decks yet")
                                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                    .setFooter("If you neeed help use ld!help for more commands")
                                    .setTimestamp()
                                );
                            }
                        });
                    }
                });
            }

        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"shprofile")){
        if(message.channel.name==nomeCanal){
            let userName = message.content.replace(prefix+"shprofile",'');
            userName = userName.replace(/\d+/g,'');
            userName = userName.replace(/\s/g,'');

            let userId = client.users.cache.find(u => u.username.replace(/\s/g,'') == userName);

            if(typeof userId ==="undefined"){
                errorFindingUser();
            } else {
                users.findOne({
                    iduser : userId.id
                }, (err, data) => {
                    if(err) console.log(err);
                    if(!data){
                        errorFindingUser();
                    } else {
                        deckData.find({
                            iduser: userId.id
                        }, (err, data) => {
                            if(err) console.log(err)
                            if(data.length>0){
                                var info = new Array;
    
                                for(let i = 0;i<data.length;i++){
                                    var det = "["+ i +"] - " + data[i].deckName;
                                    info.push(det);
                                }
                                info.unshift("`DECK ID` | `DECK NAME`")//PASSA A PRIMEIRA POSIÇÃO
    
                                message.channel.send(
                                    embeded.setTitle("`Profile` " + userId.username)
                                    .setDescription(info)
                                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                    .setFooter("If you neeed help use ld!help for more commands")
                                    .setTimestamp()
                                );
    
                            } else {
                                message.channel.send(
                                    embeded.setTitle("`Profile` " + userId.username)
                                    .setDescription("This user hasn't created any decks yet")
                                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                    .setFooter("If you neeed help use ld!help for more commands")
                                    .setTimestamp()
                                );
                            }
                        });
                    }
                });
            }
            

        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"updeck")){
        if(message.channel.name==nomeCanal){

            let deck = null;

            let deckCodeee = message.content.replace(prefix+"updeck",'');
            deckCodeee.replace(/\s/g,'');

            try{
                deck = DeckEncoder.decode(deckCodeee);
            }catch(err){
                if(err!=""){
                    deck = new Array;
                }
            }

            if(deck.length>3){

                let deckNamee = "";

                for(let i = 0;i<deck.length;i++){
                    
                    switch(deck[i].set){
                        case 1:
                            for(let z = 0;z<client.globals["regions"].length;z++){
                                if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                    var result = client.set1.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                    if(result.rarity=="Champion"){
                                        deckNamee += result.name;
                                        break;
                                    }
                                }
                            }
                        break;
                        case 2:
                            for(let z = 0;z<client.globals["regions"].length;z++){
                                if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                    var result = client.set2.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                    if(result.rarity=="Champion"){
                                        deckNamee += result.name;
                                        break;
                                    }
                                }
                            }
                        break;
                        case 3:
                            for(let z = 0;z<client.globals["regions"].length;z++){
                                if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                    var result = client.set3.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                    if(result.rarity=="Champion"){
                                        deckNamee += result.name;
                                        break;
                                    }
                                }
                            }
                        break;
                        case 4:
                            for(let z = 0;z<client.globals["regions"].length;z++){
                                if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                    var result = client.set4.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                    if(result.rarity=="Champion"){
                                        deckNamee += result.name;
                                        break;
                                    }
                                }
                            }
                        break;
                        default: break;
                    }
                }

                users.findOne({
                    iduser: message.author.id
                }, (err, data) => {
                    if(err) console.log(err);
                    if(!data){
                        notRegistered();
                    } else {
                        deckData.find({
                            iduser : message.author.id
                        }, (err, data) => {
                            if(err) console.log(err);
                            if(data.length+1<=15){

                                const newDeck = new deckData({
                                    deck: message.content.replace(prefix+"updeck",''),
                                    deckName: deckNamee.split(" ").toString(),
                                    iduser: message.author.id,
                                });

                                newDeck.save().catch(err => console.log(err));

                                message.channel.send(
                                    embeded.setTitle("Deck uploaded `successfully`")
                                    .setDescription("You can now see and share your deck with others in the server")
                                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                    .setFooter("If you neeed help use ld!help for more commands")
                                    .setTimestamp()
                                );

                            } else {
                                message.channel.send(
                                    embeded.setTitle("`Error` uploading deck")
                                    .setDescription("You can't upload more than 15 decks")
                                    .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                    .setFooter("If you neeed help use ld!help for more commands")
                                    .setTimestamp()
                                );
                            }
                        });
                    }
                });
            }
            else {
                deckCodeInvalid();
            }
            
        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"deletedeck")){
        if(message.channel.name==nomeCanal){

            let deleteDeckId = message.content.replace(prefix+"deletedeck",'');
            deleteDeckId = deleteDeckId.replace(/\d/g,'');
            
            users.findOne({
                iduser: message.author.id
            }, (err, data) => {
                if(err) console.log(err)
                if(!data){
                    notRegistered();
                } else {
                    deckData.find({
                     iduser : message.author.id   
                    }, (err,data) => {
                        if(err) console.log(err)
                        if(data.length>0){
                            var deleteDeckCode = "";
                            for(let i = 0; i<data.length;i++){
                                if(i==deleteDeckId){
                                    deleteDeckCode = data[i].deck;
                                }
                            }
                            if(deleteDeckCode!=""){
                                deckData.deleteOne({
                                    deck : deleteDeckCode
                                }, (err, data) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        message.channel.send(
                                            embeded.setTitle("Deck")
                                            .setDescription("Your deck has been `successfully deleted`")
                                            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                            .setImage(cardImg)
                                            .setFooter("If you neeed help use ld!help for more commands")
                                            .setTimestamp()
                                        );
                                    }
                                });
                            } else {
                                errorFindingDeck();
                            }
                            
                        } else {
                            errorFindingDeck();
                        }
                    })
                }
            })
        } else {
            wrongChannel();
        }
    }

    else if(msg.startsWith(prefix+"deckname")){
        if(message.channel.name==nomeCanal){
            let deckId = message.content.replace(prefix+"deckname",'');
            let deckNamee = message.content.replace(prefix+"deckname",'');
            deckId = deckId.replace(/[^0-9]/g, '');
            deckNamee = deckNamee.replace(/[^a-zA-Z]+/g,'');

            console.log(deckId);
            console.log(deckNamee);

            if(deckNamee!="" && deckNamee.length<50){
                users.findOne({
                    iduser : message.author.id
                }, (err, data) => {
                    if(err) console.log(err);
                    if(!data){
                        notRegistered();
                    } else {
                        deckData.find({
                            iduser: message.author.id
                        }, (err, data) => {
                            if(err) console.log(err);
                            if(data.length>0){
                                let valid = false;

                                for(let i = 0;i<data.length;i++){
                                    if(parseInt(deckId)==i){
                                        console.log(i);
                                        console.log(data[i].deck);
                                        valid = true;
                                        deckData.updateOne({
                                            deck: data[i].deck
                                        }, {
                                            deckName: deckNamee
                                        }).then(
                                            message.channel.send(
                                            embeded.setTitle("Deck")
                                            .setDescription("Deck name has been `successfully updated` to " + deckNamee)
                                            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                                            .setFooter("If you neeed help use ld!help for more commands")
                                            .setTimestamp()
                                            )
                                        );
                                        break;
                                    }
                                }
                                if(valid==false){
                                    errorFindingDeck();
                                }
                            } else {
                                errorFindingDeck();
                            }
                        });
                    }
                });
            } else {
                errorFindingDeck();
            }

        } else {
            wrongChannel();
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
                        embeded.setTitle(cardName + " `Level Up`")
                        .setDescription("")
                        .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                        .setImage(cardChampLvl1Img)
                        .setFooter("If you neeed help use ld!help for more commands")
                        .setTimestamp()
                    );   
                }
                if(cardChampLvl2Img!=""){
                    message.channel.send(
                        embeded.setTitle(cardName + " `Level GROSSO`")
                        .setDescription("")
                        .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                        .setImage(cardChampLvl2Img)
                        .setFooter("If you neeed help use ld!help for more commands")
                        .setTimestamp()
                    );
                }
                
            } else {
                message.channel.send(
                    embeded.setTitle("Error")
                    .setDescription("The card you tried to search `doesn't exist`")
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
            let deck = message.content.replace(prefix+"deck",'');
            deck.replace(/\s/g,'');
            
            getDeck(deck);
            
            
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

    function deckCodeInvalid(){
        message.channel.send(
            embeded.setTitle("Error uploading deck")
            .setDescription("The code for the deck is `invalid`")
            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
            .setFooter("If you neeed help use ld!help for more commands")
            .setTimestamp()
        );
    }

    function getDeck (deckCode){

        let printDeck = new Array;

        let deck = null;

        try{
            deck = DeckEncoder.decode(deckCode);
        }catch(err){
            if(err!=""){
                deck = new Array;
            }
        }

        if(deck.length>3){

            for(let i = 0;i<deck.length;i++){
            
                switch(deck[i].set){
                    case 1:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set1.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.cost + " | " + result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    case 2:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set2.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.cost + " | " + result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    case 3:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set3.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.cost + " | " + result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    case 4:
                        for(let z = 0;z<client.globals["regions"].length;z++){
                            if(client.globals["regions"][z]["abbreviation"]==deck[i].faction.shortCode){
                                var result = client.set4.filter( obj => obj.region === client.globals["regions"][z]["name"] && obj.cardCode==deck[i].code)[0];
                                let info = result.cost + " | " + result.name + " | " + deck[i].count;
                                printDeck.push(info);
                                break;
                            }
                        }
                    break;
                    default: break;
                }
            }

            printDeck.sort();
            printDeck.unshift("`MANA` | `CARTA` | `Nº DE CARTAS`");
            printDeck.push("\n `Code`: " + deckCode);

            message.channel.send(
                embeded.setTitle("Deck")
                .setDescription(printDeck)
                .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
                .setFooter("If you neeed help use ld!help for more commands")
                .setTimestamp()
            );
            
        } else {
            deckCodeInvalid();
        }
    }

    function notRegistered(){
        message.channel.send(
            embeded.setTitle("Error")
            .setDescription("To execute this command you need to be `registered`")
            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
            .setFooter("If you neeed help use ld!help for more commands")
            .setTimestamp()
        );
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

    function errorFindingDeck(){
        message.channel.send(
             embeded.setTitle("Error")
            .setDescription("This deck `isn't valid` or you `dont have any decks created`")
            .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
            .setFooter("If you neeed help use ld!help for more commands")
            .setTimestamp()
        );
    }

    function errorFindingUser(){
        message.channel.send(
            embeded.setTitle("Error")
           .setDescription("This user `isn't registered` or `doesn't exist`")
           .setThumbnail("https://static.wikia.nocookie.net/leagueoflegends/images/2/2c/Legends_of_Runeterra_icon.png/revision/latest?cb=20191020214918")
           .setFooter("If you neeed help use ld!help for more commands")
           .setTimestamp()
       );
    }

});