<template>
  <h1 class="text-2xl mb-4 font-bold">重装甲空母の宝物シミュレーター</h1>
  <span class="px-2 py-1.5 font-bold border border-gray-300 rounded-lg text-xl">
    <img
      class="inline w-8"
      src="../../assets/img/jusoko/ticket.png"
      alt="ticket"
    >：{{ remainTicket }}
  </span>

  <h2 class="mb-2 text-3xl text-center">Day: {{ day + 1 }}</h2>
  <div class="font-bold text-right">購入：{{ dailyInfo.quantity }}枚 / JPY {{ dailyInfo.price }}</div>

  <section class="p-4 mb-2 bg-blue-50 dark:bg-blue-950">
    <h3 class="font-bold">重装甲空母の宝物ギフト</h3>
    <ul>
      <li
          v-for="(ticketsSetting, index) in ticketsSettings"
          :key="ticketsSetting.quantity"
          class="inline-block"
      >
        <div class="">
          <button
            class="min-w-30 px-2 py-1.5 m-1 border flex justify-between cursor-pointer
             border-gray-400 rounded-xl bg-orange-200 relative dark:bg-orange-900"
            :class="{'opacity-50': remainPurchaseTicket(index) <= 0, 'pointer-events-none': remainPurchaseTicket(index) <= 0}"
            @click.prevent="purchaseTicket(index)"
            :disabled="remainPurchaseTicket(index) <= 0"
          >
            <img
              class="inline w-12"
              src="../../assets/img/jusoko/ticket.png"
              alt="ticket"
            >
            <span class="leading-none font-bold text-xl">
              JPY<br>{{ ticketsSetting.price }}
            </span>
            <span class="absolute text-sm font-bold text-right w-14 left-0 bottom-[-2px]">{{
                ticketsSetting.quantity
              }}</span>
          </button>
          <p class="text-sm leading-none text-center tracking-[-.05em]">本日の残り回数：{{
              remainPurchaseTicket(index)
            }}</p>
        </div>
      </li>
    </ul>
  </section>

  <section class="flex p-4 mb-2 gap-4 bg-purple-100 dark:bg-blue-900">
    <button v-for="setting in [
          {
            name: '解禁',
            quantity: 1,
          }, {
            name: '開始×20',
            quantity: 20,
          }
        ]"
            :disabled="remainTicket < setting.quantity"
            @click.prevent="useTicket(setting.quantity)"
            class="py-1 border cursor-pointer w-32 grow
           border-gray-400 rounded-xl bg-orange-300 relative dark:bg-orange-800"
            :class="{
          'opacity-50': remainTicket < setting.quantity,
          'pointer-events-none': remainTicket < setting.quantity,
        }"
    >
      <span class="block font-bold text-xl">{{ setting.name }}</span>
      <img
          class="inline w-8"
          src="../../assets/img/jusoko/ticket.png"
          alt="ticket"
      >
      <span class="font-bold ml-2">{{ setting.quantity }}</span>
    </button>
  </section>

  <section
      v-if="latestResult"
      class="p-4 mb-2 bg-purple-100 dark:bg-purple-900"
  >
    <h3 class="text-2xl font-bold mt-[-0.25rem] mb-2">Get!</h3>
    <item-list :items="latestResult"/>
  </section>

  <section
      class="p-4 mb-2 bg-amber-100 dark:bg-amber-950"
  >
    <h3 class="text-base font-bold mt-[-0.25rem] mb-2">毎日任務：{{ dailyInfo.useTicket }}</h3>
    <reward-list
        :use-ticket="dailyInfo.useTicket"
        :reward-settings="dailyRewardSettings"
        :got-rewards="gotRewardsDaily"
    />
  </section>

  <section
      class="p-4 mb-2 bg-amber-100 dark:bg-amber-950"
  >
    <h3 class="text-base font-bold mt-[-0.25rem] mb-2">累計抽選回数：{{ totalInfo.useTicket }}</h3>
    <reward-list
        :use-ticket="totalInfo.useTicket"
        :reward-settings="totalRewardSettings"
        :got-rewards="gotRewardsTotal"
    />
  </section>

  <section class="flex justify-between mb-2">
    <button
        v-if="day !== 0"
        class="p-3 cursor-pointer font-bold border border-gray-400 rounded-lg"
        @click.prevent="day--"
    >
      <svg class="inline mr-1 w-4 align-text-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4">
        <path d="M3 0 3 4 0 2Z" fill="#74E812"/>
      </svg>
      Day: {{ day }}
    </button>
    <div></div>
    <button
        v-if="day !== eventDays -1"
        class="p-3 cursor-pointer font-bold border border-gray-400 rounded-lg"
        @click.prevent="day++"
    >
      Day: {{ day + 2 }}
      <svg class="inline ml-1 w-4 align-text-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4">
        <path d="M0 0 0 4 3 2Z" fill="#74E812"/>
      </svg>
    </button>
  </section>

  <hr class="mb-2">

  <section class="p-4 mb-2 bg-gray-100 dark:bg-gray-800">
    <h3 class="text-xl font-bold mt-[-0.25rem] mb-2">累計</h3>
    <item-list :items="prizeSummary"/>

    <p class="py-2 font-bold">
      購入：{{ totalInfo.quantity }}枚 / JPY {{ totalInfo.price }}<br>
      使徒：{{ Math.floor(prizeSummary.missile.quantity * 10 / 800) }}回 ({{ prizeSummary.missile.quantity * 10 % 800 }} / 800)
    </p>
  </section>

  <section class="p-4 pb-0 mb-2 border border-gray-300">
    <h3 class="text-xl font-bold mt-[-0.25rem] mb-2 flex justify-between">
      <span>履歴</span>
      <button
          class="p-1 text-base border border-gray-300 bg-white dark:bg-gray-800 rounded-md cursor-pointer"
          @click.prevent="clearHistory"
      >
        Clear
      </button>
    </h3>
    <div v-for="(dailyHistories, index) in history" :key="index">
      <h4 class="mb-1 font-bold border-b border-b-gray-300" v-if="dailyHistories.length">Day: {{ index + 1 }}</h4>
      <ul class="mb-2">
        <li
            v-for="(dailyHistory, index) in dailyHistories" :key="index"
        >
          <span
            v-if="dailyHistory.purchaseItem !== undefined"
          >
            {{
              ticketsSettings[dailyHistory.purchaseItem].quantity
            }}枚購入 JPY {{ ticketsSettings[dailyHistory.purchaseItem].price }}
          </span>
          <span
              v-else-if="dailyHistory.prizeItem !== undefined"
              :class="{
                  'text-red-500': prizeSettings[dailyHistory.prizeItem].ratio <= 1,
                  'font-bold': prizeSettings[dailyHistory.prizeItem].ratio <= 1,
                }"
          >
              {{ prizeSettings[dailyHistory.prizeItem].name }}Get! ({{
              prizeSettings[dailyHistory.prizeItem].ratio
            }}%)
          </span>
          <span
            v-else-if="dailyHistory.dailyRewardItem !== undefined"
          >
            毎日任務({{ dailyRewardSettings[dailyHistory.dailyRewardItem].count }}回)で{{
              dailyRewardSettings[dailyHistory.dailyRewardItem].reward
            }}枚Get!
          </span>
          <span
            v-else-if="dailyHistory.totalRewardItem !== undefined"
          >
            累計抽選報酬({{ totalRewardSettings[dailyHistory.totalRewardItem].count }}回)で{{
              totalRewardSettings[dailyHistory.totalRewardItem].reward
            }}枚Get!
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import type {
  HistorySummary,
  PrizeItemList,
  PrizeType,
  SimulatorAllHistory,
  SimulatorEvent
} from '../../config/simulator_types'
import {dailyRewardSettings, prizeSettings, ticketsSettings, totalRewardSettings} from '../../config/jusoko'
import ItemList from "./ItemList.vue";
import RewardList from "./RewardList.vue";

const eventDays = 7
const day = ref<number>(0)
const history = ref<SimulatorAllHistory>(Array.from({length: eventDays}, () => []))

const latestResult = ref<Record<PrizeType, { image: string, quantity: number }> | null>(null)

const remainTicket = computed((): number => {
  const histories = history.value.flat()
  const gain = histories.reduce((acc: number, cur: SimulatorEvent) => {
    return acc + (cur.purchaseItem !== undefined ? ticketsSettings[cur.purchaseItem].quantity : 0)
  }, 0) ?? 0

  const use = histories.reduce((acc: number, cur: SimulatorEvent) => {
    return acc + (cur.prizeItem !== undefined ? 1 : 0)
  }, 0) ?? 0

  return gain - use
})

const prizeSummary = computed((): PrizeItemList => {
  const histories = history.value.flat()

  const summary: PrizeItemList = prizeSettings.reduce((acc, setting) => {
    acc[setting.type] ??= {
      image: setting.image,
      quantity: 0,
    }
    return acc
  }, {} as PrizeItemList)

  return histories.reduce((summary, item: SimulatorEvent) => {
    if (item.prizeItem !== undefined) {
      const prize = prizeSettings[item.prizeItem]
      summary[prize.type].quantity += prize.quantity
    } else if (item.totalRewardItem !== undefined) {
      const reward = totalRewardSettings[item.totalRewardItem]
      summary['coin'].quantity += reward.reward
    }
    return summary
  }, summary) ?? 0
})

const dailyInfo = computed((): HistorySummary => {
  return getDailyInfo(day.value)
})
const totalInfo = computed((): HistorySummary => {
  let result: HistorySummary = {
    price: 0,
    quantity: 0,
    useTicket: 0,
    dailyReward: 0,
    totalReward: 0,
  }
  return Array.from({length: eventDays}, (_, i) => i).reduce((acc, day) => {
    const {price, quantity, useTicket, dailyReward, totalReward} = getDailyInfo(day)
    acc.price += price
    acc.quantity += quantity
    acc.useTicket += useTicket
    acc.dailyReward += dailyReward
    acc.totalReward += totalReward
    return acc
  }, result)
})
function getDailyInfo(day: number): HistorySummary {
  let result: HistorySummary = {
    price: 0,
    quantity: 0,
    useTicket: 0,
    dailyReward: 0,
    totalReward: 0,
  }

  return history.value[day].reduce((acc, cur: SimulatorEvent) => {
    if (cur.purchaseItem !== undefined) {
      acc.price += ticketsSettings[cur.purchaseItem].price
      acc.quantity += ticketsSettings[cur.purchaseItem].quantity
    } else if (cur.prizeItem !== undefined) {
      acc.useTicket++
    } else if (cur.dailyRewardItem !== undefined) {
      acc.dailyReward++
    } else if (cur.totalRewardItem !== undefined) {
      acc.totalReward++
    }
    return acc
  }, result) ?? 0
}

const gotRewardsDaily = computed((): number[] => {
  return history.value[day.value].map(((history) => history.dailyRewardItem)).filter(i => i !== undefined) as number[]
})

const gotRewardsTotal = computed((): number[] => {
  return history.value.flat().map(((history) => history.totalRewardItem)).filter(i => i !== undefined) as number[]
})

function purchaseTicket(ticketIndex: number) {
  history.value[day.value] = [...history.value[day.value] ?? [], {purchaseItem: ticketIndex}]
}

function clearHistory() {
  day.value = 0
  history.value = Array.from({length: eventDays}, () => [])
  latestResult.value = null
}

function remainPurchaseTicket(ticketIndex: number): number {
  const dailyCount = ticketsSettings[ticketIndex].dailyCount
  return dailyCount - (history.value[day.value]?.filter(
      (record: SimulatorEvent) => record.purchaseItem === ticketIndex
  )?.length ?? 0)
}

function useTicket(times: number): void {
  let dailyUseTicketCurrent = dailyInfo.value.useTicket
  let totalUseTicketCurrent = totalInfo.value.useTicket

  const resultIndexes: number[] = Array.from({length: times}, () => {
    let searchNumber = Math.floor(Math.random() * 10000)
    const prizeIndex = prizeSettings.findIndex(function (setting) {
      const permyriad = Math.round(setting.ratio * 100)
      if (searchNumber < permyriad) {
        return true
      } else {
        searchNumber -= permyriad
        return false
      }
    })

    history.value[day.value].push({
      prizeItem: prizeIndex
    })

    dailyUseTicketCurrent++
    let dailyRewardIndex = dailyRewardSettings.findIndex(reward => reward.count === dailyUseTicketCurrent)
    if (dailyRewardIndex > -1) {
      history.value[day.value].push({
        dailyRewardItem: dailyRewardIndex
      })
    }

    totalUseTicketCurrent++
    let totalRewardIndex = totalRewardSettings.findIndex(reward => reward.count === totalUseTicketCurrent)
    if (totalRewardIndex > -1) {
      history.value[day.value].push({
        totalRewardItem: totalRewardIndex
      })
    }

    return prizeIndex
  })

  latestResult.value = resultIndexes.reduce((acc, prizeIndex) => {
    const prize = prizeSettings[prizeIndex]
    acc[prize.type] ??= {
      image: prize.image,
      quantity: 0
    }
    acc[prize.type].quantity += prize.quantity
    return acc
  }, {} as Record<PrizeType, { image: string; quantity: number }>)
}
</script>
