<template>
  <div> <!-- Elemento raiz adicionado aqui -->
      <header>
          <h2 class="form-title2">EDITAR</h2>
      </header>

      <main class="edit-profile-container">
          <form class="edit-profile-form">
              <h2 class="edit-profile-title">Edite seu perfil</h2>

              <div class="form-group">
                  <label for="name">Nome de Usuário</label>
                  <input type="text" id="name" name="name">
              </div>

              <div class="form-group">
                  <label for="password">Senha</label>
                  <input type="password" id="password" name="password">
              </div>

              <button type="submit" class="save-btn">Save Changes</button>
              <button type="button" class="cancel-btn">Cancel</button>
          </form>
      </main>
  </div> <!-- Fim do elemento raiz -->
</template>

<style>
  .edit-profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 300px);
      background-color: #f4f4f4;
      padding: 2rem;
  }

  .edit-profile-form {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 40px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
  }

  .edit-profile-title {
      font-size: 1.8em;
      margin-bottom: 1.5rem;
      text-align: center;
      color: #333;
      font-family: "Inter", sans-serif;
  }

  .form-group {
      margin-bottom: 1rem;
  }

  .form-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
  }

  .form-group input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 40px;
  }

  .save-btn {
      display: block;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 40px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  .save-btn:hover {
      background-color: #0056b3;
  }

  .cancel-btn {
      display: block;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      color: #333;
      background-color: #f4f4f4;
      border: 1px solid #ccc;
      border-radius: 40px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: background-color 0.3s ease, color 0.3s ease;
  }

  .cancel-btn:hover {
      background-color: #eaeaea;
      color: #000;
  }

  .form-title2 {
      font-size: 2.5em;
      margin-bottom: 1rem;
      text-align: center;
      color: #1068c7;
      font-family: "Dela Gothic One", sans-serif;
      padding: 20px;
  }
</style>