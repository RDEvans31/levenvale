'use client';

import * as React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartData {
  date: number;
  tokens: number;
  pounds: number;
}

interface TotalContributionChartProps {
  data: ChartData[];
}

const chartConfig = {
  views: {
    label: 'Total Contributions',
    color: '#ffffff',
  },
  tokens: {
    label: 'Tokens',
    color: '#ffffff',
  },
  pounds: {
    label: '£ Contributed',
    color: '#ffffff',
  },
};

export default function TotalContributionChart({
  data,
}: TotalContributionChartProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('tokens');

  const total = React.useMemo(
    () => ({
      tokens: data[data.length - 1]?.tokens || 0,
      pounds: data[data.length - 1]?.pounds || 0,
    }),
    [data]
  );

  return (
    <div className="rounded-lg bg-ebony text-white">
      <div className="flex flex-col items-stretch border-b border-gray-800">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Total Contributions
          </h3>
          <p className="text-sm text-muted-foreground">
            Your token purchases over time
          </p>
        </div>
        <div className="flex">
          {['tokens', 'pounds'].map(key => {
            const chart = key as keyof typeof chartConfig;
            const isActive = activeChart === chart;
            return (
              <button
                key={chart}
                className={`flex flex-1 flex-col justify-center gap-1 border-t border-gray-800 px-6 py-4 text-left transition-colors even:border-l even:border-gray-800 ${
                  isActive ? 'bg-muted/50' : 'hover:bg-muted/25'
                }`}
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none">
                  {key === 'tokens'
                    ? total.tokens.toLocaleString()
                    : `£${total.pounds.toLocaleString()}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-2 py-4">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                left: 5,
                right: 5,
                top: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#2D2D30"
                className="opacity"
              />
              <XAxis
                dataKey="date"
                type="number"
                scale="time"
                domain={['dataMin', 'dataMax']}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={30}
                tickFormatter={value => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
                className="text-xs"
                fontSize={12}
                tick={{ fill: '#ffffff' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
                fontSize={12}
                tick={{ fill: '#ffffff' }}
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={chartConfig[activeChart].color}
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
