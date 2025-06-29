import { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, Avatar, Typography, Divider } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined, ClearOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Ask = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with questions about your projects, data analysis, business insights, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Based on the data patterns I've observed, here's what I think...",
      "Great question! Let me analyze that for you. From what I can see in your project metrics...",
      "I'd be happy to help with that. Looking at your current data, here are some insights...",
      "Excellent point! Based on the trends I'm seeing in your projects and hiring data...",
      "That's a complex topic. Let me break it down based on the information available...",
      "I can definitely help with that analysis. Here's what the data suggests...",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (userMessage.toLowerCase().includes('project')) {
      return `${randomResponse} Your incubation projects are showing good progress with an average completion rate of 75%. I notice you have 12 active projects currently, with most in the prototype phase.`;
    } else if (userMessage.toLowerCase().includes('hiring')) {
      return `${randomResponse} Your hiring pipeline is performing well with a 5% overall conversion rate. The average time from application to offer is about 4.1 months.`;
    } else if (userMessage.toLowerCase().includes('data')) {
      return `${randomResponse} I can see various metrics across your projects and hiring processes. Would you like me to analyze any specific dataset or trend?`;
    } else {
      return `${randomResponse} I'm here to help you understand your business metrics, project performance, and hiring analytics. Feel free to ask about any specific area you'd like to explore!`;
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: simulateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. I can help you with questions about your projects, data analysis, business insights, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
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
                  icon={message.isUser ? <UserOutlined /> : <RobotOutlined />}
                  style={{ 
                    backgroundColor: message.isUser ? 'rgb(38,60,129)' : 'rgb(38,138,155)',
                    flexShrink: 0
                  }}
                />
                <div style={{ 
                  maxWidth: '70%',
                  textAlign: message.isUser ? 'right' : 'left'
                }}>
                  <div style={{
                    backgroundColor: message.isUser ? 'rgb(38,60,129)' : 'rgb(38,138,155)',
                    color: 'rgb(251,249,250)',
                    padding: '12px 16px',
                    borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    display: 'inline-block',
                    wordBreak: 'break-word'
                  }}>
                    <Text style={{ color: message.isUser ? 'rgb(251,249,250)' : 'inherit' }}>
                      {message.text}
                    </Text>
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#999', 
                    marginTop: 4,
                    textAlign: message.isUser ? 'right' : 'left'
                  }}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: 8
              }}>
                <Avatar 
                  icon={<RobotOutlined />}
                  style={{ backgroundColor: '#52c41a' }}
                />
                <div style={{
                  backgroundColor: '#f6f6f6',
                  padding: '12px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'inline-block'
                }}>
                  <Text style={{ color: '#999' }}>
                    AI is typing...
                  </Text>
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
            disabled={isLoading}
            style={{ flex: 1 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
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