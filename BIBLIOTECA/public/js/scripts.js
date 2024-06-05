document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', registerUser);
  }
  
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', loginUser);
  }

  if (document.getElementById('book')) {
    fetchBooks();
  }
});

//Registro de usuario
function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
    alert('Usuario registrado exitosamente');
    window.location.href = 'login.html';
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//Inicio de sesion
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    alert('Inicio de sesión exitoso');
    window.location.href = 'index.html';
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//buscar libro
function fetchBooks() {
  fetch('/api/books')
  .then(response => response.json())
    .then(data => {
      const booksContainer = document.getElementById('book');
      data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.textContent = `${book.title} - ${book.author} (${book.available ? 'Disponible' : 'Prestado'})`;
        
        booksContainer.appendChild(bookDiv);

        if (book.available) {
          const borrowButton = document.createElement('button');
          borrowButton.textContent = 'Prestar';
          borrowButton.onclick = () => borrowBook(book._id);
          bookDiv.appendChild(borrowButton);
        } else {
          const returnButton = document.createElement('button');
          returnButton.textContent = 'Devolver';
          returnButton.onclick = () => returnBook(book._id);
          bookDiv.appendChild(returnButton);

          const renewButton = document.createElement('button');
          renewButton.textContent = 'Renovar';
          renewButton.onclick = () => renewBook(book._id);
          bookDiv.appendChild(renewButton);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//Prestamo de libro
function borrowBook(bookId) {
  fetch(`/api/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ available: false })
  })
  .then(response => response.json())
  .then(data => {
    alert('Libro prestado exitosamente');
    window.location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//Devolver libro
function returnBook(bookId) {
  fetch(`/api/books/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ available: true })
  })
  .then(response => response.json())
  .then(data => {
    alert('Libro devuelto exitosamente');
    window.location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//Prestamo renovado
function renewBook(bookId) {
  // En este ejemplo, la renovación simplemente muestra un mensaje de éxito.
  // Puedes implementar una lógica más compleja según los requerimientos.
  alert('Préstamo renovado exitosamente');
}