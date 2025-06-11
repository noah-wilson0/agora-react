import React from 'react';
import styled from '@emotion/styled';
import ModeratorChat from './moderatorChat';

export interface ChatMessage {
  team: '찬성' | '반대' | 'moderator';
  username: string;
  message: string;
  timestamp: Date;
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
  const formattedTimestamp = new Date(timestamp).toLocaleTimeString();
  return (
    <MessageContainer isRight={isRight} team={team}>
      <MessageContent isRight={isRight} team={team}>
        <Username isRight={isRight}>{username}</Username>
        <MessageBubble isRight={isRight} team={team} chatType={chatType} isMe={isMe}>
          {message}
          <Timestamp isRight={isRight}>{formattedTimestamp}</Timestamp>
        </MessageBubble>
      </MessageContent>
    </MessageContainer>
  );
};

const ChatingMessage: React.FC<ChatingMessageProps> = ({ messages = [], chatType }) => {
  return (
    <Container>
      {messages.map((msg, index) => {
        const { key, ...rest} = msg as any;
        return (
          msg.team === 'moderator'
          ? <ModeratorChat key={index} message={msg.message} />
          : <Message key={index} {...rest} chatType={chatType} />
      )})}
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

const MessageContainer = styled.div<{ isRight?: boolean; team: '찬성' | '반대' | 'moderator' }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.7rem;
  justify-content: ${({ isRight }) => (isRight ? 'flex-end' : 'flex-start')};
  user-select: none;
  cursor: default;
`;

const MessageContent = styled.div<{ isRight?: boolean; team: '찬성' | '반대' | 'moderator' }>`
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

// const MessageBubble = styled.div<{ isRight?: boolean; team: '찬성' | '반대' | 'moderator'; chatType?: ChatType; isMe?: boolean }>`
//   position: relative;
//   padding: 0.7rem 1rem;
//   border-radius: 1rem;
//   font-size: 0.95rem;
//   line-height: 1.4;
//   word-break: break-word;
//   background: ${({ team, chatType, isMe }) => {
//     if (chatType === 'debate') {
//       if (isMe) return '#e3f2fd';
//       if (team === '찬성') return '#e8f5e9';
//       if (team === '반대') return '#ffebee';
//       return '#fff';
//     }
//     return isMe ? '#e3f2fd' : '#f0f0f0';
//   }};
//   color: #222;
//   max-width: 70%;
//   user-select: none;
//   cursor: default;
// `;

const MessageBubble = styled.div<{ isRight?: boolean; team: '찬성' | '반대' | 'moderator'; chatType?: ChatType; isMe?: boolean }>`
  position: relative;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  line-height: 1.4;
  background: ${({ team, chatType, isMe }) => {
    if (chatType === 'debate') {
      if (isMe) return '#e3f2fd';
      if (team === '찬성') return '#e8f5e9';
      if (team === '반대') return '#ffebee';
      return '#fff';
    }
    return isMe ? '#e3f2fd' : '#f0f0f0';
  }};
  color: #222;
  max-width: 100%;
  min-width: 80px;
  /* 핵심: */
  word-break: break-word;
  white-space: pre-line;  /* 또는 normal (줄바꿈 적용 안 할 거면) */
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