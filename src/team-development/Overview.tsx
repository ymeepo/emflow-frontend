import { Card, Row, Col, Statistic, Progress, Tree, Tag, Timeline } from 'antd';
import { TeamOutlined, UserOutlined, TrophyOutlined, RiseOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const Overview = () => {
  const teamMetrics = [
    { title: 'Total Engineers', value: 24, icon: <TeamOutlined />, color: '#1890ff' },
    { title: 'Avg Tenure', value: 2.8, suffix: ' years', icon: <UserOutlined />, color: '#52c41a' },
    { title: 'Recent Promotions', value: 5, suffix: ' (6 months)', icon: <TrophyOutlined />, color: '#722ed1' },
    { title: 'Team Satisfaction', value: 87, suffix: '%', icon: <RiseOutlined />, color: '#faad14' },
  ];

  const teamStructure: DataNode[] = [
    {
      title: 'Engineering Team (24)',
      key: '0',
      children: [
        {
          title: 'Frontend Team (8)',
          key: '0-0',
          children: [
            { title: 'Sarah Chen - Senior Engineer', key: '0-0-0' },
            { title: 'Mike Rodriguez - Engineer II', key: '0-0-1' },
            { title: 'Amy Wang - Staff Engineer', key: '0-0-2' },
            { title: 'David Kim - Engineer I', key: '0-0-3' },
            { title: 'Lisa Park - Senior Engineer', key: '0-0-4' },
            { title: 'John Thompson - Engineer II', key: '0-0-5' },
            { title: 'Rachel Green - Principal Engineer', key: '0-0-6' },
            { title: 'Tom Wilson - Engineer I', key: '0-0-7' },
          ],
        },
        {
          title: 'Backend Team (10)',
          key: '0-1',
          children: [
            { title: 'Alex Chen - Staff Engineer', key: '0-1-0' },
            { title: 'Maria Garcia - Senior Engineer', key: '0-1-1' },
            { title: 'James Miller - Engineer II', key: '0-1-2' },
            { title: 'Emily Davis - Principal Engineer', key: '0-1-3' },
            { title: 'Robert Johnson - Engineer I', key: '0-1-4' },
            { title: 'Jennifer Brown - Senior Engineer', key: '0-1-5' },
            { title: 'Michael Wilson - Engineer II', key: '0-1-6' },
            { title: 'Ashley Taylor - Staff Engineer', key: '0-1-7' },
            { title: 'Kevin Lee - Engineer I', key: '0-1-8' },
            { title: 'Nicole White - Senior Engineer', key: '0-1-9' },
          ],
        },
        {
          title: 'DevOps Team (4)',
          key: '0-2',
          children: [
            { title: 'Daniel Martinez - Senior DevOps Engineer', key: '0-2-0' },
            { title: 'Jessica Anderson - DevOps Engineer', key: '0-2-1' },
            { title: 'Chris Thompson - Staff DevOps Engineer', key: '0-2-2' },
            { title: 'Samantha Clark - DevOps Engineer', key: '0-2-3' },
          ],
        },
        {
          title: 'Data Team (2)',
          key: '0-3',
          children: [
            { title: 'Ryan Lewis - Senior Data Engineer', key: '0-3-0' },
            { title: 'Amanda Walker - Data Engineer', key: '0-3-1' },
          ],
        },
      ],
    },
  ];

  const levelDistribution = [
    { level: 'Engineer I', count: 6, color: '#87d068' },
    { level: 'Engineer II', count: 8, color: '#108ee9' },
    { level: 'Senior Engineer', count: 6, color: '#2db7f5' },
    { level: 'Staff Engineer', count: 3, color: '#f50' },
    { level: 'Principal Engineer', count: 1, color: '#722ed1' },
  ];

  const skillsDistribution = [
    { skill: 'React/Frontend', engineers: 12, percentage: 50 },
    { skill: 'Node.js/Backend', engineers: 15, percentage: 63 },
    { skill: 'Python', engineers: 10, percentage: 42 },
    { skill: 'AWS/Cloud', engineers: 18, percentage: 75 },
    { skill: 'Docker/Kubernetes', engineers: 14, percentage: 58 },
    { skill: 'Machine Learning', engineers: 4, percentage: 17 },
  ];

  const recentMilestones = [
    {
      date: '2024-02-10',
      event: 'Sarah Chen promoted to Senior Engineer',
      type: 'promotion'
    },
    {
      date: '2024-02-05',
      event: 'New hire: Kevin Lee joined as Engineer I',
      type: 'hire'
    },
    {
      date: '2024-01-28',
      event: 'Team completed React 18 migration training',
      type: 'training'
    },
    {
      date: '2024-01-20',
      event: 'Alex Chen promoted to Staff Engineer',
      type: 'promotion'
    },
    {
      date: '2024-01-15',
      event: 'Q4 performance reviews completed',
      type: 'review'
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'promotion': return 'green';
      case 'hire': return 'blue';
      case 'training': return 'orange';
      case 'review': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {teamMetrics.map((metric, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={metric.title}
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.icon}
                valueStyle={{ color: metric.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Team Structure">
            <Tree
              showLine
              defaultExpandedKeys={['0', '0-0', '0-1', '0-2', '0-3']}
              treeData={teamStructure}
              style={{ maxHeight: '400px', overflow: 'auto' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Level Distribution">
            <div style={{ padding: '16px 0' }}>
              {levelDistribution.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <span>{item.level}</span>
                    <span><strong>{item.count} engineers</strong></span>
                  </div>
                  <Progress 
                    percent={(item.count / 24) * 100} 
                    strokeColor={item.color}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Skills Distribution">
            <div style={{ padding: '16px 0' }}>
              {skillsDistribution.map((skill, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <span>{skill.skill}</span>
                    <span>{skill.engineers} engineers ({skill.percentage}%)</span>
                  </div>
                  <Progress 
                    percent={skill.percentage} 
                    strokeColor="#1890ff"
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Team Milestones">
            <Timeline>
              {recentMilestones.map((milestone, index) => (
                <Timeline.Item 
                  key={index} 
                  color={getEventColor(milestone.type)}
                >
                  <div style={{ fontWeight: 500 }}>{milestone.event}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {milestone.date}
                    <Tag color={getEventColor(milestone.type)} style={{ marginLeft: 8 }}>
                      {milestone.type}
                    </Tag>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Team Health Metrics" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Retention Rate</span>
                  <span>94%</span>
                </div>
                <Progress percent={94} strokeColor="#52c41a" showInfo={false} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Internal Mobility</span>
                  <span>78%</span>
                </div>
                <Progress percent={78} strokeColor="#1890ff" showInfo={false} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Skill Growth Rate</span>
                  <span>85%</span>
                </div>
                <Progress percent={85} strokeColor="#722ed1" showInfo={false} />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Diversity & Inclusion" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Gender Diversity</span>
                <span>42% women</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Leadership Diversity</span>
                <span>38% women in senior roles</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Experience Range</span>
                <span>0.5 - 8 years</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Remote/Hybrid</span>
                <span>67% flexible work</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Development Focus" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '8px' }}>
                <Tag color="blue">Cloud Architecture</Tag>
                <span style={{ marginLeft: 8, fontSize: '12px' }}>8 engineers</span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Tag color="green">AI/ML</Tag>
                <span style={{ marginLeft: 8, fontSize: '12px' }}>6 engineers</span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Tag color="orange">Leadership</Tag>
                <span style={{ marginLeft: 8, fontSize: '12px' }}>4 engineers</span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <Tag color="purple">Security</Tag>
                <span style={{ marginLeft: 8, fontSize: '12px' }}>5 engineers</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;