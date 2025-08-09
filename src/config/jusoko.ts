import img_tip_box from '../assets/img/jusoko/prize_tip_box.png'
import img_coin from '../assets/img/jusoko/prize_coin.png'
import img_missile from '../assets/img/jusoko/prize_missile.png'
import type {PrizeSettings} from "./simulator_types"

export const ticketsSettings = [
    {
        quantity: 2,
        price: 160,
        dailyCount: 1,
    },
    {
        quantity: 3,
        price: 320,
        dailyCount: 1,
    },
    {
        quantity: 6,
        price: 650,
        dailyCount: 1,
    },
    {
        quantity: 10,
        price: 1300,
        dailyCount: 1,
    },
    {
        quantity: 20,
        price: 2700,
        dailyCount: 1,
    },
    {
        quantity: 50,
        price: 7000,
        dailyCount: 2,
    },
    {
        quantity: 90,
        price: 13900,
        dailyCount: 7,
    },
]

export const prizeSettings: PrizeSettings[] = [
    {
        name: '究極宝物チップ選択箱',
        ratio: 0.66,
        type: 'special_box',
        quantity: 1,
        image: img_tip_box,
    },
    {
        name: 'コイン3枚',
        ratio: 34.34,
        type: 'coin',
        quantity: 3,
        image: img_coin,
    },
    {
        name: '争奪用ミサイル',
        ratio: 16,
        type: 'missile',
        quantity: 1,
        image: img_missile,
    },
    {
        name: 'コイン6枚',
        ratio: 25,
        type: 'coin',
        quantity: 6,
        image: img_coin,
    },
    {
        name: 'コイン20枚',
        ratio: 2,
        type: 'coin',
        quantity: 20,
        image: img_coin,
    },
    {
        name: '争奪用ミサイル',
        ratio: 16,
        type: 'missile',
        quantity: 1,
        image: img_missile,
    },
    {
        name: 'コイン10枚',
        ratio: 5,
        type: 'coin',
        quantity: 10,
        image: img_coin,
    },
    {
        name: 'コイン50枚',
        ratio: 1,
        type: 'coin',
        quantity: 50,
        image: img_coin,
    },
]

export const dailyRewardSettings = [
    {
        count: 2,
        reward: 2,
    },
    {
        count: 5,
        reward: 3,
    },
    {
        count: 10,
        reward: 5,
    },
    {
        count: 15,
        reward: 5,
    },
    {
        count: 20,
        reward: 5,
    },
    {
        count: 40,
        reward: 8,
    },
]

export const totalRewardSettings = [
    {
        count: 10,
        reward: 15,
    },
    {
        count: 30,
        reward: 30,
    },
    {
        count: 80,
        reward: 60,
    },
    {
        count: 150,
        reward: 80,
    },
    {
        count: 200,
        reward: 100,
    },
    {
        count: 300,
        reward: 100,
    },
    {
        count: 400,
        reward: 150,
    },
    {
        count: 600,
        reward: 200,
    },
    {
        count: 1000,
        reward: 300,
    },
    {
        count: 2000,
        reward: 450,
    },
]