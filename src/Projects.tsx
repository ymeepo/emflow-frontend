import { Tabs } from 'antd';
import Overview from './projects/Overview';
import Project from './projects/Project';
import Data from './projects/Data';

const Projects = () => {
  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: <Overview />,
    },
    {
      key: 'project',
      label: 'Project',
      children: <Project />,
    },
    {
      key: 'data',
      label: 'Data',
      children: <Data />,
    },
  ];

  return (
    <div>
      <h1>Projects</h1>
      <Tabs
        defaultActiveKey="overview"
        items={tabItems}
        size="large"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default Projects;