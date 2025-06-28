import { useState } from 'react';
import { Card, Table, Input, Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface CandidateData {
  id: string;
  name: string;
  email: string;
  position: string;
  stage: string;
  source: string;
  appliedDate: string;
  status: string;
}

const Data = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      position: 'Senior Software Engineer',
      stage: 'Technical Interview',
      source: 'LinkedIn',
      appliedDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      position: 'Product Manager',
      stage: 'Onsite Interview',
      source: 'Company Website',
      appliedDate: '2024-01-20',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      position: 'UX Designer',
      stage: 'Phone Screen',
      source: 'Referral',
      appliedDate: '2024-02-01',
      status: 'Active'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      position: 'Data Scientist',
      stage: 'Offer Extended',
      source: 'Indeed',
      appliedDate: '2024-01-25',
      status: 'Pending'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@email.com',
      position: 'Senior Software Engineer',
      stage: 'Rejected',
      source: 'LinkedIn',
      appliedDate: '2024-01-10',
      status: 'Closed'
    }
  ]);

  const [editingKey, setEditingKey] = useState('');

  const stages = [
    'Applied',
    'Phone Screen',
    'Technical Interview',
    'Onsite Interview',
    'Offer Extended',
    'Hired',
    'Rejected'
  ];

  const statuses = ['Active', 'Pending', 'Closed'];
  const sources = ['LinkedIn', 'Company Website', 'Referral', 'Indeed', 'Glassdoor'];

  const isEditing = (record: CandidateData) => record.id === editingKey;

  const edit = (record: CandidateData) => {
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    setEditingKey('');
  };

  const handleDelete = (id: string) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
  };

  const handleFieldChange = (value: any, id: string, field: keyof CandidateData) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const columns: ColumnsType<CandidateData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: CandidateData) => {
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string, record: CandidateData) => {
        if (isEditing(record)) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'email')}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (text: string, record: CandidateData) => {
        if (isEditing(record)) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e.target.value, record.id, 'position')}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (text: string, record: CandidateData) => {
        if (isEditing(record)) {
          return (
            <Select
              value={text}
              onChange={(value) => handleFieldChange(value, record.id, 'stage')}
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
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (text: string, record: CandidateData) => {
        if (isEditing(record)) {
          return (
            <Select
              value={text}
              onChange={(value) => handleFieldChange(value, record.id, 'source')}
              style={{ width: '100%' }}
            >
              {sources.map((source) => (
                <Select.Option key={source} value={source}>
                  {source}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return text;
      },
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string, record: CandidateData) => {
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
      title: 'Actions',
      key: 'actions',
      render: (_, record: CandidateData) => {
        const editable = isEditing(record);
        if (editable) {
          return (
            <span>
              <Button
                onClick={() => save(record.id)}
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
      <Card title="Hiring Data - Editable Table">
        <Table
          columns={columns}
          dataSource={candidates}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Table Summary" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
          <div>
            <strong>Total Candidates:</strong> {candidates.length}
          </div>
          <div>
            <strong>Active:</strong> {candidates.filter(c => c.status === 'Active').length}
          </div>
          <div>
            <strong>Pending:</strong> {candidates.filter(c => c.status === 'Pending').length}
          </div>
          <div>
            <strong>Closed:</strong> {candidates.filter(c => c.status === 'Closed').length}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Data;