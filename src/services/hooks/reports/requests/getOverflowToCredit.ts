import { api } from '@/services/api';
import { OverflowToCreditPayload, OverflowToCreditResponse } from '@/types/requests/getOverflowToCredit';

export const getOverflowToCredit = async (payload: OverflowToCreditPayload | undefined): Promise<OverflowToCreditResponse> => {
  const response = await api.post(`/reports/overflow-to-credit`, payload);
  return response.data.data;
};
