import { useState } from 'react';
import { Card, Row, Col, Statistic, Descriptions, Progress, Tag, Select } from 'antd';
import { UserOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import FunnelChart from './FunnelChart';

const Requisition = () => {
  const [selectedReq, setSelectedReq] = useState('REQ-001');

  const requisitions = [
    {
      id: 'REQ-001',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      datePosted: '2024-01-15',
      status: 'Active',
      hiringManager: 'John Smith',
      applicants: 45,
      inProgress: 8,
      offers: 2
    },
    {
      id: 'REQ-002',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      salary: '$130k - $170k',
      datePosted: '2024-01-20',
      status: 'Active',
      hiringManager: 'Sarah Johnson',
      applicants: 32,
      inProgress: 5,
      offers: 1
    },
    {
      id: 'REQ-003',
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      salary: '$90k - $120k',
      datePosted: '2024-02-01',
      status: 'On Hold',
      hiringManager: 'Mike Chen',
      applicants: 28,
      inProgress: 3,
      offers: 0
    }
  ];

  const currentReq = requisitions.find(req => req.id === selectedReq);

  const getFunnelData = (req: any) => [
    { id: 'applicants', value: req.applicants, label: 'Applicants' },
    { id: 'screening', value: Math.floor(req.applicants * 0.6), label: 'Phone Screen' },
    { id: 'technical', value: Math.floor(req.applicants * 0.4), label: 'Technical Interview' },
    { id: 'onsite', value: Math.floor(req.applicants * 0.25), label: 'Onsite Interview' },
    { id: 'offers', value: req.offers, label: 'Offers Extended' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'On Hold': return 'orange';
      case 'Closed': return 'red';
      default: return 'blue';
    }
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Select Requisition">
            <Select
              placeholder="Select a requisition"
              value={selectedReq}
              onChange={(value) => setSelectedReq(value)}
              style={{ width: 300 }}
            >
              {requisitions.map((req) => (
                <Select.Option key={req.id} value={req.id}>
                  {req.id} - {req.title}
                </Select.Option>
              ))}
            </Select>
          </Card>
        </Col>
      </Row>

      {currentReq && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Applicants"
                  value={currentReq.applicants}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="In Progress"
                  value={currentReq.inProgress}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Offers Extended"
                  value={currentReq.offers}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={16}>
              <Card title={`Pipeline for ${currentReq.title}`} style={{ height: '400px' }}>
                <FunnelChart data={getFunnelData(currentReq)} height="320px" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Requisition Details">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="ID">{currentReq.id}</Descriptions.Item>
                  <Descriptions.Item label="Title">{currentReq.title}</Descriptions.Item>
                  <Descriptions.Item label="Department">{currentReq.department}</Descriptions.Item>
                  <Descriptions.Item label="Location">{currentReq.location}</Descriptions.Item>
                  <Descriptions.Item label="Salary Range">{currentReq.salary}</Descriptions.Item>
                  <Descriptions.Item label="Date Posted">{currentReq.datePosted}</Descriptions.Item>
                  <Descriptions.Item label="Hiring Manager">{currentReq.hiringManager}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={getStatusColor(currentReq.status)}>{currentReq.status}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title="Stage Conversion Rates" size="small">
                <div style={{ padding: '16px 0' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Application → Phone Screen</span>
                      <span>60%</span>
                    </div>
                    <Progress percent={60} strokeColor="#52c41a" />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Phone Screen → Technical</span>
                      <span>67%</span>
                    </div>
                    <Progress percent={67} strokeColor="#1890ff" />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Technical → Onsite</span>
                      <span>63%</span>
                    </div>
                    <Progress percent={63} strokeColor="#faad14" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Onsite → Offer</span>
                      <span>{currentReq.offers > 0 ? Math.round((currentReq.offers / Math.floor(currentReq.applicants * 0.25)) * 100) : 0}%</span>
                    </div>
                    <Progress percent={currentReq.offers > 0 ? Math.round((currentReq.offers / Math.floor(currentReq.applicants * 0.25)) * 100) : 0} strokeColor="#722ed1" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Timeline & Milestones" size="small">
                <div style={{ padding: '16px 0' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>📝 Requisition Posted</span>
                      <span>{currentReq.datePosted}</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>👥 First Applications</span>
                      <span>2024-01-16</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>📞 First Interview</span>
                      <span>2024-01-22</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>💼 First Offer</span>
                      <span>{currentReq.offers > 0 ? '2024-02-15' : 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Requisition;