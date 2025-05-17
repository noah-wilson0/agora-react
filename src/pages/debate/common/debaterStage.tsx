import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import logoImg from '../../../assets/logo.png';
import audienceImg from '../../../assets/audience.png';

const MAIN_COLOR = '#007aff';

interface DebaterStageProps {
  participantCount: number;
}

const DebaterStage: React.FC<DebaterStageProps> = ({ participantCount }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Header>
      <Left>
        <ExitButton>토론나가기</ExitButton>
      </Left>
      <Center>
        <LogoBox>
          <LogoText as="button" onClick={() => navigate('/')}>AGORA</LogoText>
        </LogoBox>
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
// Logo -> LogoBox로 변경 (정호준)
// const Logo = styled.img`
//   height: 38px;
//   background: #ddd;
//   border-radius: 8px;
//   padding: 0 2.5rem;
//   object-fit: contain;
//   cursor: pointer;
//   transition: opacity 0.2s;
//   &:hover {
//     opacity: 0.8;
//   }
// `;
const LogoBox = styled.div`
  width: 130px;
  min-width: 110px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 0.5rem 0;
`;
const LogoText = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: ${MAIN_COLOR};
  background: white;
  letter-spacing: 0.1em;
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
