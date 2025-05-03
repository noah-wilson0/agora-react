import React, { useState } from 'react';
import styled from '@emotion/styled';

interface VoteSummaryPanelProps {
  proSummary: string;
  conSummary: string;
  onVote: (team: 'pro' | 'con') => void;
  hideButton?: boolean;
}

const VoteSummaryPanel: React.FC<VoteSummaryPanelProps> = ({ proSummary, conSummary, onVote, hideButton }) => {
  const [proFocused, setProFocused] = useState(false);
  const [conFocused, setConFocused] = useState(false);

  return (
    <PanelWrapper>
      <SummaryBoxWrap>
        <SummaryBox
          team="pro"
          focused={proFocused}
          tabIndex={0}
          onClick={() => setProFocused(true)}
          onBlur={() => setProFocused(false)}
        >
          <SummaryTitle team="pro">찬성측 요약</SummaryTitle>
          <SummaryContent>{proSummary}</SummaryContent>
        </SummaryBox>
        <SummaryBox
          team="con"
          focused={conFocused}
          tabIndex={0}
          onClick={() => setConFocused(true)}
          onBlur={() => setConFocused(false)}
        >
          <SummaryTitle team="con">반대측 요약</SummaryTitle>
          <SummaryContent>{conSummary}</SummaryContent>
        </SummaryBox>
      </SummaryBoxWrap>
      {!hideButton && (
        <VoteButtonWrapper>
          <VoteButton onClick={() => onVote('pro')}>투표하기</VoteButton>
        </VoteButtonWrapper>
      )}
    </PanelWrapper>
  );
};

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SummaryBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 4%;
  width: 100%;
  height: 100%;
`;

const SummaryBox = styled.div<{ team: 'pro' | 'con'; focused?: boolean }>`
  background: #fff;
  border: 3px solid
    ${({ focused }) => (focused ? '#444' : '#e0e0e0')};
  border-radius: 12px;
  width: 40%;
  min-width: 180px;
  min-height: 120px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.13);
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  transition: border 0.2s;
  outline: none;
  cursor: pointer;
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

const VoteButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2.5rem;
`;

const VoteButton = styled.button`
  background: #fff;
  border: 1.5px solid #888;
  color: #222;
  font-size: 0.72rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.4rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  &:hover {
    background: #f5f5f5;
    color: #1565c0;
  }
`;

export { VoteButtonWrapper, VoteButton };
export default VoteSummaryPanel; 