<script setup>
  import HeaderLogo from '../components/HeaderLogo.vue';
  import NavBar from '../components/NavBar.vue';
  import ProfileBar from '../components/ProfileBar.vue'
</script>

<template>
  <header class="header">
    <HeaderLogo class="header-logo" />
    <NavBar class="header-nav" />
    <ProfileBar class="header-profile" />
  </header>
</template>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: start;

    width: 100%;
    height: 5vw;
    
    padding: 0 2%;

    border-bottom: 2px solid var(--color-border);
  }

  .header-nav {
    margin-left: 1em;
  }

  .header-profile {
    margin-left: auto;
  }
</style>