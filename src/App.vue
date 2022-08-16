<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <Navbar />
  </header>

  <RouterView />
</template>

<style>
@import "./assets/css/base.css";
</style>

<script>
import Navbar from './components/generic/Navbar.vue';

export default {
  name: "App",
  components: {
    Navbar
  },
};
</script>