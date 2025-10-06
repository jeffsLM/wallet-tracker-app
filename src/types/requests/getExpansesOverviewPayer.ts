export interface ExpansesOverviewPayerPayload {
  date: string
  accountType?: string[]
}

export interface ExpansesOverviewPayerResponse extends Array<Payer> { }

export interface Payer {
  payer: string
  amount: number
}
