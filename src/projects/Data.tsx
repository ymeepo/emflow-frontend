import { useState } from 'react';
import { Card, Table, Input, Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ProjectData {
  id: string;
  name: string;
  businessProblem: string;
  targetOutput: string;
  currentStage: string;
  status: string;
  teamLead: string;
  startDate: string;
  budget: string;
  progress: number;
}

const Data = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: 'PROJ-001',
      name: 'AI-Powered Customer Support',
      businessProblem: 'High volume of repetitive customer inquiries',
      targetOutput: 'Intelligent chatbot for 80% automation',
      currentStage: 'Prototype',
      status: 'In Progress',
      teamLead: 'Sarah Chen',
      startDate: '2024-01-15',
      budget: '$150k',
      progress: 65
    },
    {
      id: 'PROJ-002',
      name: 'Predictive Maintenance IoT',
      businessProblem: 'Unplanned equipment downtime',
      targetOutput: 'IoT sensor network with 2-3 week failure prediction',
      currentStage: 'Discovery',
      status: 'In Progress',
      teamLead: 'John Thompson',
      startDate: '2024-02-01',
      budget: '$200k',
      progress: 40
    },
    {
      id: 'PROJ-003',
      name: 'Blockchain Supply Chain',
      businessProblem: 'Lack of supply chain transparency',
      targetOutput: 'Blockchain tracking system with audit trail',
      currentStage: 'Validation',
      status: 'Near Completion',
      teamLead: 'Rachel Green',
      startDate: '2023-10-01',
      budget: '$180k',
      progress: 90
    },
    {
      id: 'PROJ-004',
      name: 'Voice-Activated Warehouse',
      businessProblem: 'Inefficient warehouse picking process',
      targetOutput: 'Voice-guided picking system',
      currentStage: 'Discovery',
      status: 'In Progress',
      teamLead: 'Mike Rodriguez',
      startDate: '2024-01-20',
      budget: '$120k',
      progress: 25
    },
    {
      id: 'PROJ-005',
      name: 'AR Training Platform',
      businessProblem: 'High training costs and long onboarding',
      targetOutput: 'AR-based employee training modules',
      currentStage: 'Prototype',
      status: 'On Hold',
      teamLead: 'Amy Wang',
      startDate: '2023-12-01',
      budget: '$90k',
      progress: 55
    }
  ]);

  const [editingKey, setEditingKey] = useState('');

  const stages = ['Discovery', 'Prototype', 'Validation', 'Graduation'];
  const statuses = ['In Progress', 'On Hold', 'Near Completion', 'Completed', 'Cancelled'];

  const isEditing = (record: ProjectData) => record.id === editingKey;

  const edit = (record: ProjectData) => {
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = () => {
    setEditingKey('');
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const handleFieldChange = (value: any, id: string, field: keyof ProjectData) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const columns: ColumnsType<ProjectData> = [
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'name')}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Business Problem',
      dataIndex: 'businessProblem',
      key: 'businessProblem',
      width: 250,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Input.TextArea
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'businessProblem')}
              rows={2}
            />
          );
        }
        return (
          <div style={{ 
            maxWidth: '250px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {text}
          </div>
        );
      },
    },
    {
      title: 'Target Output',
      dataIndex: 'targetOutput',
      key: 'targetOutput',
      width: 250,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Input.TextArea
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'targetOutput')}
              rows={2}
            />
          );
        }
        return (
          <div style={{ 
            maxWidth: '250px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {text}
          </div>
        );
      },
    },
    {
      title: 'Stage',
      dataIndex: 'currentStage',
      key: 'currentStage',
      width: 120,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Select
              value={text}
              onChange={(value) => handleFieldChange(value, record.id, 'currentStage')}
              style={{ width: '100%' }}
            >
              {stages.map((stage) => (
                <Select.Option key={stage} value={stage}>
                  {stage}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Select
              value={text}
              onChange={(value) => handleFieldChange(value, record.id, 'status')}
              style={{ width: '100%' }}
            >
              {statuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: 'Team Lead',
      dataIndex: 'teamLead',
      key: 'teamLead',
      width: 120,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'teamLead')}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 110,
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      width: 80,
      render: (text: string, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'budget')}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Progress %',
      dataIndex: 'progress',
      key: 'progress',
      width: 100,
      render: (value: number, record: ProjectData) => {
        if (isEditing(record)) {
          return (
            <Input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(parseInt(e.target.value), record.id, 'progress')}
              min={0}
              max={100}
            />
          );
        }
        return `${value}%`;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record: ProjectData) => {
        const editable = isEditing(record);
        if (editable) {
          return (
            <span>
              <Button
                onClick={() => save()}
                style={{ marginRight: 8 }}
                type="primary"
                size="small"
              >
                Save
              </Button>
              <Button onClick={cancel} size="small">
                Cancel
              </Button>
            </span>
          );
        } else {
          return (
            <span>
              <Button
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                type="primary"
                size="small"
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(record.id)}
                danger
                size="small"
              >
                Delete
              </Button>
            </span>
          );
        }
      },
    },
  ];

  return (
    <div>
      <Card title="Incubation Projects - Editable Data">
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="id"
          pagination={false}
          scroll={{ x: 1500 }}
          size="small"
        />
      </Card>

      <Card title="Project Summary" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: '24px', padding: '16px 0', flexWrap: 'wrap' }}>
          <div>
            <strong>Total Projects:</strong> {projects.length}
          </div>
          <div>
            <strong>In Progress:</strong> {projects.filter(p => p.status === 'In Progress').length}
          </div>
          <div>
            <strong>Near Completion:</strong> {projects.filter(p => p.status === 'Near Completion').length}
          </div>
          <div>
            <strong>On Hold:</strong> {projects.filter(p => p.status === 'On Hold').length}
          </div>
          <div>
            <strong>Avg Progress:</strong> {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
          </div>
          <div>
            <strong>Discovery Stage:</strong> {projects.filter(p => p.currentStage === 'Discovery').length}
          </div>
          <div>
            <strong>Prototype Stage:</strong> {projects.filter(p => p.currentStage === 'Prototype').length}
          </div>
          <div>
            <strong>Validation Stage:</strong> {projects.filter(p => p.currentStage === 'Validation').length}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Data;