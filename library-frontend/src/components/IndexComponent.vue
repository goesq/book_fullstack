<template>
 <header>
        <div class="header-container">
            <div class="titlebook">
                <a href="../html/index.html" class="home-link">
                    <h1>bookcase.com</h1>
                </a>
                
            </div>
            <div class="top">
                <form action="#" class="search-form">
                    <input type="text" id="search-input" class="search-input" placeholder="Buscar...">
                </form>
                <div class="auth-buttons">
                    <a href="../html/login.html" class="login">Log In</a>
                    <a href="../html/cadastro.html" class="signup">Sign Up</a>
                </div>
            </div>
        </div>
        <h1 class="highlight-title">ESTANTE<br> ONLINE</h1>
    </header>
  <div>
    <section class="book-highlight">
      <article v-for="book in books" :key="book.id" class="book">
        <div class="book-cover">
          <img :src="book.cover" :alt="book.title">
        </div>
        <div class="book-details">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-author">{{ book.author }}</p>
          <a href="#" class="reserve-btn">Reservar</a>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexComponent', // Nome do componente deve ser multi-word
  data() {
    return {
      books: [
        { id: 1, title: 'Elon Musk', author: 'Isaacson, Walter', cover: '../img/elon.png' },
        { id: 2, title: 'Os Códigos do Milhão', author: 'Marçal, Pablo', cover: '../assets/img/marcal.png' },
        { id: 3, title: 'Sobrevivendo no Inferno', author: 'Racionais', cover: '../img/racionais.png' },
        { id: 4, title: 'Nunca Deixe de Tentar', author: 'Jordan, Michael', cover: '../img/jordan.png' },
        { id: 5, title: 'É Assim que Acaba', author: 'Hoover, Colleen', cover: '../img/hoover.png' },
        { id: 6, title: 'Como Convencer Alguém em 90 Segundos', author: 'Boothman, Nicholas', cover: '../img/90sec.png' },
        { id: 7, title: 'Do Mil ao Milhão', author: 'Nigro, Thiago', cover: '../img/primorico.png' },
        { id: 8, title: 'O Homem mais Rico da Babilônia', author: 'Clason, George', cover: '../img/babilonia.png' },
        { id: 9, title: 'O Menino Mágico', author: 'Queiroz, Rachel de', cover: '../img/meninomagico.png' }
      ]
    };
  }
}
</script>

<style src="../assets/css/main.css"></style>
<style src="../assets/css/styles.css"></style>

