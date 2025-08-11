<script setup lang="ts">
import NavMenu from "./NavMenu.vue"
import AppFooter from "./AppFooter.vue"
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
