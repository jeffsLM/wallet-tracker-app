import { api } from '@/services/api';
import { GetAccountsResponse } from '@/types/requests/accounts/getAccounts';

export const getAccounts = async (): Promise<GetAccountsResponse> => {
  const response = await api.get(`/accounts`);
  return response.data.data;
};
