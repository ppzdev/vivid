<script setup lang="ts">
import RequiredMaterials from './RequiredMaterials.vue'
import {useRoute, useRouter} from "vue-router"
import {computed} from "vue"

defineProps<{
  isEquipment?: boolean
  isSkill?: boolean
  isWeapon?: boolean
}>()

const equipments = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']
const skills = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']
const weapons = ['白', '緑', '青', '紫', '橙']

const currentUrl = new URL(window.location.href)

const route = useRoute()
const router = useRouter()
if (route.name === 'Top') {
  if (
      currentUrl.searchParams.get('equipments_counts') ||
      currentUrl.searchParams.get('skill_counts') ||
      currentUrl.searchParams.get('weapon_counts')
  ) {
    router.push({
      name: 'Resource',
      query: route.query,
    })
  } else {
    useRouter().push({ name: 'Jusoko' })
  }
}

const initialUrl = computed(() :string => {
  let initialUrl = new URL(window.location.href)
  const hash = window.location.hash
  initialUrl.search = ''
  initialUrl.hash = hash !== '#/' ? hash : '/resource_calculator'
  return initialUrl.toString()
})
</script>

<template>
  <h1 class="mb-4">
    <a
        :href="initialUrl"
        class="text-2xl text-blue-600 font-bold border-b border-b-blue-200"
    >素材数計算ツール</a>
    <span class="block">〜 素材あといくついるの？ 〜</span>
  </h1>
  <RequiredMaterials
      v-if="isEquipment"
      title="パーツ"
      name="equipments"
      :needs="3"
      :ranks="equipments"
      :default-rank-index="9"
  />
  <RequiredMaterials
      v-if="isSkill"
      title="スキル"
      name="skill"
      :needs="3"
      :ranks="skills"
      :is-piece-enabled="true"
      :default-rank-index="6"
  />
  <RequiredMaterials
      v-if="isWeapon"
      title="装備材料"
      :needs="4"
      name="weapon"
      :ranks="weapons"
      :default-quantity="70"
      :default-rank-index="4"
  />
</template>

<style scoped>
header {
  line-height: 1.5;
}

</style>
