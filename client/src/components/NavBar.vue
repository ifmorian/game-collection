<template>
  <ul class="nav">
    <li @click="this.$router.push('/lobby')">Lobby</li>
    <li @click="this.$router.push('/games')">Games</li>
  </ul>
</template>

<style scoped>
  @import '../assets/styles/nav-x.css';
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 10em;
    height: 100%;

    font-size: 1.4em;
  }
</style>