import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

// Altere string[] para readonly unknown[]
export type UseQueryOptionsWithoutQueryKey<TData, TError = AxiosError> = Omit<
  UseQueryOptions<TData, TError, TData, readonly unknown[]>,
  'queryKey'
>

export type UseMutationOptionsWithoutFn<TData, TError = AxiosError, TVariables = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>

export interface UseQueryHookProps<TData, TError = AxiosError, TVariables = unknown> {
  payload?: TVariables
  options?: UseQueryOptionsWithoutQueryKey<TData, TError>
}

export interface UseMutationHookProps<TData, TError = AxiosError, TVariables = unknown> {
  options?: UseMutationOptionsWithoutFn<TData, TError, TVariables>
}
