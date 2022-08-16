<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <Navbar />
  </header>

  <RouterView />

  <div class="modal" id="modal__info" data-modal-name="infos-modal" data-modal-dismiss>
    <div class="modal__content" id="modal__info__content"></div>
  </div>
</template>

<style>
@import "./assets/css/base.css";
</style>

<script>
import initModal from './assets/js/modal';
import Navbar from './components/generic/Navbar.vue';

initModal();

export default {
  name: "App",
  components: {
    Navbar
  },
};
</script>