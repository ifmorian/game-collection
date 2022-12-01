<script setup>
import { RouterView } from 'vue-router';
import HeaderView from './views/HeaderView.vue';
</script>

<template>
  <HeaderView />
  <main>
    <RouterView class="router-view" />
  </main>
</template>

<script>
export default {
  mounted() {
    this.$updateSession();
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  margin-bottom: 3vw;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
