import { useQuery } from '@tanstack/react-query'
import { getAccounts } from './requets/getAccounts'
import { UseQueryHookProps } from '@/types/tanstack'
import { GetAccountsResponse } from '@/types/requests/accounts/getAccounts'
import { AxiosError } from 'axios'

interface UseAccountsQueryProps extends UseQueryHookProps<GetAccountsResponse, AxiosError> { }

export const useAccountsQuery = ({ options }: UseAccountsQueryProps = {}) => {
  return useQuery<GetAccountsResponse, AxiosError>({
    queryKey: ['accounts'],
    queryFn: () => getAccounts(),
    retry: false,
    ...options,
  })
}
