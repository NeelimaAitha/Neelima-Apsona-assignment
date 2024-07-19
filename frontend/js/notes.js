document.addEventListener('DOMContentLoaded', async () => {

    // Function to fetch notes from backend (example)
    async function fetchNotes() {
        try {
            const response = await fetch('/api/notes');
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching notes:', error);
            // Handle error (e.g., show error message to user)
        }
    }

    // Create New Note Button
    const newNoteBtn = document.getElementById('new-note-btn');
    newNoteBtn.addEventListener('click', async () => {
        // Example: Show a modal or form for creating a new note
        console.log('New Note button clicked!');
        // Add logic to display a form or modal for creating a new note
        // Example: Show a modal
        const modal = document.getElementById('new-note-modal');
        modal.style.display = 'block';
    });

    // Save New Note Button (inside the modal)
    const saveNoteBtn = document.getElementById('save-note-btn');
    saveNoteBtn.addEventListener('click', async () => {
        // Example: Handle form submission to create a new note
        const noteTitle = document.getElementById('note-title').value;
        const noteContent = document.getElementById('note-content').value;
        
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: noteTitle, content: noteContent })
            });
            if (!response.ok) {
                throw new Error('Failed to create new note');
            }
            console.log('New note created successfully');
            // Optionally, refresh the notes list or update UI
            fetchNotes(); // Example function to fetch notes again
        } catch (error) {
            console.error('Error creating new note:', error);
            // Handle error (e.g., show error message to user)
        }
    });

    // Edit Note Button (assuming each note has an edit button)
    const editNoteBtns = document.querySelectorAll('.edit-note-btn');
    editNoteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Example: Get note ID and redirect to edit page or show edit form
            const noteId = btn.dataset.noteId; // Assuming data attribute for note ID
            console.log(`Edit Note button clicked for note ID: ${noteId}`);
            // Add logic to fetch note details and display an edit form
            // Example: Fetch note details and populate edit form
            try {
                const response = await fetch(`/api/notes/${noteId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch note details');
                }
                const note = await response.json();
                // Example: Populate edit form fields
                document.getElementById('edit-note-title').value = note.title;
                document.getElementById('edit-note-content').value = note.content;
                // Show edit form or modal
                const editModal = document.getElementById('edit-note-modal');
                editModal.style.display = 'block';
            } catch (error) {
                console.error('Error fetching note details:', error);
                // Handle error (e.g., show error message to user)
            }
        });
    });

    // Save Edited Note Button (inside the edit modal)
    const saveEditedNoteBtn = document.getElementById('save-edited-note-btn');
    saveEditedNoteBtn.addEventListener('click', async () => {
        // Example: Handle form submission to save edited note
        const noteId = document.getElementById('edit-note-id').value;
        const editedTitle = document.getElementById('edit-note-title').value;
        const editedContent = document.getElementById('edit-note-content').value;

        try {
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editedTitle, content: editedContent })
            });
            if (!response.ok) {
                throw new Error('Failed to save edited note');
            }
            console.log('Edited note saved successfully');
            // Optionally, refresh the notes list or update UI
            fetchNotes(); // Example function to fetch notes again
        } catch (error) {
            console.error('Error saving edited note:', error);
            // Handle error (e.g., show error message to user)
        }
    });

    // Delete Note Button (assuming each note has a delete button)
    const deleteNoteBtns = document.querySelectorAll('.delete-note-btn');
    deleteNoteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Example: Confirm deletion and send DELETE request to backend
            const noteId = btn.dataset.noteId; // Assuming data attribute for note ID
            const confirmDelete = confirm('Are you sure you want to delete this note?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`/api/notes/${noteId}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete note');
                    }
                    console.log('Note deleted successfully');
                    // Optionally, refresh the notes list or update UI
                    fetchNotes(); // Example function to fetch notes again
                } catch (error) {
                    console.error('Error deleting note:', error);
                    // Handle error (e.g., show error message to user)
                }
            }
        });
    });

    // Search in Notes Button
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    searchBtn.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        // Example: Fetch notes that match the search term
        console.log(`Search for: ${searchTerm}`);
        // Add logic to fetch notes based on the search term
        try {
            const response = await fetch(`/api/notes/search?term=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to search notes');
            }
            const searchResults = await response.json();
            console.log('Search results:', searchResults);
            // Handle displaying search results in UI
        } catch (error) {
            console.error('Error searching notes:', error);
            // Handle error (e.g., show error message to user)
        }
    });

    // Toggle Background Color Button
    const toggleColorBtn = document.getElementById('toggle-color-btn');
    const noteContainer = document.querySelector('.note-container'); // Example selector
    toggleColorBtn.addEventListener('click', () => {
        // Example: Toggle between two background colors
        if (noteContainer.style.backgroundColor === 'white') {
            noteContainer.style.backgroundColor = 'yellow';
        } else {
            noteContainer.style.backgroundColor = 'white';
        }
    });

    // Archive Note Button (assuming each note has an archive button)
    const archiveNoteBtns = document.querySelectorAll('.archive-note-btn');
    archiveNoteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Example: Send request to backend to update note status to archived
            const noteId = btn.dataset.noteId; // Assuming data attribute for note ID
            try {
                const response = await fetch(`/api/notes/${noteId}/archive`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to archive note');
                }
                console.log('Note archived successfully');
                // Optionally, refresh the notes list or update UI
                fetchNotes(); // Example function to fetch notes again
            } catch (error) {
                console.error('Error archiving note:', error);
                // Handle error (e.g., show error message to user)
            }
        });
    });

    // Label View Button
    const labelViewBtn = document.getElementById('label-view-btn');
    labelViewBtn.addEventListener('click', async () => {
        // Example: Fetch notes with a specific tag or label
        const label = document.getElementById('label-select').value; // Assuming select input for label
        console.log(`Label View button clicked for label: ${label}`);
        // Add logic to fetch and display notes with a specific tag or label
        try {
            const response = await fetch(`/api/notes/label/${label}`);
            if (!response.ok) {
                throw new Error('Failed to fetch notes with label');
            }
            const labeledNotes = await response.json();
            console.log(`Notes with label ${label}:`, labeledNotes);
            // Handle displaying labeled notes in UI
        } catch (error) {
            console.error(`Error fetching notes with label ${label}:`, error);
            // Handle error (e.g., show error message to user)
        }
    });

    // Trash Note Button (assuming each note has a trash button)
    const trashNoteBtns = document.querySelectorAll('.trash-note-btn');
    trashNoteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Example: Confirm deletion and send DELETE request to backend
            const noteId = btn.dataset.noteId; // Assuming data attribute for note ID
            const confirmDelete = confirm('Are you sure you want to move this note to trash?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`/api/notes/${noteId}/trash`, {
                        method: 'PUT'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to move note to trash');
                    }
                    console.log('Note moved to trash successfully');
                    // Optionally, refresh the notes list or update UI
                    fetchNotes(); // Example function to fetch notes again
                } catch (error) {
                    console.error('Error moving note to trash:', error);
                    // Handle error (e.g., show error message to user)
                }
            }
        });
    });

});
