document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bookForm').addEventListener('submit', addBook);
    fetchBooks();
  });
  
  function fetchBooks() {
    fetch('/api/book')
      .then(response => response.json())
      .then(data => {
        const booksContainer = document.getElementById('book');
        booksContainer.innerHTML = '';
        data.forEach(book => {
          const bookDiv = document.createElement('div');
          bookDiv.textContent = `${book.title} - ${book.author}`;
          booksContainer.appendChild(bookDiv);
  
          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.onclick = () => editBook(book);
          bookDiv.appendChild(editButton);
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.onclick = () => deleteBook(book._id);
          bookDiv.appendChild(deleteButton);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
  
    fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(data => {
      alert('Libro agregado exitosamente');
      fetchBooks();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function editBook(book) {
    const newTitle = prompt('Nuevo Título', book.title);
    const newAuthor = prompt('Nuevo Autor', book.author);
  
    fetch(`/api/book/${book._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title: newTitle, author: newAuthor })
    })
    .then(response => response.json())
    .then(data => {
      alert('Libro actualizado exitosamente');
      fetchBooks();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function deleteBook(bookId) {
    fetch(`/api/book/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      alert('Libro eliminado exitosamente');
      fetchBooks();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }