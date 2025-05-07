import React from 'react';
import styled from '@emotion/styled';
import ModeratorChat from '../../common/moderatorChat';
import DebateChatingMessage from '../../common/debateChatingMessage';

interface DebateChatingPanelProps {
  messages: ChatMessage[];
}

// 팀명(찬성측/반대측) 제거 함수
function getNickname(username: string) {
  return username.replace(/^(찬성|반대)측\s*/, '');
}

const DebateChatingPanel: React.FC<DebateChatingPanelProps> = ({ messages }) => {
  return (
    <Container>
      <DebateChatingMessage messages={messages} chatType="debate" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
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