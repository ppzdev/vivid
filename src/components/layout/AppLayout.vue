<script setup lang="ts">
import NavMenu from "./NavMenu.vue"
import AppFooter from "./AppFooter.vue"
import {onMounted, onUnmounted} from "vue";

const touchstartHandler = () => {}

onMounted(() => {
  document.addEventListener('touchstart', touchstartHandler, true)
})

onUnmounted(() => {
  document.removeEventListener('touchstart', touchstartHandler, true)
})
</script>

<template>
  <nav>
    <nav-menu />
  </nav>
  <main>
    <router-view />
  </main>
  <footer>
    <app-footer/>
  </footer>
</template>
