<script setup>
import RequiredMaterials from './components/RequiredMaterials.vue'

const equipments = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']
const skills = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7']
const weapons = ['白', '緑', '青', '紫', '橙']
</script>

<template>
  <header>
  </header>
  <h1 class="text-2xl text-blue-600 font-bold border-b border-b-blue-200 mb-4">素材あといくついるの？</h1>
  <main>
    <RequiredMaterials title="部品" name="equipments" :needs="3" :ranks="equipments"/>
    <RequiredMaterials title="スキル" name="skill" :needs="3" :ranks="skills"/>
    <RequiredMaterials title="兵器庫材料" :needs="4" name="weapon" :ranks="weapons"/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

</style>
