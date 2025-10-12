export interface ExpansesOverviewPeriodAndPayerPayload {
  startDate: string
  endDate: string
  accountType?: string[]
}

export interface ExpansesOverviewPeriodAndPayerResponse extends Array<Month> { }

export interface Month {
  month: string
  [key: string]: any
}
