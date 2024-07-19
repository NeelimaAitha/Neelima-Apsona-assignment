const express = require('express');
const {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getArchivedNotes,
    getTrashNotes,
    getNotesByTag,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').get(protect, getNoteById).put(protect, updateNote).delete(protect, deleteNote);
router.route('/archived').get(protect, getArchivedNotes);
router.route('/trash').get(protect, getTrashNotes);
router.route('/tag/:tag').get(protect, getNotesByTag);

module.exports = router;
