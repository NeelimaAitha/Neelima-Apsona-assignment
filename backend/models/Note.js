const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], maxLength: 9 },
    color: { type: String, default: 'white' },
    archived: { type: Boolean, default: false },
    trash: { type: Boolean, default: false },
    reminder: { type: Date },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
