<template>
  <div class="main">
    <NavBar class="nav-bar" />
    <ShowMap class="map" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ShowMap from '@/components/ShowMap.vue'

export default {
  name: 'App',
  components: {
    ShowMap,
    NavBar
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Cervino-BoldNeue";
  src: local("Cervino-BoldNeue"),
   url(./fonts/Cervino/Cervino-BoldNeue.ttf) format("truetype");
}
@font-face {
  font-family: "Cervino-RegularNeue";
  src: local("Cervino-RegularNeue"),
   url(./fonts/Cervino/Cervino-RegularNeue.ttf) format("truetype");
}
*{
  font-family: 'Cervino-BoldNeue';
}
.main {
  background-image: url('./assets/Background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
.row {
  margin: 0;
}
.map {
  padding: 0 !important;
}
.nav-bar {
  height: 50px;
}
</style>
