<template>
    <header>
        <div class="header-container">
            <div class="titlebook">
                <router-link to="/" class="home-link"><h1>bookcase.com</h1></router-link>
            </div>
            <div class="top">
                <form action="#" class="search-form">
                    <input type="text" id="search-input" class="search-input" placeholder="Buscar...">
                </form>
                <div class="auth-buttons">
                    <router-link to="/login" class="login">Log In</router-link>
                    <router-link to="/cadastro" class="signup">Sign Up</router-link>
                </div>
            </div>
        </div>
    </header>
</template>