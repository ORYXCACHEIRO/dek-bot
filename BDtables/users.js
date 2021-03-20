const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    iduser: String
})

module.exports = mongoose.model("users", dataSchema);