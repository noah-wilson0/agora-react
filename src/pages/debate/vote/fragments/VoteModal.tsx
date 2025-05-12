import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVote: (team: 'pro' | 'con') => void;
  selectedTeam?: 'pro' | 'con';
  onResetVote?: () => void;
}

const VoteModal: React.FC<VoteModalProps> = ({ isOpen, onClose, onVote, selectedTeam, onResetVote }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasNewVote, setHasNewVote] = useState(false);
  const [initialVote, setInitialVote] = useState<'pro' | 'con' | undefined>(selectedTeam);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setHasNewVote(false);
      if (selectedTeam) {
        setInitialVote(selectedTeam);
      }
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedTeam]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleRevote = () => {
    setIsResetting(true);
    setHasNewVote(false);
    if (onResetVote) {
      onResetVote();
    }
  };

  const handleVote = (team: 'pro' | 'con') => {
    setHasNewVote(true);
    onVote(team);
  };

  const handleClose = () => {
    if ((isResetting || !hasNewVote) && initialVote) {
      onVote(initialVote);
    }
    setIsResetting(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>×</CloseButton>
        <ModalTitle>투표하기</ModalTitle>
        <ButtonGroup>
          <VoteOptionButton
            team="pro"
            selected={selectedTeam === 'pro'}
            onClick={() => handleVote('pro')}
          >
            찬성팀에 투표
          </VoteOptionButton>
          <VoteOptionButton
            team="con"
            selected={selectedTeam === 'con'}
            onClick={() => handleVote('con')}
          >
            반대팀에 투표
          </VoteOptionButton>
        </ButtonGroup>
        {selectedTeam && (
          <RevoteButton onClick={handleRevote}>
            다시 투표하기
          </RevoteButton>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  animation: slideIn 0.2s ease-in-out;
  position: relative;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const VoteOptionButton = styled.button<{ team: 'pro' | 'con'; selected?: boolean }>`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ team, selected }) => 
    selected 
      ? (team === 'pro' ? '#1565c0' : '#c62828')
      : (team === 'pro' ? '#e3f2fd' : '#ffebee')};
  background: ${({ team, selected }) => 
    selected 
      ? (team === 'pro' ? '#1565c0' : '#c62828')
      : 'white'};
  color: ${({ team, selected }) => 
    selected 
      ? 'white'
      : (team === 'pro' ? '#1565c0' : '#c62828')};

  &:hover {
    background: ${({ team }) => 
      team === 'pro' ? '#1565c0' : '#c62828'};
    color: white;
  }
`;

const RevoteButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  background: #f5f5f5;
  color: #666;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }
`;

export default VoteModal;