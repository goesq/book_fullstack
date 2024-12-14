# Bookcase.com | 📚

**Bookcase.com** é uma aplicação web que funciona como uma biblioteca digital, permitindo a gestão de livros e usuários através de um sistema CRUD (Criar, Ler, Atualizar e Deletar). O projeto utiliza Vue.js (Vue/Vite) no frontend e Node.js com Express no backend, com integração ao MongoDB para armazenamento de dados.

## Tecnologias Utilizadas

### Frontend
- **Vue.js**: Framework JavaScript progressivo para construir interfaces de usuário.
- **Vite**: Ferramenta de build e bundler de última geração para o Vue.js.
- **Vuex**: Gerenciamento de estado centralizado.
- **Vue Router**: Navegação entre páginas.
- **HTML5/CSS3**: Estrutura e estilo das páginas.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework minimalista e flexível para Node.js.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **Bcrypt**: Biblioteca para hash de senhas e criptografia.
- **JWT (JSON Web Token)**: Sistema de autenticação baseado em tokens.
- **Multer**: Middleware para upload de arquivos (como imagens de livros).
- **Cors**: Habilita CORS (Cross-Origin Resource Sharing).
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Body-parser**: Middleware para análise de corpos de requisição HTTP.

## Funcionalidades

### Frontend
- **Gestão de Livros**: O usuário pode adicionar, editar e excluir livros.
- **Gestão de Usuários**: Cadastro, login e perfil de usuário.
- **Busca de Livros**: Sistema de busca simples para encontrar livros na biblioteca.
- **Autenticação e Autorização**: Utiliza JWT para autenticação de usuários.

### Backend
- **API CRUD para Livros**: Endpoints para criação, leitura, atualização e exclusão de livros.
- **API CRUD para Usuários**: Endpoints para registro, login e gerenciamento de usuários.
- **Proteção de Rotas**: Rotas sensíveis exigem autenticação via JWT.
- **Upload de Imagens**: Os livros podem ter imagens associadas, com upload utilizando Multer.

## Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB (local ou em serviço como MongoDB Atlas)

### Passos para Rodar Localmente

1. Clone o repositório:
```bash
   git clone https://github.com/seu-usuario/bookcase.com.git
   cd bookcase.com 
```

2. Instale as dependências do backend:
 ```bash
   cd backendex
   npm install
```

3. Instale as dependências do frontend:
 ```bash
cd library
npm install
```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `backend` com as variáveis necessárias. Exemplo de variáveis de ambiente:

```bash
MONGO_URI=mongodb://localhost:27017/bookcase
JWT_SECRET=seu-segredo
PORT=5000
```

5. Inicie o servidor backend:
```bash
cd backend
npm start
```

6. Inicie o servidor frontend:
```bash
cd frontend
npm run dev
```
7. Seguir link do terminal, e ser feliz :D


 



