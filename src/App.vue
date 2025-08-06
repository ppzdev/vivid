<script setup>
import RequiredMaterials from './components/RequiredMaterials.vue'
import Footer from "@/components/Footer.vue";

const equipments = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']
const skills = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']
const weapons = ['白', '緑', '青', '紫', '橙']
</script>

<template>
  <header>
  </header>
  <h1 class="mb-4">
    <a
        href="."
        class="text-2xl text-blue-600 font-bold border-b border-b-blue-200"
    >素材あといくついるの？</a>
  </h1>
  <main>
    <RequiredMaterials
        title="部品"
        name="equipments"
        :needs="3"
        :ranks="equipments"
        :default-rank-index="9"
    />
    <RequiredMaterials
        title="スキル"
        name="skill"
        :needs="3"
        :ranks="skills"
        :is-piece-enabled="true"
        :default-rank-index="6"
    />
    <RequiredMaterials
        title="装備材料"
        :needs="4"
        name="weapon"
        :ranks="weapons"
        :default-quantity="70"
        :default-rank-index="4"
    />
  </main>

  <Footer></Footer>
</template>

<style scoped>
header {
  line-height: 1.5;
}

</style>
