import { ResponsiveFunnel } from '@nivo/funnel';

interface FunnelChartProps {
  data?: Array<{
    id: string;
    value: number;
    label: string;
  }>;
  height?: string;
}

const FunnelChart = ({ data, height = '400px' }: FunnelChartProps) => {
  const defaultData = [
    {
      id: 'applicants',
      value: 500,
      label: 'Applicants',
    },
    {
      id: 'hm_review',
      value: 300,
      label: 'Sent to HM Review',
    },
    {
      id: 'hm_interview',
      value: 200,
      label: 'HM Interview',
    },
    {
      id: 'tech_screen',
      value: 120,
      label: 'Tech Screen',
    },
    {
      id: 'first_panel',
      value: 80,
      label: '1st Panel',
    },
    {
      id: 'second_panel',
      value: 40,
      label: '2nd Panel',
    },
    {
      id: 'offers',
      value: 25,
      label: 'Offers Extended',
    },
  ];

  const chartData = data || defaultData;

  return (
    <div style={{ height }}>
      <ResponsiveFunnel
        data={chartData}
        direction='horizontal'
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.0f"
        colors={{ scheme: 'category10' }}
        borderWidth={5}
        labelColor={{
          from: 'color',
          modifiers: [['darker', 3]]
        }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={10}
        fillOpacity={0.65}
        motionConfig="wobbly"
      />
    </div>
  );
};

export default FunnelChart;