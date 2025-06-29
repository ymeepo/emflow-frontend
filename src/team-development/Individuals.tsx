import { useState } from 'react';
import { Card, Row, Col, Select, Descriptions, Tag, Timeline, Progress, Divider } from 'antd';
// Icon imports removed as Card components don't support icon prop

interface EngineerData {
  id: string;
  name: string;
  position: string;
  level: string;
  team: string;
  tenure: string;
  joinDate: string;
  lastPromotion: string;
  careerAspirations: string;
  projects: Array<{
    name: string;
    role: string;
    duration: string;
    status: 'completed' | 'ongoing' | 'paused';
  }>;
  technicalSkills: Array<{
    category: string;
    skills: Array<{
      name: string;
      proficiency: number;
    }>;
  }>;
  strengths: string[];
  opportunities: string[];
  performanceRating: string;
  goals: Array<{
    goal: string;
    progress: number;
    dueDate: string;
  }>;
}

const Individuals = () => {
  const [selectedEngineer, setSelectedEngineer] = useState('sarah-chen');

  const engineers: EngineerData[] = [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      position: 'Senior Frontend Engineer',
      level: 'Senior Engineer',
      team: 'Frontend Team',
      tenure: '2.5 years',
      joinDate: '2021-08-15',
      lastPromotion: '2024-02-10',
      careerAspirations: 'Transition to Staff Engineer role with focus on frontend architecture and mentoring junior developers',
      projects: [
        { name: 'AI Customer Support Dashboard', role: 'Tech Lead', duration: '6 months', status: 'ongoing' },
        { name: 'React 18 Migration', role: 'Lead Developer', duration: '3 months', status: 'completed' },
        { name: 'Design System Overhaul', role: 'Core Contributor', duration: '4 months', status: 'completed' },
        { name: 'Mobile App Prototype', role: 'Frontend Lead', duration: '2 months', status: 'paused' },
      ],
      technicalSkills: [
        {
          category: 'Frontend',
          skills: [
            { name: 'React', proficiency: 95 },
            { name: 'TypeScript', proficiency: 90 },
            { name: 'CSS/SCSS', proficiency: 85 },
            { name: 'Next.js', proficiency: 80 },
          ]
        },
        {
          category: 'Tools & Platforms',
          skills: [
            { name: 'Git/GitHub', proficiency: 90 },
            { name: 'Webpack', proficiency: 75 },
            { name: 'Jest/Testing', proficiency: 85 },
            { name: 'Figma/Design', proficiency: 70 },
          ]
        },
        {
          category: 'Soft Skills',
          skills: [
            { name: 'Mentoring', proficiency: 85 },
            { name: 'Code Review', proficiency: 90 },
            { name: 'Technical Writing', proficiency: 80 },
            { name: 'Cross-team Collaboration', proficiency: 88 },
          ]
        }
      ],
      strengths: [
        'Excellent technical problem-solving skills',
        'Strong mentoring abilities with junior developers',
        'Deep expertise in modern React patterns and best practices',
        'Effective communicator in technical discussions',
        'Proactive in identifying and addressing technical debt'
      ],
      opportunities: [
        'Expand backend development skills (Node.js, databases)',
        'Develop system design and architecture skills',
        'Gain experience with mobile development (React Native)',
        'Improve public speaking and conference presentation skills'
      ],
      performanceRating: 'Exceeds Expectations',
      goals: [
        { goal: 'Complete AWS certification', progress: 65, dueDate: '2024-06-30' },
        { goal: 'Mentor 2 junior developers', progress: 80, dueDate: '2024-05-31' },
        { goal: 'Lead architecture design for major feature', progress: 45, dueDate: '2024-08-15' },
      ]
    },
    {
      id: 'alex-chen',
      name: 'Alex Chen',
      position: 'Staff Backend Engineer',
      level: 'Staff Engineer',
      team: 'Backend Team',
      tenure: '3.8 years',
      joinDate: '2020-04-20',
      lastPromotion: '2024-01-20',
      careerAspirations: 'Grow into Principal Engineer role with focus on distributed systems and team technical leadership',
      projects: [
        { name: 'Microservices Architecture Migration', role: 'Technical Lead', duration: '8 months', status: 'ongoing' },
        { name: 'API Gateway Implementation', role: 'Architect', duration: '4 months', status: 'completed' },
        { name: 'Database Optimization Project', role: 'Senior Developer', duration: '3 months', status: 'completed' },
        { name: 'Real-time Analytics Pipeline', role: 'Tech Lead', duration: '5 months', status: 'completed' },
      ],
      technicalSkills: [
        {
          category: 'Backend',
          skills: [
            { name: 'Python', proficiency: 95 },
            { name: 'Node.js', proficiency: 88 },
            { name: 'PostgreSQL', proficiency: 90 },
            { name: 'Redis', proficiency: 85 },
          ]
        },
        {
          category: 'Cloud & DevOps',
          skills: [
            { name: 'AWS', proficiency: 92 },
            { name: 'Docker', proficiency: 90 },
            { name: 'Kubernetes', proficiency: 85 },
            { name: 'Terraform', proficiency: 78 },
          ]
        },
        {
          category: 'Architecture',
          skills: [
            { name: 'System Design', proficiency: 90 },
            { name: 'Microservices', proficiency: 88 },
            { name: 'API Design', proficiency: 92 },
            { name: 'Performance Optimization', proficiency: 85 },
          ]
        }
      ],
      strengths: [
        'Exceptional system design and architecture skills',
        'Strong technical leadership across multiple teams',
        'Deep understanding of scalable backend systems',
        'Excellent at breaking down complex problems',
        'Proven ability to deliver high-impact technical solutions'
      ],
      opportunities: [
        'Develop strategic planning and roadmap skills',
        'Expand machine learning and AI knowledge',
        'Improve stakeholder management abilities',
        'Gain experience with emerging technologies (blockchain, edge computing)'
      ],
      performanceRating: 'Outstanding',
      goals: [
        { goal: 'Complete microservices migration', progress: 75, dueDate: '2024-07-31' },
        { goal: 'Establish technical mentorship program', progress: 50, dueDate: '2024-09-30' },
        { goal: 'Present at engineering conference', progress: 30, dueDate: '2024-10-15' },
      ]
    },
    {
      id: 'mike-rodriguez',
      name: 'Mike Rodriguez',
      position: 'Frontend Engineer II',
      level: 'Engineer II',
      team: 'Frontend Team',
      tenure: '1.2 years',
      joinDate: '2022-12-10',
      lastPromotion: '2023-08-15',
      careerAspirations: 'Advance to Senior Engineer and specialize in frontend performance optimization and user experience',
      projects: [
        { name: 'Component Library Expansion', role: 'Developer', duration: '4 months', status: 'ongoing' },
        { name: 'Mobile Responsive Redesign', role: 'Frontend Developer', duration: '3 months', status: 'completed' },
        { name: 'Performance Monitoring Setup', role: 'Developer', duration: '2 months', status: 'completed' },
      ],
      technicalSkills: [
        {
          category: 'Frontend',
          skills: [
            { name: 'React', proficiency: 80 },
            { name: 'JavaScript', proficiency: 85 },
            { name: 'CSS/SCSS', proficiency: 90 },
            { name: 'HTML', proficiency: 95 },
          ]
        },
        {
          category: 'Tools',
          skills: [
            { name: 'Git', proficiency: 85 },
            { name: 'Webpack', proficiency: 65 },
            { name: 'Jest', proficiency: 70 },
            { name: 'Storybook', proficiency: 75 },
          ]
        }
      ],
      strengths: [
        'Strong attention to detail in UI implementation',
        'Excellent CSS and responsive design skills',
        'Quick learner and adaptable to new technologies',
        'Good collaboration skills with design team'
      ],
      opportunities: [
        'Develop TypeScript proficiency',
        'Gain experience with complex state management',
        'Improve testing skills and practices',
        'Learn backend fundamentals for better full-stack understanding'
      ],
      performanceRating: 'Meets Expectations',
      goals: [
        { goal: 'Complete TypeScript certification', progress: 40, dueDate: '2024-05-30' },
        { goal: 'Lead component library feature', progress: 60, dueDate: '2024-06-15' },
        { goal: 'Improve code review participation', progress: 70, dueDate: '2024-04-30' },
      ]
    }
  ];

  const currentEngineer = engineers.find(eng => eng.id === selectedEngineer);

  const getSkillColor = (proficiency: number) => {
    if (proficiency >= 90) return '#52c41a';
    if (proficiency >= 80) return '#1890ff';
    if (proficiency >= 70) return '#faad14';
    return '#f5222d';
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'ongoing': return 'blue';
      case 'paused': return 'orange';
      default: return 'default';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Outstanding': return '#52c41a';
      case 'Exceeds Expectations': return '#1890ff';
      case 'Meets Expectations': return '#faad14';
      default: return '#f5222d';
    }
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Select Engineer">
            <Select
              placeholder="Select an engineer"
              value={selectedEngineer}
              onChange={(value) => setSelectedEngineer(value)}
              style={{ width: 400 }}
            >
              {engineers.map((engineer) => (
                <Select.Option key={engineer.id} value={engineer.id}>
                  {engineer.name} - {engineer.position}
                </Select.Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>

      {currentEngineer && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={16}>
              <Card title="Engineer Profile">
                <Descriptions column={2} size="small">
                  <Descriptions.Item label="Name">{currentEngineer.name}</Descriptions.Item>
                  <Descriptions.Item label="Position">{currentEngineer.position}</Descriptions.Item>
                  <Descriptions.Item label="Level">{currentEngineer.level}</Descriptions.Item>
                  <Descriptions.Item label="Team">{currentEngineer.team}</Descriptions.Item>
                  <Descriptions.Item label="Tenure">{currentEngineer.tenure}</Descriptions.Item>
                  <Descriptions.Item label="Join Date">{currentEngineer.joinDate}</Descriptions.Item>
                  <Descriptions.Item label="Last Promotion">{currentEngineer.lastPromotion}</Descriptions.Item>
                  <Descriptions.Item label="Performance Rating">
                    <Tag color={getRatingColor(currentEngineer.performanceRating)}>
                      {currentEngineer.performanceRating}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <h4>Career Aspirations</h4>
                <p style={{ marginBottom: 0 }}>{currentEngineer.careerAspirations}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Current Goals">
                <div style={{ padding: '8px 0' }}>
                  {currentEngineer.goals.map((goal, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ fontWeight: 500, marginBottom: '4px' }}>{goal.goal}</div>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        Due: {goal.dueDate}
                      </div>
                      <Progress 
                        percent={goal.progress} 
                        size="small"
                        strokeColor={goal.progress >= 80 ? '#52c41a' : goal.progress >= 50 ? '#1890ff' : '#faad14'}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Card title="Project History">
                <Timeline>
                  {currentEngineer.projects.map((project, index) => (
                    <Timeline.Item 
                      key={index} 
                      color={getProjectStatusColor(project.status)}
                    >
                      <div style={{ fontWeight: 500 }}>{project.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {project.role} • {project.duration}
                        <Tag 
                          color={getProjectStatusColor(project.status)} 
                          style={{ marginLeft: 8 }}
                        >
                          {project.status}
                        </Tag>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Technical Skills">
                {currentEngineer.technicalSkills.map((category, categoryIndex) => (
                  <div key={categoryIndex} style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#1890ff' }}>{category.category}</h4>
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} style={{ marginBottom: '12px' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          marginBottom: '4px' 
                        }}>
                          <span>{skill.name}</span>
                          <span style={{ color: getSkillColor(skill.proficiency) }}>
                            {skill.proficiency}%
                          </span>
                        </div>
                        <Progress 
                          percent={skill.proficiency} 
                          strokeColor={getSkillColor(skill.proficiency)}
                          showInfo={false}
                          size="small"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title="Key Strengths" size="small">
                <div style={{ padding: '8px 0' }}>
                  {currentEngineer.strengths.map((strength, index) => (
                    <div key={index} style={{ 
                      marginBottom: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#f6f8fa',
                      borderRadius: '4px',
                      borderLeft: '3px solid #52c41a'
                    }}>
                      {strength}
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Development Opportunities" size="small">
                <div style={{ padding: '8px 0' }}>
                  {currentEngineer.opportunities.map((opportunity, index) => (
                    <div key={index} style={{ 
                      marginBottom: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#fff7e6',
                      borderRadius: '4px',
                      borderLeft: '3px solid #faad14'
                    }}>
                      {opportunity}
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Individuals;