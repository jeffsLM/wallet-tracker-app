export interface ExpansesOverviewPeriodPayload {
  startDate: string
  endDate: string
  accountType?: string[]
}

export interface ExpansesOverviewPeriodResponse extends Array<Month> { }

export interface Month {
  month: string
  total: number
}
