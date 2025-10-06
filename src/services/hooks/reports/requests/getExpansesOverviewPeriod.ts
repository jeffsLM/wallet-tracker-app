import { api } from '@/services/api';
import { ExpansesOverviewPeriodPayload, ExpansesOverviewPeriodResponse } from '@/types/requests/getExpansesOverviewPeriod';

export const getExpansesOverviewPeriod = async (payload: ExpansesOverviewPeriodPayload | undefined): Promise<ExpansesOverviewPeriodResponse> => {
  const response = await api.post(`/reports/expanses-overview-period`, payload);
  return response.data.data;
};
