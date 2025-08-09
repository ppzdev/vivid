import { createApp } from 'vue'
import {createMemoryHistory, createRouter} from 'vue-router'
import AppResource from './components/resource/AppResource.vue'
import AppJusoko from "./components/jusoko/AppJusoko.vue"
import AppLayout from "./components/layout/AppLayout.vue"
import './assets/main.css'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: 'Top',
            component: AppResource,
            props: {isEquipment: true, isSkill: true, isWeapon: true},
            meta: {title: '素材数計算ツール'}
        },
        {
            path: '/resource',
            name: 'Resource',
            component: AppResource,
            props: {isEquipment: true, isSkill: true, isWeapon: true},
            meta: {title: '素材数計算ツール'}
        },
        {
            path: '/resource/equipment',
            name: 'Resource/equipment',
            component: AppResource,
            props: {isEquipment: true},
            meta: {title: 'めざせ速10 - 素材数計算ツール'}
        },
        {
            path: '/resource/skill',
            name: 'Resource/skill',
            component: AppResource,
            props: {isSkill: true},
            meta: {title: '専用7 - 素材数計算ツール'}
        },
        {
            path: '/resource/weapon',
            name: 'Resource/weapon',
            component: AppResource,
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
