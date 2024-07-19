document.addEventListener('DOMContentLoaded', function() {
    fetchNotes();

    document.getElementById('new-note-btn').addEventListener('click', createNewNote);
    document.getElementById('search-btn').addEventListener('click', searchNotes);
    document.getElementById('archived-btn').addEventListener('click', viewArchivedNotes);
    document.getElementById('trash-btn').addEventListener('click', viewTrashNotes);
    document.getElementById('reminder-btn').addEventListener('click', viewReminders);
});

function fetchNotes() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';
            data.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `
                    <div class="note-header">
                        <button class="archive-note" data-id="${note._id}">Archive</button>
                        <button class="trash-note" data-id="${note._id}">Trash</button>
                    </div>
                    <p>${note.content}</p>
                `;
                notesContainer.appendChild(noteDiv);
            });

            document.querySelectorAll('.archive-note').forEach(button => {
                button.addEventListener('click', function() {
                    console.log(`Archiving note with ID: ${this.dataset.id}`);
                    archiveNote(this.dataset.id);
                });
            });
            document.querySelectorAll('.trash-note').forEach(button => {
                button.addEventListener('click', function() {
                    console.log(`Trashing note with ID: ${this.dataset.id}`);
                    trashNote(this.dataset.id);
                });
            });
        })
        .catch(error => console.error('Error fetching notes:', error));
}

function createNewNote() {
    const noteContent = prompt('Enter your note content:');
    if (noteContent) {
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContent, tags: [], color: '', archived: false, trashed: false }),
        })
        .then(response => response.json())
        .then(data => {
            fetchNotes();
        })
        .catch(error => console.error('Error creating note:', error));
    }
}

function searchNotes() {
    const searchTerm = prompt('Enter search term:');
    if (searchTerm) {
        fetch(`/api/notes?search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';
            data.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `<p>${note.content}</p>`;
                notesContainer.appendChild(noteDiv);
            });
        })
        .catch(error => console.error('Error searching notes:', error));
    }
}

function viewArchivedNotes() {
    fetch('/api/notes?archived=true')
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';
            data.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `<p>${note.content}</p>`;
                notesContainer.appendChild(noteDiv);
            });
        })
        .catch(error => console.error('Error fetching archived notes:', error));
}

function viewTrashNotes() {
    fetch('/api/notes?trashed=true')
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';
            data.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `<p>${note.content}</p>`;
                notesContainer.appendChild(noteDiv);
            });
        })
        .catch(error => console.error('Error fetching trashed notes:', error));
}

function viewReminders() {
    fetch('/api/notes?reminder=true')
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';
            data.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `<p>${note.content}</p>`;
                notesContainer.appendChild(noteDiv);
            });
        })
        .catch(error => console.error('Error fetching reminders:', error));
}

function archiveNote(noteId) {
    fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ archived: true }),
    })
    .then(response => response.json())
    .then(data => {
        fetchNotes();
    })
    .catch(error => console.error('Error archiving note:', error));
}

function trashNote(noteId) {
    fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trashed: true }),
    })
    .then(response => response.json())
    .then(data => {
        fetchNotes();
    })
    .catch(error => console.error('Error trashing note:', error));
}
