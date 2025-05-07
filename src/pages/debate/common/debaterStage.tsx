import React from 'react';
import styled from '@emotion/styled';

import logoImg from '../../../assets/logo.png';
import audienceImg from '../../../assets/audience.png';

interface DebaterStageProps {
  participantCount: number;
}

const DebaterStage: React.FC<DebaterStageProps> = ({ participantCount }) => {
  return (
    <Header>
      <Left>
        <ExitButton>토론나가기</ExitButton>
      </Left>
      <Center>
        <Logo src={logoImg} alt="로고" />
      </Center>
      <Right>
        <AudienceIcon src={audienceImg} alt="관전자" />
        <AudienceCount>{participantCount.toString().padStart(3, '0')}</AudienceCount>
      </Right>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  background: #fff;
  border-bottom: 1.5px solid #e0e0e0;
  position: relative;
  padding: 0 2.5rem;
  box-sizing: border-box;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  font-size: 1.15rem;
  color: #222;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  height: 44px;
  border-radius: 8px;
  transition: background 0.15s;
  font-weight: 500;
  &:hover {
    background: #f5f5f5;
  }
`;

const Logo = styled.img`  height: 38px;
  background: #ddd;
  border-radius: 8px;
  padding: 0 2.5rem;
  object-fit: contain;
`;

const AudienceIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const AudienceCount = styled.span`
  font-size: 1.15rem;
  font-weight: 600;
  margin-left: 0.5rem;
  color: #222;
  user-select: none;
  cursor: default;
`;

export default DebaterStage; 
