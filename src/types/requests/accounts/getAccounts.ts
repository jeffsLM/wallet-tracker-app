interface Account {
  id: string
  familyId: string
  groupId: any
  name: string
  type: string
  last4Digits: string
  active: boolean
  createAt: string
  updateAt: any
  family: Family
  balance: number
  hasBalance: boolean
  totalUsed: number
  totalUsedGroup: number
}

interface Family {
  id: string
  name: string
  createAt: string
}

export type GetAccountsResponse = Account[]
