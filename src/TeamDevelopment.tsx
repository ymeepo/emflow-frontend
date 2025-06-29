import { Tabs } from 'antd';
import Overview from './team-development/Overview';
import Individuals from './team-development/Individuals';

const TeamDevelopment = () => {
  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: <Overview />,
    },
    {
      key: 'individuals',
      label: 'Individuals',
      children: <Individuals />,
    },
  ];

  return (
    <div>
      <h1>Team Development</h1>
      <Tabs
        defaultActiveKey="overview"
        items={tabItems}
        size="large"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default TeamDevelopment;