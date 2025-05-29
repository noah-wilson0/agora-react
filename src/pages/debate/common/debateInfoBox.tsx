import React from 'react';
import styled from '@emotion/styled';
import { useDebate } from '../../../contexts/debateInfoContext';

const DebateInfoBox: React.FC = () => {
  const { debateData } = useDebate();
  const { title, category, description } = debateData;

  return (
    <Box>
      <InfoHeader>
        <CategoryTag>{category}</CategoryTag>
      </InfoHeader>
      <InfoTitle>{title}</InfoTitle>
      <InfoDivider />
      <InfoContent>{description}</InfoContent>
    </Box>
  );
};

const Box = styled.div`
  background: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  min-height: 80px;
  max-width: 100%;
  user-select: none;
  cursor: default;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CategoryTag = styled.div`
  background: #f0f6ff;
  color: #007aff;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
`;

const InfoTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.6rem;
  line-height: 1.4;
  user-select: none;
  cursor: default;
`;

const InfoDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e8e8;
  margin: 0.5rem 0;
  user-select: none;
  cursor: default;
`;

const InfoContent = styled.div`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: keep-all;
  letter-spacing: -0.01em;
  user-select: none;
  cursor: default;
`;

export default DebateInfoBox; 