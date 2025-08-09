import { createApp } from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import ResourceCalculator from './components/resource_calculator/ResourceCalculator.vue'
import AppJusoko from "./components/jusoko/AppJusoko.vue"
import AppLayout from "./components/layout/AppLayout.vue"
import './assets/main.css'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Top',
            component: ResourceCalculator,
            props: {isEquipment: true, isSkill: true, isWeapon: true},
            meta: {title: '素材数計算ツール'}
        },
        {
            path: '/resource_calculator',
            name: 'Resource',
            component: ResourceCalculator,
            props: {isEquipment: true, isSkill: true, isWeapon: true},
            meta: {title: '素材数計算ツール'}
        },
        {
            path: '/resource_calculator/equipment',
            name: 'Resource/equipment',
            component: ResourceCalculator,
            props: {isEquipment: true},
            meta: {title: 'めざせ速10 - 素材数計算ツール'}
        },
        {
            path: '/resource_calculator/skill',
            name: 'Resource/skill',
            component: ResourceCalculator,
            props: {isSkill: true},
            meta: {title: '専用7 - 素材数計算ツール'}
        },
        {
            path: '/resource_calculator/weapon',
            name: 'Resource/weapon',
            component: ResourceCalculator,
            props: {isWeapon: true},
            meta: {title: '橙装備 - 素材数計算ツール'}
        },
        {
            path: '/simulator/jusoko',
            name: 'Jusoko',
            component: AppJusoko,
            meta: {title: '重装甲空母の宝物シミュレーター'}
        },
    ],
})

router.afterEach((to) => {
    document.title = (to.meta.title || 'ppzdev') as string
})

createApp(AppLayout)
    .use(router)
    .mount('#app')
