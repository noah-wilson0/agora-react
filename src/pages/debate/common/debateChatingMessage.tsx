import React from 'react';
import styled from '@emotion/styled';
import ModeratorChat from './moderatorChat';

export interface ChatMessage {
  team: '찬성' | '반대' | 'moderator';
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



const Message: React.FC<MessageProps> = ({ team, username, message, timestamp, isMe, chatType }) => {
  let isRight = false;
  if (chatType === 'debate') {
    isRight = team === '반대';
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

const DebateChatingMessage: React.FC<ChatingMessageProps> = ({ messages = [], chatType }) => {
  return (
    <Container>
      {messages.map((msg, index) => (
        msg.team === 'moderator'
          ? <ModeratorChat key={index} message={msg.message} />
          : <Message key={index} {...msg} chatType={chatType} />
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

const MessageBubble = styled.div<{ isRight?: boolean; team: '찬성' | '반대' | 'moderator'; chatType?: ChatType; isMe?: boolean }>`
  position: relative;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  background: ${props => props.team === '찬성' ? '#e8f5e9' : props.team === '반대' ? '#ffebee' : '#fff'};
  color: ${props => props.team === '찬성' ? '#2e7d32' : props.team === '반대' ? '#c62828' : '#000'};
  ${props => props.isMe && `
    background: #e3f2fd;
    color: #1565c0;
  `}
  max-width: 90%;
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

export default DebateChatingMessage; 