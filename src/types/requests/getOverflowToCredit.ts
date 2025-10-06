export interface OverflowToCreditPayload {
  date: string
  accountType?: string[]
}

export interface OverflowToCreditResponse {
  allGroups: AllGroup[]
  allGroupsExpenses: number
  allGroupsIncome: number
  amountRemaining: number
}

export interface AllGroup {
  name: string
  totalExpenses: number
  totalIncome: number
}
