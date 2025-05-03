import React from 'react';
import styled from 'styled-components';

const ModeratorChatContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const ModeratorMessage = styled.div`
  background: #e0e0e0;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  max-width: 70%;
  text-align: center;
`;

interface ModeratorChatProps {
  message: string;
}

const ModeratorChat: React.FC<ModeratorChatProps> = ({ message }) => {
  return (
    <ModeratorChatContainer>
      <ModeratorMessage>{message}</ModeratorMessage>
    </ModeratorChatContainer>
  );
};

export default ModeratorChat;

// 샘플 데이터
const sampleMessage = "토론이 시작되었습니다. 찬성측부터 발언해주세요."; 