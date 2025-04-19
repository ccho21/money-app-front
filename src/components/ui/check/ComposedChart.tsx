'use client';

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  Cell,
  DotProps,
} from 'recharts';

import CurrencyDisplay from './CurrencyDisplay';

interface Props {
  data: {
    month: string;
    value: number;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }[];
  onSelect?: (startDate: string) => void;
  lineColor?: string;
  bgColor?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0];
  return (
    <div className='rounded-md border border-border bg-surface px-3 py-2 shadow-sm text-sm'>
      <div className='text-muted mb-1'>{label}</div>
      <div className='text-foreground font-semibold'>
        <CurrencyDisplay amount={data.value} />
      </div>
    </div>
  );
};

export default function StatComposedChart({
  data,
  onSelect,
  lineColor,
  bgColor,
}: Props) {
  const defaultLineColor = lineColor ?? 'var(--color-primary)';
  const backgroundColor = bgColor ?? 'var(--color-surface)';
  const selectedMonth = data.find((s) => s.isCurrent)?.month;
  return (
    <div className='w-full overflow-x-auto scrollbar-hide bg-surface'>
      <div
        className='min-w-[600px] h-36 rounded-xl'
        style={{ backgroundColor }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <XAxis
              dataKey='month'
              interval={0}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis hide domain={[0, 'dataMax']} />
            <CartesianGrid strokeDasharray='3 3' stroke='var(--color-border)' />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey='value' barSize={6} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={defaultLineColor}
                  fillOpacity={0.3}
                  onClick={() => onSelect?.(entry.startDate)}
                />
              ))}
            </Bar>

            <Line
              type='monotone'
              dataKey='value'
              stroke={defaultLineColor}
              strokeWidth={2}
              dot={({ cx, cy, payload, index }) => {
                const isSelected = payload.month === selectedMonth;
                return (
                  <circle
                    key={`dot-${payload.month}-${index}`} // ✅ 고유한 key 추가
                    cx={cx}
                    cy={cy}
                    r={4}
                    stroke='white'
                    strokeWidth={2}
                    fill={isSelected ? defaultLineColor : 'var(--color-muted)'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelect?.(payload.startDate)}
                  />
                );
              }}
              activeDot={(props: DotProps) => {
                const { cx, cy, payload } = props as {
                  cx: number;
                  cy: number;
                  payload: {
                    month: string;
                    startDate: string;
                  };
                };

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    stroke={defaultLineColor}
                    strokeWidth={4}
                    fill='white'
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelect?.(payload.startDate)}
                  />
                );
              }}
              isAnimationActive
              animationBegin={100}
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
