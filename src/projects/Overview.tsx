import { Card, Row, Col, Statistic, Progress } from 'antd';
import { ProjectOutlined, ClockCircleOutlined, CheckCircleOutlined, ExperimentOutlined } from '@ant-design/icons';

const Overview = () => {
  const projectMetrics = [
    { title: 'Active Projects', value: 12, icon: <ProjectOutlined />, color: '#1890ff' },
    { title: 'Avg Time to Complete', value: 6.5, suffix: ' months', icon: <ClockCircleOutlined />, color: '#faad14' },
    { title: 'Time to Prototype', value: 3.2, suffix: ' months', icon: <ExperimentOutlined />, color: '#52c41a' },
    { title: 'Graduated Projects', value: 8, icon: <CheckCircleOutlined />, color: '#722ed1' },
  ];

  const projectsByStage = [
    { stage: 'Discovery', count: 4, color: '#1890ff' },
    { stage: 'Prototype', count: 5, color: '#faad14' },
    { stage: 'Validation', count: 3, color: '#52c41a' },
  ];

  const recentGraduations = [
    { name: 'AI Customer Service Bot', completionTime: '4.2 months', outcome: 'Graduated' },
    { name: 'Predictive Analytics Dashboard', completionTime: '7.1 months', outcome: 'Graduated' },
    { name: 'Mobile App Redesign', completionTime: '5.8 months', outcome: 'Graduated' },
    { name: 'IoT Sensor Network', completionTime: '8.3 months', outcome: 'Graduated' },
  ];

  const keyInsights = [
    { metric: 'Prototype Success Rate', value: 75, description: 'Projects reaching testable prototype' },
    { metric: 'Go/No-Go Decision Time', value: 4.1, suffix: ' months', description: 'Average time to graduation decision' },
    { metric: 'Resource Utilization', value: 85, suffix: '%', description: 'Team capacity utilization' },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {projectMetrics.map((metric, index) => (
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
        <Col span={8}>
          <Card title="Projects by Stage">
            <div style={{ padding: '16px 0' }}>
              {projectsByStage.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <span>{item.stage}</span>
                    <strong>{item.count} projects</strong>
                  </div>
                  <Progress 
                    percent={(item.count / 12) * 100} 
                    strokeColor={item.color}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Key Performance Insights">
            <div style={{ padding: '16px 0' }}>
              {keyInsights.map((insight, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 500 }}>{insight.metric}</span>
                    <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
                      {insight.value}{insight.suffix}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {insight.description}
                  </div>
                  {typeof insight.value === 'number' && !insight.suffix && (
                    <Progress 
                      percent={insight.value} 
                      strokeColor="#52c41a" 
                      showInfo={false}
                      size="small"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Recent Graduations">
            <div style={{ padding: '16px 0' }}>
              {recentGraduations.map((project, index) => (
                <div key={index} style={{ 
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'transparent',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                    {project.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Completed in {project.completionTime}
                  </div>
                  <div style={{ fontSize: '12px', color: '#52c41a', fontWeight: 500 }}>
                    {project.outcome}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Timeline Metrics" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Discovery Phase</span>
                <span style={{ color: '#1890ff' }}>1.2 months avg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Prototype Development</span>
                <span style={{ color: '#faad14' }}>2.8 months avg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Validation & Testing</span>
                <span style={{ color: '#52c41a' }}>1.9 months avg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span>Go/No-Go Decision</span>
                <span style={{ color: '#722ed1' }}>0.6 months avg</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Success Factors" size="small">
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Clear problem definition</span>
                  <span>92%</span>
                </div>
                <Progress percent={92} strokeColor="#52c41a" showInfo={false} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Stakeholder engagement</span>
                  <span>78%</span>
                </div>
                <Progress percent={78} strokeColor="#faad14" showInfo={false} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Technical feasibility</span>
                  <span>85%</span>
                </div>
                <Progress percent={85} strokeColor="#1890ff" showInfo={false} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;