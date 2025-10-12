import { api } from '@/services/api';
import { ExpansesOverviewPayerPayload, ExpansesOverviewPayerResponse } from '@/types/requests/reports/getExpansesOverviewPayer';

export const getExpansesOverviewPayer = async (payload: ExpansesOverviewPayerPayload | undefined): Promise<ExpansesOverviewPayerResponse> => {
  const response = await api.post(`/reports/expanses-overview-payer`, payload);
  return response.data.data;
};
