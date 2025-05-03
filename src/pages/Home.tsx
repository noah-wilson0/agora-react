import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>토론 플랫폼</Title>
      <Description>
        실시간으로 다양한 주제에 대해 토론하고 의견을 나눠보세요.
      </Description>
      <EnterButton onClick={() => navigate('/discussion')}>
        토론방 입장하기
      </EnterButton>
      <EnterButton onClick={() => navigate('/discussion/vote')} style={{ marginTop: '1rem', backgroundColor: '#34c759' }}>
        토론 투표방 입장
      </EnterButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
`;

const EnterButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Home; 