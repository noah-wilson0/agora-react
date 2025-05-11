import React, { useState } from 'react';
import styled from '@emotion/styled';
import VoteModal from './VoteModal';

interface VoteButtonProps {
  onClick: (team: 'pro' | 'con') => void;
  children: React.ReactNode;
  selectedTeam?: 'pro' | 'con';
  onResetVote?: () => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ onClick, children, selectedTeam, onResetVote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVote = (team: 'pro' | 'con') => {
    onClick(team);
    setIsModalOpen(false);
  };

  return (
    <>
      <VoteButtonWrapper>
        <StyledVoteButton onClick={() => setIsModalOpen(true)}>
          {children}
        </StyledVoteButton>
      </VoteButtonWrapper>
      <VoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVote={handleVote}
        selectedTeam={selectedTeam}
        onResetVote={onResetVote}
      />
    </>
  );
};

const VoteButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2.5rem;
`;

const StyledVoteButton = styled.button`
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

export { VoteButtonWrapper };
export default VoteButton; 