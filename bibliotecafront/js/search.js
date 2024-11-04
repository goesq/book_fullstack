document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const books = document.querySelectorAll('.book');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        books.forEach(book => {
            const title = book.querySelector('.book-title').textContent.toLowerCase();
            const author = book.querySelector('.book-author').textContent.toLowerCase();

            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                book.style.display = 'block'; // Mostra o livro
            } else {
                book.style.display = 'none'; // Oculta o livro e remove do fluxo do layout
            }
        });
    });
});