<script setup lang="ts">
import AppFooter from "./AppFooter.vue";
import {ref} from "vue";

const isShowMenu = ref<boolean>(false)
const menus = [
  {
    group: "素材数計算ツール",
    links: [
      {
        name: 'Resource/equipment',
        title: 'パーツ',
        sub: '速10',
      },
      {
        name: 'Resource/skill',
        title: 'スキル',
        sub: '専用7',
      },
      {
        name: 'Resource/weapon',
        title: '兵種材料',
        sub: '橙装備',
      },
    ]
  },
  {
    group: "シミュレーター",
    links: [
      {
        name: 'Jusoko',
        title: '重装甲空母の宝物',
        sub: null,
      },
    ]
  },
]
</script>

<template>
  <nav>
    <button
        class="border border-gray-300 bg-white p-2 rounded-sm float-right relative cursor-pointer z-50"
        type="button"
        @click.prevent="isShowMenu = !isShowMenu"
    >
      <svg class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="-0.2 -0.2 2.4 2.4">
        <path d="M0 0H2M0 1H2M0 2H2" stroke="#333333" stroke-width="0.4" fill="none"/>
      </svg>

    </button>
    <transition name="fade">
      <div v-if="isShowMenu" class="border border-gray-300 bg-gray-100 absolute top-3 right-3 z-40">
        <h2 class="px-4 py-3.5 border-b border-b-gray-300 font-bold">Menu</h2>
        <div
            v-for="menu in menus"
            :key="menu.group"
            class="bg-white mb-2">
          <h3
              class="font-bold px-2 pt-2 ml-2 border-b border-b-gray-400">{{ menu.group }}</h3>
          <ul>
            <li
                v-for="link in menu.links"
                :key="link.name"
                class="px-4 py-1 box-border"
            >
              <router-link class="underline" :to="{name: link.name}" @click="isShowMenu = false">{{ link.title }} <span>{{ link.sub }}</span></router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
  <main>
    <router-view />
  </main>
  <app-footer/>
</template>
