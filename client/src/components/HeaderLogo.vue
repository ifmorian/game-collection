<template>
  <div class="header-logo" @click="this.$router.push('/')">
    <div class="header-logo-game"><span class="color-red">G</span>ame</div>
    <div><span class="color-blue">C</span>ollection</div>
  </div>
</template>

<style scoped>
  .header-logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    font-family: 'Tannenberg';
    font-size: 2vw;

    cursor: pointer;
  }

  .header-logo-game {
    margin-bottom: -20%;
  }
</style>