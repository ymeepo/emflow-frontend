import { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, Avatar, Typography, Divider, Tag } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined, ClearOutlined, LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'streaming' | 'complete' | 'error';
  data?: any;
}

const Ask = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with questions about your projects, team members, and business insights using our knowledge graph. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      status: 'complete'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamAgentResponse = async (userMessage: string) => {
    // Close any existing EventSource
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Create streaming message placeholder
    const streamingMessage: Message = {
      id: Date.now() + 1,
      text: '',
      isUser: false,
      timestamp: new Date(),
      status: 'streaming'
    };

    setCurrentStreamingMessage(streamingMessage);
    
    try {
      // Make POST request to start streaming
      const response = await fetch('http://localhost:8001/api/v1/agent/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          user_id: 'web-user'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              setCurrentStreamingMessage(prev => {
                if (!prev) return null;
                
                let updatedText = prev.text;
                let updatedData = prev.data;
                let updatedStatus = prev.status;

                if (data.type === 'status') {
                  updatedText += (updatedText ? '\n\n' : '') + `🔄 ${data.message}`;
                } else if (data.type === 'data') {
                  updatedText += (updatedText ? '\n\n' : '') + `📊 ${data.message}`;
                  if (data.data) {
                    updatedData = { ...updatedData, ...data.data };
                  }
                } else if (data.type === 'result') {
                  updatedText += (updatedText ? '\n\n' : '') + `✅ ${data.message}`;
                  if (data.data) {
                    updatedData = { ...updatedData, ...data.data };
                  }
                } else if (data.type === 'complete') {
                  updatedStatus = 'complete';
                } else if (data.type === 'error') {
                  updatedText += (updatedText ? '\n\n' : '') + `❌ ${data.message}`;
                  updatedStatus = 'error';
                }

                return {
                  ...prev,
                  text: updatedText,
                  data: updatedData,
                  status: updatedStatus
                };
              });
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }

      // Mark as complete and move to messages
      setCurrentStreamingMessage(prev => {
        if (prev) {
          const completedMessage = { ...prev, status: 'complete' as const };
          setMessages(prevMessages => [...prevMessages, completedMessage]);
        }
        return null;
      });

    } catch (error) {
      console.error('Error streaming agent response:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: `❌ Error: Failed to get response from AI agent. Please try again. (${error})`,
        isUser: false,
        timestamp: new Date(),
        status: 'error'
      };

      setMessages(prev => [...prev, errorMessage]);
      setCurrentStreamingMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      status: 'complete'
    };

    const messageText = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Stream AI response
    await streamAgentResponse(messageText);
  };

  // Cleanup EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Update scroll when streaming message changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStreamingMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    // Close any active streaming
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. I can help you with questions about your projects, team members, and business insights using our knowledge graph. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
        status: 'complete'
      }
    ]);
    setCurrentStreamingMessage(null);
    setIsLoading(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>AI Assistant</h1>
        <Button 
          icon={<ClearOutlined />} 
          onClick={clearChat}
          type="default"
        >
          Clear Chat
        </Button>
      </div>
      
      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '16px 0',
            maxHeight: '360px'
          }}
        >
          {messages.map((message) => (
            <div key={message.id} style={{ marginBottom: 16 }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: message.isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 8
              }}>
                <Avatar 
                  icon={message.isUser ? <UserOutlined /> : 
                    message.status === 'streaming' ? <LoadingOutlined spin /> : <RobotOutlined />}
                  style={{ 
                    backgroundColor: message.isUser ? 'rgb(38,60,129)' : 
                      message.status === 'error' ? '#ff4d4f' : 'rgb(38,138,155)',
                    flexShrink: 0
                  }}
                />
                <div style={{ 
                  maxWidth: '70%',
                  textAlign: message.isUser ? 'right' : 'left'
                }}>
                  <div style={{
                    backgroundColor: message.isUser ? 'rgb(38,60,129)' : 
                      message.status === 'error' ? '#ff4d4f' : 'rgb(38,138,155)',
                    color: 'rgb(251,249,250)',
                    padding: '12px 16px',
                    borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    display: 'inline-block',
                    wordBreak: 'break-word'
                  }}>
                    <Text style={{ color: 'rgb(251,249,250)', whiteSpace: 'pre-wrap' }}>
                      {message.text}
                    </Text>
                    {message.status === 'streaming' && (
                      <div style={{ marginTop: 8 }}>
                        <Tag color="processing">Streaming...</Tag>
                      </div>
                    )}
                    {message.data && (
                      <div style={{ marginTop: 8, fontSize: '12px', opacity: 0.8 }}>
                        <Text style={{ color: 'rgb(251,249,250)' }}>
                          {JSON.stringify(message.data, null, 2)}
                        </Text>
                      </div>
                    )}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#999', 
                    marginTop: 4,
                    textAlign: message.isUser ? 'right' : 'left'
                  }}>
                    {formatTime(message.timestamp)}
                    {message.status && message.status !== 'complete' && (
                      <Tag color={
                        message.status === 'streaming' ? 'processing' :
                        message.status === 'error' ? 'error' : 'default'
                      } style={{ marginLeft: 8, fontSize: '10px' }}>
                        {message.status}
                      </Tag>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Show current streaming message */}
          {currentStreamingMessage && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: 8
              }}>
                <Avatar 
                  icon={<LoadingOutlined spin />}
                  style={{ backgroundColor: 'rgb(38,138,155)' }}
                />
                <div style={{ maxWidth: '70%' }}>
                  <div style={{
                    backgroundColor: 'rgb(38,138,155)',
                    color: 'rgb(251,249,250)',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    display: 'inline-block',
                    wordBreak: 'break-word'
                  }}>
                    <Text style={{ color: 'rgb(251,249,250)', whiteSpace: 'pre-wrap' }}>
                      {currentStreamingMessage.text || 'AI is processing your request...'}
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Tag color="processing">Streaming...</Tag>
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#999', 
                    marginTop: 4
                  }}>
                    {formatTime(currentStreamingMessage.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <Divider style={{ margin: '16px 0' }} />
        
        <div style={{ display: 'flex', gap: 8 }}>
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={isLoading || currentStreamingMessage !== null}
            style={{ flex: 1 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading || currentStreamingMessage !== null}
            style={{ alignSelf: 'flex-end' }}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Ask;