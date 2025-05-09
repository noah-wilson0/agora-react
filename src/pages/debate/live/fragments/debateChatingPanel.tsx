import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import ModeratorChat from '../../common/moderatorChat';
import DebateChatingMessage, { ChatMessage } from '../../common/debateChatingMessage';
import ChatInputBox from '../../common/ChatInputBox';
import { debateMessages as initialMessages } from '../layout/DebateLivePage';
/**
 * TODO: 백엔드 연동 전까지는 사용자가 "team: message" 형식으로 입력하면,
 * team 값을 파싱해서 team이 '찬성'이면 왼쪽, '반대'면 오른쪽에 말풍선이 생성되도록 구현됨
 * 그냥 채팅을 입력하면 왼쪽에 말풍선이 생성됨
 */
// 팀명(찬성측/반대측) 제거 함수
function getNickname(username: string) {
  return username.replace(/^(찬성|반대)측\s*/, '');
}

const DebateChatingPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 입력값에서 team 파싱 후 메시지 추가
  const handleSend = (msg: string) => {
    const match = msg.match(/^(찬성|반대)\s*:\s*(.*)$/);
    let team: '찬성' | '반대' = '찬성';
    let message = msg;
    if (match) {
      team = match[1] as '찬성' | '반대';
      message = match[2];
    }
    setMessages(prev => [
      ...prev,
      {
        team,
        username: team === '찬성' ? '찬성측 000' : '반대측 001',
        message,
        timestamp: new Date().toLocaleTimeString().slice(0,5),
        isMe: true,
      }
    ]);
  };

  // 메시지 변경 시 스크롤 아래로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <MessageArea ref={scrollRef}>
        <DebateChatingMessage messages={messages} chatType="debate" />
      </MessageArea>
      <ChatInputBox onSend={handleSend} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageArea = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
  min-height: 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Nickname = styled.div<{ team: '찬성' | '반대' }>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ team }) => (team === '찬성' ? '#388e3c' : '#d32f2f')};
  margin-bottom: 0.18rem;
`;

const MessageBubble = styled.div<{ team: '찬성' | '반대' }>`
  position: relative;
  padding: 0.75rem 1.1rem;
  background-color: ${({ team }) => (team === '찬성' ? '#e8f5e9' : '#ffebee')};
  color: #222;
  border-radius: 1rem;
  max-width: 340px;
  min-width: 60px;
  word-break: break-word;
  font-size: 1.05rem;
  margin-top: 0.1rem;
`;

const Timestamp = styled.span`
  position: absolute;
  bottom: -1.25rem;
  left: 0.5rem;
  font-size: 0.75rem;
  color: #aaa;
`;

export default DebateChatingPanel; 