import { Card, Row, Col, Statistic, Progress } from 'antd';
import { UserOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import FunnelChart from './FunnelChart';

const Overview = () => {
  const hiringData = [
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

  const executiveMetrics = [
    { title: 'Open Requisitions', value: 15, icon: <UserOutlined />, color: '#1890ff' },
    { title: 'Avg Days Open', value: 42, icon: <ClockCircleOutlined />, color: '#f5222d' },
    { title: 'Offers Extended', value: 25, icon: <CheckCircleOutlined />, color: '#52c41a' },
    { title: 'Acceptance Rate', value: 80, suffix: '%', icon: <TeamOutlined />, color: '#722ed1' },
  ];

  const requisitionsByStatus = [
    { status: 'New', count: 5, color: '#1890ff' },
    { status: 'In Progress', count: 8, color: '#faad14' },
    { status: 'On Hold', count: 2, color: '#f5222d' },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {executiveMetrics.map((metric, index) => (
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
        <Col span={16}>
          <Card title="Hiring Pipeline Funnel" style={{ height: '400px' }}>
            <FunnelChart data={hiringData} height="320px" />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Requisitions by Status">
            <div style={{ padding: '16px 0' }}>
              {requisitionsByStatus.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <span>{item.status}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <Progress 
                    percent={(item.count / 15) * 100} 
                    strokeColor={item.color}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Time to Fill (Days)" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Software Engineer</span>
                <span style={{ color: '#52c41a' }}>28 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Product Manager</span>
                <span style={{ color: '#faad14' }}>45 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Data Scientist</span>
                <span style={{ color: '#f5222d' }}>62 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>UX Designer</span>
                <span style={{ color: '#52c41a' }}>35 days</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top Challenges" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Low candidate response rate</span>
                  <span>65%</span>
                </div>
                <Progress percent={65} strokeColor="#f5222d" showInfo={false} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Lengthy interview process</span>
                  <span>45%</span>
                </div>
                <Progress percent={45} strokeColor="#faad14" showInfo={false} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Competing offers</span>
                  <span>30%</span>
                </div>
                <Progress percent={30} strokeColor="#722ed1" showInfo={false} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;