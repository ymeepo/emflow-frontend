import { useState } from 'react';
import { Card, Row, Col, Select, Descriptions, Tag, Timeline, Progress, Statistic } from 'antd';
import { ProjectOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';

const Project = () => {
  const [selectedProject, setSelectedProject] = useState('PROJ-001');

  const projects = [
    {
      id: 'PROJ-001',
      name: 'AI-Powered Customer Support',
      businessProblem: 'High volume of repetitive customer inquiries leading to increased support costs and longer response times.',
      targetOutput: 'Intelligent chatbot that can handle 80% of common customer inquiries automatically.',
      questions: [
        'Can AI accurately understand customer intent?',
        'What is the acceptable response accuracy threshold?',
        'How will the system handle complex multi-step queries?'
      ],
      progress: 65,
      currentStage: 'Prototype',
      nextSteps: [
        'Complete NLP model training',
        'Integrate with existing CRM system',
        'Conduct user acceptance testing'
      ],
      status: 'In Progress',
      startDate: '2024-01-15',
      team: ['Sarah Chen', 'Mike Rodriguez', 'Amy Wang'],
      budget: '$150k',
      timelineEvents: [
        { date: '2024-01-15', event: 'Project Kickoff', status: 'completed' },
        { date: '2024-02-01', event: 'Requirements Gathering', status: 'completed' },
        { date: '2024-02-15', event: 'Technical Architecture', status: 'completed' },
        { date: '2024-03-01', event: 'Prototype Development', status: 'current' },
        { date: '2024-03-15', event: 'Testing & Validation', status: 'pending' },
        { date: '2024-04-01', event: 'Go/No-Go Decision', status: 'pending' }
      ]
    },
    {
      id: 'PROJ-002',
      name: 'Predictive Maintenance IoT',
      businessProblem: 'Unplanned equipment downtime causing production delays and increased maintenance costs.',
      targetOutput: 'IoT sensor network with predictive analytics to forecast equipment failures 2-3 weeks in advance.',
      questions: [
        'Which sensors provide the most predictive value?',
        'How accurate can failure predictions be?',
        'What is the ROI threshold for implementation?'
      ],
      progress: 40,
      currentStage: 'Discovery',
      nextSteps: [
        'Install pilot sensors on 3 machines',
        'Collect baseline performance data',
        'Develop initial ML models'
      ],
      status: 'In Progress',
      startDate: '2024-02-01',
      team: ['John Thompson', 'Lisa Park', 'David Kim'],
      budget: '$200k',
      timelineEvents: [
        { date: '2024-02-01', event: 'Project Kickoff', status: 'completed' },
        { date: '2024-02-10', event: 'Equipment Assessment', status: 'completed' },
        { date: '2024-02-25', event: 'Sensor Selection', status: 'current' },
        { date: '2024-03-10', event: 'Pilot Installation', status: 'pending' },
        { date: '2024-04-01', event: 'Data Collection', status: 'pending' },
        { date: '2024-05-01', event: 'Model Development', status: 'pending' }
      ]
    },
    {
      id: 'PROJ-003',
      name: 'Blockchain Supply Chain',
      businessProblem: 'Lack of transparency and traceability in supply chain leading to quality issues and compliance risks.',
      targetOutput: 'Blockchain-based system to track products from origin to delivery with immutable audit trail.',
      questions: [
        'Can blockchain scale to our transaction volume?',
        'How will suppliers integrate with the system?',
        'What are the performance implications?'
      ],
      progress: 90,
      currentStage: 'Validation',
      nextSteps: [
        'Complete pilot with 5 suppliers',
        'Performance optimization',
        'Prepare graduation presentation'
      ],
      status: 'Near Completion',
      startDate: '2023-10-01',
      team: ['Rachel Green', 'Tom Wilson', 'Alex Chen'],
      budget: '$180k',
      timelineEvents: [
        { date: '2023-10-01', event: 'Project Kickoff', status: 'completed' },
        { date: '2023-10-15', event: 'Blockchain Platform Selection', status: 'completed' },
        { date: '2023-11-01', event: 'Smart Contract Development', status: 'completed' },
        { date: '2023-12-01', event: 'Pilot Implementation', status: 'completed' },
        { date: '2024-01-15', event: 'Supplier Integration', status: 'completed' },
        { date: '2024-02-15', event: 'Final Validation', status: 'current' }
      ]
    }
  ];

  const currentProject = projects.find(project => project.id === selectedProject);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'blue';
      case 'Near Completion': return 'orange';
      case 'Completed': return 'green';
      case 'On Hold': return 'red';
      default: return 'default';
    }
  };

  const getTimelineColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'current': return 'blue';
      case 'pending': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Select Incubation Project">
            <Select
              placeholder="Select a project"
              value={selectedProject}
              onChange={(value) => setSelectedProject(value)}
              style={{ width: 400 }}
            >
              {projects.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.id} - {project.name}
                </Select.Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>

      {currentProject && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Progress"
                  value={currentProject.progress}
                  suffix="%"
                  prefix={<ProjectOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Progress 
                  percent={currentProject.progress} 
                  strokeColor="#1890ff"
                  style={{ marginTop: 8 }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Team Size"
                  value={currentProject.team.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                  {currentProject.team.join(', ')}
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Budget"
                  value={currentProject.budget}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                  Started: {currentProject.startDate}
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={16}>
              <Card title="Project Details">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Project Name">{currentProject.name}</Descriptions.Item>
                  <Descriptions.Item label="Business Problem">
                    {currentProject.businessProblem}
                  </Descriptions.Item>
                  <Descriptions.Item label="Target Output">
                    {currentProject.targetOutput}
                  </Descriptions.Item>
                  <Descriptions.Item label="Current Stage">{currentProject.currentStage}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={getStatusColor(currentProject.status)}>{currentProject.status}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Key Questions">
                <div style={{ padding: '8px 0' }}>
                  {currentProject.questions.map((question, index) => (
                    <div key={index} style={{ 
                      marginBottom: '12px',
                      padding: '8px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}>
                      {question}
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title="Next Steps">
                <div style={{ padding: '8px 0' }}>
                  {currentProject.nextSteps.map((step, index) => (
                    <div key={index} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                      padding: '8px',
                      border: '1px solid #e8e8e8',
                      borderRadius: '4px'
                    }}>
                      <span style={{ 
                        marginRight: '8px',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        {index + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Project Timeline">
                <Timeline>
                  {currentProject.timelineEvents.map((event, index) => (
                    <Timeline.Item 
                      key={index} 
                      color={getTimelineColor(event.status)}
                    >
                      <div style={{ fontWeight: 500 }}>{event.event}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{event.date}</div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Project;