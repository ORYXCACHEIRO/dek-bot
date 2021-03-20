const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    deck: String,
    deckName: String,
    iduser: String
})

module.exports = mongoose.model("decks", deckSchema);