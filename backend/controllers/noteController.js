const Note = require('../models/Note');

exports.createNote = async (req, res) => {
    const { title, content, tags, color } = req.body;

    const note = new Note({
        user: req.user._id,
        title,
        content,
        tags,
        color,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
};

exports.getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id, trash: false });
    res.json(notes);
};

exports.getNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

exports.updateNote = async (req, res) => {
    const { title, content, tags, color, archived, reminder } = req.body;
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        note.title = title;
        note.content = content;
        note.tags = tags;
        note.color = color;
        note.archived = archived;
        note.reminder = reminder;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

exports.deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
        note.trash = true;
        await note.save();
        res.json({ message: 'Note moved to trash' });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

exports.getArchivedNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id, archived: true });
    res.json(notes);
};

exports.getTrashNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id, trash: true });
    res.json(notes);
};

exports.getNotesByTag = async (req, res) => {
    const notes = await Note.find({ user: req.user._id, tags: req.params.tag });
    res.json(notes);
};
