<template>
  <div id="app">
    <IndexComponent /> <!-- Adicionando o componente IndexComponent aqui -->
  </div>
</template>

<script>
import IndexComponent from './components/IndexComponent.vue'; // Importando o novo componente

export default {
  name: 'App',
  components: {
    IndexComponent // Registrando o novo componente
  }
}
</script>

<style>
/* Estilos globais do seu aplicativo */
</style>