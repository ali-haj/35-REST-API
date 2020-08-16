const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    date : String,
    time : String,
    title : String
})

module.exports = mongoose.model('notes',NotesSchema);
