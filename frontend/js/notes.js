document.addEventListener('DOMContentLoaded', async () => {
    const notesContainer = document.getElementById('notes-container');
    const token = localStorage.getItem('token');

    const res = await fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const notes = await res.json();

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerText = note.content;
        notesContainer.appendChild(noteElement);
    });
});
