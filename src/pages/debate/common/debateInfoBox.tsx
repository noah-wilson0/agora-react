import React from 'react';
import styled from '@emotion/styled';

interface DebateInfoBoxProps {
  info: string;
}

const DebateInfoBox: React.FC<DebateInfoBoxProps> = ({ info }) => {
  return (
    <Box>
      <InfoTitle>
        토론 정보
        <InfoDivider />
      </InfoTitle>
      <InfoContent>{info}</InfoContent>
    </Box>
  );
};

const Box = styled.div`
  background: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  padding: 1.1rem 1.5rem 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  min-height: 80px;
  max-width: 100%;
  user-select: none;
  cursor: default;
`;

const InfoTitle = styled.div`
  font-size: 0.92rem;
  color: #888;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: default;
`;

const InfoDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #e0e0e0;
  margin-top: 0.4rem;
  user-select: none;
  cursor: default;
`;

const InfoContent = styled.div`
  font-size: 1.08rem;
  color: #333;
  min-height: 80px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
`;

export default DebateInfoBox; 