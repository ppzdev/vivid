export type SimulatorEvent = {
    purchaseItem?: number
    prizeItem?: number
    dailyRewardItem?: number
    totalRewardItem?: number
}

export type SimulatorDailyHistory = SimulatorEvent[]

export type SimulatorAllHistory = SimulatorDailyHistory[]

export type PrizeType = 'special_box' | 'missile' | 'coin'
export type PrizeSettings = {
    name: string
    ratio: number
    type: PrizeType
    quantity: number
    image: string,
}

export type PrizeItemList = Record<PrizeType, {
    image: string,
    quantity: number,
}>

export type RewardSetting = {
    count: number,
    reward: number,
}

export type HistorySummary = {
    price: number,
    quantity: number,
    useTicket: number
    dailyReward: number,
    totalReward: number,
}