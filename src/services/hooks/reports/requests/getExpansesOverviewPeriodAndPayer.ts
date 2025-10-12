import { api } from '@/services/api';
import { ExpansesOverviewPeriodAndPayerPayload, ExpansesOverviewPeriodAndPayerResponse } from '@/types/requests/reports/getExpansesOverviewPeriodAndPayer';

export const getExpansesOverviewPeriodAndPayer = async (payload: ExpansesOverviewPeriodAndPayerPayload | undefined): Promise<ExpansesOverviewPeriodAndPayerResponse> => {
  const response = await api.post(`/reports/expanses-overview-period-and-payer`, payload);
  return response.data.data;
};
