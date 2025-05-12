import React from 'react';
import styled from '@emotion/styled';

interface DebateChatTitleBarProps {
  proCount: number;
  conCount: number;
  maxCount: number;
  phaseText: string;
  timerSec?: number; // 타이머 초를 선택적으로 전달받음
}

function formatTimer(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const DebateChatTitleBar: React.FC<DebateChatTitleBarProps> = ({ proCount, conCount, maxCount, phaseText, timerSec }) => {
  return (
    <BarWrapper>
      <ChatTeamSide>
        <TeamLabel team="pro">찬성</TeamLabel>
        <TeamCount>({proCount}/{maxCount})</TeamCount>
      </ChatTeamSide>
      <ChatPhase>
        {phaseText} {timerSec !== undefined && <Timer>{formatTimer(timerSec)}</Timer>}
      </ChatPhase>
      <ChatTeamSide style={{ justifyContent: 'flex-end' }}>
        <TeamLabel team="con">반대</TeamLabel>
        <TeamCount>({conCount}/{maxCount})</TeamCount>
      </ChatTeamSide>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff !important;
  padding: 1.2rem 1rem 0.7rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  min-height: 2.5rem;
`;

const ChatTeamSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const TeamLabel = styled.span<{ team?: 'pro' | 'con' }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ team }) => team === 'pro' ? '#388e3c' : team === 'con' ? '#d32f2f' : 'inherit'};
`;

const TeamCount = styled.span`
  font-size: 0.85rem;
  color: #444;
  margin-left: 0.2rem;
`;

const ChatPhase = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const Timer = styled.span`
  color: #d32f2f;
  margin-left: 0.5rem;
  font-size: 1.1rem;
`;

export default DebateChatTitleBar; 