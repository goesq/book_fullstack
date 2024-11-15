<template>
    <main>
        <div class="login-container">
            <form action="#" method="post" class="login-form">
                <h2 class="form-title">Entre na sua conta</h2>
                <div class="form-group">
                    <label for="username">Nome de usuário</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <a href="forgetpassword.html" class="forgot-password">Esqueceu a senha?</a>
                </div>
                <button type="submit" class="login-btn">Entrar</button>
            </form>
        </div>
    </main>
</template>