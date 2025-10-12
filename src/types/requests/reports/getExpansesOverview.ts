export interface ExpansesOverviewPayload {
  date: string
  accountType?: string[]
}

export interface ExpansesOverviewResponse {
  totalExpenses: number
  totalCredit: number
  totalVoucher: TotalVoucher
}

interface TotalVoucher {
  totalVoucher: number
  totalVoucherUsed: number
}
