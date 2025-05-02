import React from 'react';
import styled from '@emotion/styled';

export interface ChatMessage {
  team: '찬성' | '반대';
  username: string;
  message: string;
  timestamp: string;
  isMe?: boolean;
}

type ChatType = 'team' | 'free' | 'ai' | 'debate';

interface ChatingMessageProps {
  messages: ChatMessage[];
  chatType?: ChatType;
}

interface MessageProps extends ChatMessage {
  chatType?: ChatType;
}

interface StyledProps {
  team: '찬성' | '반대';
  isMe?: boolean;
  isRight?: boolean;
}

const Message: React.FC<MessageProps> = ({ team, username, message, timestamp, isMe, chatType }) => {
  // 토론 채팅: 찬성측(초록) 왼쪽, 반대측(빨강) 오른쪽
  // 팀/자유 채팅: 내 메시지 오른쪽, 남 메시지 왼쪽
  // AI/기타: 모두 왼쪽
  let isRight = false;
  if (chatType === 'debate') {
    isRight = team === '반대'; // 반대측(빨강)은 오른쪽, 찬성측(초록)은 왼쪽
  } else if (chatType === 'team' || chatType === 'free') {
    isRight = !!isMe;
  } else {
    isRight = false;
  }
  return (
    <MessageContainer isRight={isRight} team={team}>
      <MessageContent isRight={isRight} team={team}>
        <Username isRight={isRight}>{username}</Username>
        <MessageBubble isRight={isRight} team={team} chatType={chatType} isMe={isMe}>
          {message}
          <Timestamp isRight={isRight}>{timestamp}</Timestamp>
        </MessageBubble>
      </MessageContent>
    </MessageContainer>
  );
};

const ChatingMessage: React.FC<ChatingMessageProps> = ({ messages = [], chatType }) => {
  return (
    <Container>
      {messages.map((msg, index) => (
        <Message key={index} {...msg} chatType={chatType} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  user-select: none;
  cursor: default;
`;

const MessageContainer = styled.div<{ isRight?: boolean; team: '찬성' | '반대' }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.7rem;
  justify-content: ${({ isRight }) => (isRight ? 'flex-end' : 'flex-start')};
  user-select: none;
  cursor: default;
`;

const MessageContent = styled.div<{ isRight?: boolean; team: '찬성' | '반대' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isRight }) => (isRight ? 'flex-end' : 'flex-start')};
  user-select: none;
  cursor: default;
`;

const Username = styled.span<{ isRight?: boolean }>`
  font-size: 0.82rem;
  color: #888;
  margin-bottom: 0.15rem;
  width: 100%;
  text-align: ${({ isRight }) => (isRight ? 'right' : 'left')};
  user-select: none;
  cursor: default;
`;

const MessageBubble = styled.div<{ isRight?: boolean; team: '찬성' | '반대'; chatType?: ChatType; isMe?: boolean }>`
  position: relative;
  padding: 0.5rem 1.1rem;
  background-color: ${({ team, chatType, isMe }) => {
    if (chatType === 'debate') {
      return team === '찬성' ? '#e8f5e9' : '#ffebee';
    }
    if (chatType === 'team' || chatType === 'free') {
      return isMe ? '#e3f0ff' : '#f0f0f0';
    }
    return '#f0f0f0';
  }};
  color: #222;
  border-radius: 1rem;
  max-width: 340px;
  min-width: 60px;
  word-break: break-word;
  font-size: 1.05rem;
  line-height: 1.2;
  margin-top: 0.1rem;
  ${({ isRight }) => isRight && 'margin-left: auto;'}
  user-select: none;
  cursor: default;
`;

const Timestamp = styled.span<{ isRight?: boolean }>`
  position: absolute;
  bottom: -1.25rem;
  ${({ isRight }) => (isRight ? 'right: 0.5rem;' : 'left: 0.5rem;')}
  font-size: 0.75rem;
  color: #aaa;
  user-select: none;
  cursor: default;
`;

export default ChatingMessage; 