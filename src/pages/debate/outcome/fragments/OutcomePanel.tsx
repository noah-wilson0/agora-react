import React from 'react';
import styled from '@emotion/styled';

interface OutcomePanelProps {
  proSummary: string;
  conSummary: string;
  proScore: number;
  conScore: number;
  resultText: string;
  onReplay: () => void;
  onArchive: () => void;
}

const OutcomePanel: React.FC<OutcomePanelProps> = ({
  proSummary,
  conSummary,
  proScore,
  conScore,
  resultText,
  onReplay,
  onArchive,
}) => {
  // Prevent division by zero
  const total = proScore + conScore || 1;
  const winner = proScore > conScore ? 'pro' : (conScore > proScore ? 'con' : null);
  return (
    <>
      <SummaryBoxWrap>
        <SummaryBox team="pro" isWinner={winner === 'pro'}>
          <SummaryTitle team="pro">
            찬성측 요약
            {winner === 'pro' && <WinnerEffectBox>🏆 승리</WinnerEffectBox>}
          </SummaryTitle>
          <SummaryContent>{proSummary}</SummaryContent>
        </SummaryBox>
        <SummaryBox team="con" isWinner={winner === 'con'}>
          <SummaryTitle team="con">
            반대측 요약
            {winner === 'con' && <WinnerEffectBox>🏆 승리</WinnerEffectBox>}
          </SummaryTitle>
          <SummaryContent>{conSummary}</SummaryContent>
        </SummaryBox>
      </SummaryBoxWrap>
      <ScoreRow>
        <ScoreBox team="pro" isWinner={winner === 'pro'} style={{ flexGrow: proScore, flexBasis: `${(proScore/total)*100}%` }}>
          {proScore}
          {winner === 'pro' && (
            <WinnerEffect>🏆 승리</WinnerEffect>
          )}
        </ScoreBox>
        <ScoreBox team="con" isWinner={winner === 'con'} style={{ flexGrow: conScore, flexBasis: `${(conScore/total)*100}%` }}>
          {conScore}
          {winner === 'con' && (
            <WinnerEffect>🏆 승리</WinnerEffect>
          )}
        </ScoreBox>
      </ScoreRow>
      <ButtonRow>
        <ActionButton onClick={onReplay}>토론 다시보기</ActionButton>
        <ActionButton onClick={onArchive}>토론 아카이브</ActionButton>
      </ButtonRow>
    </>
  );
};

const SummaryBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 4%;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;
const SummaryBox = styled.div<{ team: 'pro' | 'con'; isWinner?: boolean }>`
  background: #fff;
  border: 3px solid #e0e0e0;
  border-radius: 12px;
  width: 40%;
  min-width: 180px;
  min-height: 120px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.13);
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  transition: border 0.2s, box-shadow 0.3s, background 0.3s;
  outline: none;
  cursor: default;
  ${({ isWinner }) =>
    isWinner &&
    `
      border: 3px solid #ffb300;
      box-shadow: 0 0 16px 2px #ffe082;
    `}
`;
const SummaryTitle = styled.div<{ team: 'pro' | 'con' }>`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ team }) => (team === 'pro' ? '#444' : '#a85a5a')};
  background: ${({ team }) => (team === 'pro' ? '#e3f3fa' : '#fae3e3')};
  border-radius: 12px 12px 0 0;
  padding: 0.5rem 1rem;
  border-bottom: 1.5px solid ${({ team }) => (team === 'pro' ? '#b2d7e9' : '#f5c6cb')};
`;
const SummaryContent = styled.div`
  font-size: 1.08rem;
  color: #222;
  padding: 1rem;
  min-height: 80px;
  word-break: break-word;
`;
const ScoreRow = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 1.2rem;
  width: 100%;
  padding: 0;
`;
const ScoreBox = styled.div<{ team: 'pro' | 'con'; isWinner?: boolean }>`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  background: ${({ team }) => (team === 'pro' ? '#e3f6ff' : '#ffe3e3')};
  color: #222;
  border-radius: 16px;
  padding: 0.7rem 0;
  min-width: 60px;
  transition: flex-basis 0.4s, flex-grow 0.4s, box-shadow 0.3s, border 0.3s;
  position: relative;
  ${({ isWinner }) =>
    isWinner &&
    `
      border: 2.5px solid #ffb300;
      box-shadow: 0 0 12px 2px #ffe082;
    `}
`;
const WinnerEffect = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff9800;
  margin-left: 0.7em;
  vertical-align: middle;
  animation: winner-pop 0.7s cubic-bezier(.68,-0.55,.27,1.55);

  @keyframes winner-pop {
    0% { transform: scale(0.7); opacity: 0; }
    60% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`;
const WinnerEffectBox = styled.span`
  display: inline-block;
  font-size: 1.08rem;
  font-weight: 600;
  color: #ff9800;
  margin-left: 0.7em;
  vertical-align: middle;
  animation: winner-pop 0.7s cubic-bezier(.68,-0.55,.27,1.55);

  @keyframes winner-pop {
    0% { transform: scale(0.7); opacity: 0; }
    60% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-top: auto;
  z-index: 3;
  position: relative;
`;
const ActionButton = styled.button`
  background: #fff;
  border: 1.5px solid #888;
  color: #222;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  &:hover {
    background: #f5f5f5;
    color: #1565c0;
  }
`;

export default OutcomePanel; 