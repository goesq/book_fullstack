<template>
    <div> <!-- Elemento raiz adicionado aqui -->
        <header>
            <h1 class="highlight-title">ESTANTE<br> ONLINE</h1>
        </header>

        <main>
            <section class="book-highlight">
                <article class="book" v-for="book in books" :key="book.title">
                    <div class="book-cover">
                        <img :src="book.image" :alt="book.title">
                    </div>
                    <div class="book-details">
                        <h2 class="book-title">{{ book.title }}</h2>
                        <p class="book-author">{{ book.author }}</p>
                        <a href="#" class="reserve-btn">Reservar</a>
                    </div>
                </article>
            </section>
        </main>
    </div> <!-- Fim do elemento raiz -->
</template>

<script>
<template>
    <div> <!-- Elemento raiz adicionado aqui -->
        <header>
            <h1 class="highlight-title">ESTANTE<br> ONLINE</h1>
        </header>

        <main>
            <section class="book-highlight">
                <article class="book" v-for="book in books" :key="book.title">
                    <div class="book-cover">
                        <img :src="book.image" :alt="book.title">
                    </div>
                    <div class="book-details">
                        <h2 class="book-title">{{ book.title }}</h2>
                        <p class="book-author">{{ book.author }}</p>
                        <a href="#" class="reserve-btn">Reservar</a>
                    </div>
                </article>
            </section>
        </main>
    </div> <!--Fim do elemento raiz-- >
</template >

    <script>
        export default {
            data() {
        return {
            books: books: [
        {
            title: "Elon Musk",
        author: "Isaacson, Walter",
        image: "../src/assets/img/elon.png"
    },
        {
            title: "Os Códigos do Milhão",
        author: "Marçal, Pablo",
        image: "../src/assets/img/marcal.png"
    },
        {
            title: "Sobrevivendo no Inferno",
        author: "Racionais",
        image: "../src/assets/img/racionais.png"
    },
        {
            title: "Nunca Deixe de Tentar",
        author: "Jordan, Michael",
        image: "../src/assets/img/jordan.png"
    },
        {
            title: "É Assim que Acaba",
        author: "Hoover, Colleen",
        image: "../src/assets/img/hoover.png"
    },
        {
            title: "Como Convencer Alguém em 90 Segundos",
        author: "Boothman, Nicholas",
        image: "../src/assets/img/90sec.png"
    },
        {
            title: "Do Mil ao Milhão",
        author: "Nigro, Thiago",
        image: "../src/assets/img/primorico.png"
    },
        {
            title: "O Homem mais Rico da Babilônia",
        author: "Clason, George",
        image: "../src/assets/img/babilonia.png"
    },
        {
            title: "O Menino Mágico",
        author: "Queiroz, Rachel de",
        image: "../src/assets/img/meninomagico.png"
    }
        ]
        };
    }
};
</script>

<style scoped>
.book-highlight {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.book {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    width: calc(25% - 1rem);
    /* Ajusta a largura dos artigos */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centraliza o conteúdo horizontalmente */
    text-align: center;
    /* Centraliza o texto */
}

.book-cover {
    display: flex;
    /* Usar flexbox para centralizar o conteúdo */
    justify-content: center;
    /* Centraliza horizontalmente a imagem */
    align-items: center;
    /* Centraliza verticalmente a imagem */
    overflow: hidden;
    background-color: #eaeaea;
    width: 120px;
    height: 180px;
    margin-bottom: 1rem;
}

.book-cover img {
    width: auto;
    height: 100%;
    object-fit: cover;
}

.book-details {
    text-align: center;
}

.book-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.book-author {
    color: #555;
}

.reserve-btn {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: 1px solid #1068c7;
    border-radius: 4px;
    background-color: #0e5fb4;
    transition: background-color 0.3s ease, transform 0.3s ease;
    display: inline-block;
}

.reserve-btn:hover {
    background-color: #094d96;
    transform: scale(1.05);
}
</style>
</script>

<style scoped>
.book-highlight {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.book {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    width: calc(25% - 1rem);
    /* Ajusta a largura dos artigos */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centraliza o conteúdo horizontalmente */
    text-align: center;
    /* Centraliza o texto */
}

.book-cover {
    display: flex;
    /* Usar flexbox para centralizar o conteúdo */
    justify-content: center;
    /* Centraliza horizontalmente a imagem */
    align-items: center;
    /* Centraliza verticalmente a imagem */
    overflow: hidden;
    background-color: #eaeaea;
    width: 120px;
    height: 180px;
    margin-bottom: 1rem;
}

.book-cover img {
    width: auto;
    height: 100%;
    object-fit: cover;
}

.book-details {
    text-align: center;
}

.book-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.book-author {
    color: #555;
}

.reserve-btn {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: 1px solid #1068c7;
    border-radius: 4px;
    background-color: #0e5fb4;
    transition: background-color 0.3s ease, transform 0.3s ease;
    display: inline-block;
}

.reserve-btn:hover {
    background-color: #094d96;
    transform: scale(1.05);
}
</style>