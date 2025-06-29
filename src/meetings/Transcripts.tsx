import { useState } from 'react';
import { Card, Table, Button, Tag, Space } from 'antd';
import { FileTextOutlined, SoundOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface TranscriptData {
  id: string;
  meetingName: string;
  date: string;
  time: string;
  duration: string;
  transcriptLink: string;
  hasNotes: boolean;
  notesLink?: string;
  status: 'completed' | 'processing' | 'failed';
}

const Transcripts = () => {
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([
    {
      id: '1',
      meetingName: 'Weekly Project Standup',
      date: '2024-02-15',
      time: '10:00 AM',
      duration: '45 minutes',
      transcriptLink: '/dummy-transcripts/weekly-standup.txt',
      hasNotes: true,
      notesLink: '/dummy-notes/weekly-standup-notes.txt',
      status: 'completed'
    },
    {
      id: '2',
      meetingName: 'Q1 Planning Meeting',
      date: '2024-02-14',
      time: '2:00 PM',
      duration: '1 hour 30 minutes',
      transcriptLink: '/dummy-transcripts/q1-planning.txt',
      hasNotes: false,
      status: 'completed'
    },
    {
      id: '3',
      meetingName: 'Product Review Session',
      date: '2024-02-13',
      time: '3:30 PM',
      duration: '1 hour',
      transcriptLink: '/dummy-transcripts/product-review.txt',
      hasNotes: true,
      notesLink: '/dummy-notes/product-review-notes.txt',
      status: 'completed'
    },
    {
      id: '4',
      meetingName: 'Client Feedback Call',
      date: '2024-02-12',
      time: '11:00 AM',
      duration: '30 minutes',
      transcriptLink: '/dummy-transcripts/client-feedback.txt',
      hasNotes: false,
      status: 'completed'
    },
    {
      id: '5',
      meetingName: 'Engineering Deep Dive',
      date: '2024-02-11',
      time: '4:00 PM',
      duration: '2 hours',
      transcriptLink: '/dummy-transcripts/engineering-deep-dive.txt',
      hasNotes: false,
      status: 'processing'
    }
  ]);

  const [generatingNotes, setGeneratingNotes] = useState<string | null>(null);

  const handleGenerateNotes = async (transcriptId: string) => {
    setGeneratingNotes(transcriptId);
    
    // Simulate API call delay
    setTimeout(() => {
      setTranscripts(prev => 
        prev.map(transcript => 
          transcript.id === transcriptId 
            ? { 
                ...transcript, 
                hasNotes: true, 
                notesLink: `/dummy-notes/meeting-${transcriptId}-notes.txt` 
              }
            : transcript
        )
      );
      setGeneratingNotes(null);
    }, 2000);
  };

  const formatDateTime = (date: string, time: string) => {
    return `${date} at ${time}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'processing': return 'blue';
      case 'failed': return 'red';
      default: return 'default';
    }
  };

  const columns: ColumnsType<TranscriptData> = [
    {
      title: 'Meeting Name',
      dataIndex: 'meetingName',
      key: 'meetingName',
      render: (text: string) => (
        <Space>
          <SoundOutlined style={{ color: '#1890ff' }} />
          <strong>{text}</strong>
        </Space>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <div>
          <div>{record.date}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Transcript',
      dataIndex: 'transcriptLink',
      key: 'transcriptLink',
      render: (link: string, record) => (
        record.status === 'completed' ? (
          <Button 
            type="link" 
            icon={<FileTextOutlined />}
            href={link}
            target="_blank"
          >
            View Transcript
          </Button>
        ) : (
          <span style={{ color: '#999' }}>Processing...</span>
        )
      ),
    },
    {
      title: 'Meeting Notes',
      key: 'notes',
      render: (_, record) => (
        <div>
          {record.hasNotes ? (
            <Button 
              type="link" 
              icon={<FileTextOutlined />}
              href={record.notesLink}
              target="_blank"
            >
              View Notes
            </Button>
          ) : record.status === 'completed' ? (
            <Button
              type="primary"
              size="small"
              loading={generatingNotes === record.id}
              onClick={() => handleGenerateNotes(record.id)}
              disabled={generatingNotes !== null}
            >
              {generatingNotes === record.id ? 'Generating...' : 'Generate Notes'}
            </Button>
          ) : (
            <span style={{ color: '#999' }}>Transcript needed first</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card title="Meeting Transcripts" extra={
        <Space>
          <Tag color="green">{transcripts.filter(t => t.status === 'completed').length} Completed</Tag>
          <Tag color="blue">{transcripts.filter(t => t.status === 'processing').length} Processing</Tag>
        </Space>
      }>
        <Table
          columns={columns}
          dataSource={transcripts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} transcripts`,
          }}
        />
      </Card>

      <Card title="Summary Statistics" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: '24px', padding: '16px 0', flexWrap: 'wrap' }}>
          <div>
            <strong>Total Meetings:</strong> {transcripts.length}
          </div>
          <div>
            <strong>With Notes:</strong> {transcripts.filter(t => t.hasNotes).length}
          </div>
          <div>
            <strong>Processing:</strong> {transcripts.filter(t => t.status === 'processing').length}
          </div>
          <div>
            <strong>Avg Duration:</strong> ~1 hour 15 min
          </div>
          <div>
            <strong>This Week:</strong> {transcripts.filter(t => t.date >= '2024-02-12').length} meetings
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Transcripts;