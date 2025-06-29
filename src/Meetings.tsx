import { Tabs } from 'antd';
import Transcripts from './meetings/Transcripts';

const Meetings = () => {
  const tabItems = [
    {
      key: 'transcripts',
      label: 'Transcripts',
      children: <Transcripts />,
    },
  ];

  return (
    <div>
      <h1>Meetings</h1>
      <Tabs
        defaultActiveKey="transcripts"
        items={tabItems}
        size="large"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default Meetings;