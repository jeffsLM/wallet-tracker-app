import { useQuery } from '@tanstack/react-query'
import { getExpansesOverview } from './requests/getExpansesOverview'
import { getExpansesOverviewPayer } from './requests/getExpansesOverviewPayer'
import { getExpansesOverviewPeriod } from './requests/getExpansesOverviewPeriod'
import { getExpansesOverviewPeriodAndPayer } from './requests/getExpansesOverviewPeriodAndPayer'
import { UseQueryHookProps } from '@/types/tanstack'
import { ExpansesOverviewPayload, ExpansesOverviewResponse } from '@/types/requests/getExpansesOverview'
import { OverflowToCreditPayload, OverflowToCreditResponse } from '@/types/requests/getOverflowToCredit'
import { ExpansesOverviewPayerPayload, ExpansesOverviewPayerResponse } from '@/types/requests/getExpansesOverviewPayer'
import { ExpansesOverviewPeriodPayload, ExpansesOverviewPeriodResponse } from '@/types/requests/getExpansesOverviewPeriod'
import { ExpansesOverviewPeriodAndPayerPayload, ExpansesOverviewPeriodAndPayerResponse } from '@/types/requests/getExpansesOverviewPeriodAndPayer'
import { AxiosError } from 'axios'
import { getOverflowToCredit } from './requests/getOverflowToCredit'

interface UseExpansesOverviewQueryProps extends UseQueryHookProps<ExpansesOverviewResponse, AxiosError, ExpansesOverviewPayload> { }
interface UseOverflowToCreditQueryProps extends UseQueryHookProps<OverflowToCreditResponse, AxiosError, OverflowToCreditPayload> { }
interface UseExpansesOverviewPayerProps extends UseQueryHookProps<ExpansesOverviewPayerResponse, AxiosError, ExpansesOverviewPayerPayload> { }
interface UseExpansesOverviewPeriodProps extends UseQueryHookProps<ExpansesOverviewPeriodResponse, AxiosError, ExpansesOverviewPeriodPayload> { }
interface UseExpansesOverviewPeriodAndPayerProps extends UseQueryHookProps<ExpansesOverviewPeriodAndPayerResponse, AxiosError, ExpansesOverviewPeriodAndPayerPayload> { }

export const useExpansesOverviewQuery = ({ payload, options }: UseExpansesOverviewQueryProps = {}) => {
  return useQuery<ExpansesOverviewResponse, AxiosError>({
    queryKey: ['expansesOverview', payload],
    queryFn: () => getExpansesOverview(payload),
    retry: false,
    ...options,
  })
}
export const useOverflowToCreditQuery = ({ payload, options }: UseOverflowToCreditQueryProps = {}) => {
  return useQuery<OverflowToCreditResponse, AxiosError>({
    queryKey: ['overflowToCredit', payload],
    queryFn: () => getOverflowToCredit(payload),
    retry: false,
    ...options,
  })
}
export const useExpansesOverviewPayerQuery = ({ payload, options }: UseExpansesOverviewPayerProps = {}) => {
  return useQuery<ExpansesOverviewPayerResponse, AxiosError>({
    queryKey: ['expansesOverviewPayer', payload],
    queryFn: () => getExpansesOverviewPayer(payload),
    retry: false,
    ...options,
  })
}
export const useExpansesOverviewUsePeriodQuery = ({ payload, options }: UseExpansesOverviewPeriodProps = {}) => {
  return useQuery<ExpansesOverviewPeriodResponse, AxiosError>({
    queryKey: ['expansesOverviewPayer', payload],
    queryFn: () => getExpansesOverviewPeriod(payload),
    retry: false,
    ...options,
  })
}
export const useExpansesOverviewUsePeriodAndPayerQuery = ({ payload, options }: UseExpansesOverviewPeriodAndPayerProps = {}) => {
  return useQuery<ExpansesOverviewPeriodAndPayerResponse, AxiosError>({
    queryKey: ['expansesOverviewPayerAndPeriod', payload],
    queryFn: () => getExpansesOverviewPeriodAndPayer(payload),
    retry: false,
    ...options,
  })
}
