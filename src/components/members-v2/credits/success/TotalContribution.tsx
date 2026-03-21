import {
  LF_API_KEY,
  LF_API_URL,
  ORG_ID,
} from '@/lib/little-farma/little-farma';
import TotalContributionChart from './TotalContributionChart';

interface TimeseriesPoint {
  date: string;
  amount: number;
  count: number;
  cumulativeAmount: number;
  cumulativeCashAmount: number;
}

interface ContributionsTimeseriesResponse {
  success: boolean;
  timeseries: TimeseriesPoint[];
  totalContributions: number;
  totalCashContributions: number;
}

interface ChartDataPoint {
  date: number;
  tokens: number;
  pounds: number;
}

interface TotalContributionProps {
  membershipId: string;
}

export default async function TotalContribution({
  membershipId,
}: TotalContributionProps) {
  let chartData: ChartDataPoint[] = [];

  try {
    if (!LF_API_URL || !LF_API_KEY || !ORG_ID) {
      throw new Error('API configuration missing');
    }

    const response = await fetch(
      `${LF_API_URL}/${ORG_ID}/${membershipId}/credits/contributions-timeseries`,
      {
        headers: {
          Authorization: `Bearer ${LF_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`API request failed: ${message}`);
    }

    const data: ContributionsTimeseriesResponse = await response.json();

    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    chartData = data.timeseries.map(point => ({
      date: new Date(point.date).getTime(),
      tokens: point.cumulativeAmount,
      pounds: point.cumulativeCashAmount,
    }));
  } catch (error) {
    console.error('Error fetching contribution data:', error);
    // Fallback to empty data on error
    chartData = [];
  }

  return <TotalContributionChart data={chartData} />;
}
