import { api } from '@/services/api';
import { ExpansesOverviewResponse, ExpansesOverviewPayload } from '@/types/requests/getExpansesOverview';

export const getExpansesOverview = async (payload: ExpansesOverviewPayload | undefined): Promise<ExpansesOverviewResponse> => {
  const response = await api.post(`/reports/expanses-overview`, payload);
  return response.data.data;
};
