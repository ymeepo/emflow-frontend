import { Tabs } from 'antd';
import Overview from './hiring/Overview';
import Requisition from './hiring/Requisition';
import Data from './hiring/Data';

const Hiring = () => {
  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: <Overview />,
    },
    {
      key: 'requisition',
      label: 'Requisition',
      children: <Requisition />,
    },
    {
      key: 'data',
      label: 'Data',
      children: <Data />,
    },
  ];

  return (
    <div>
      <h1>Hiring</h1>
      <Tabs
        defaultActiveKey="overview"
        items={tabItems}
        size="large"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default Hiring;