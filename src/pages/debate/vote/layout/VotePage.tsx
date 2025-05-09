import React from 'react';
import styled from '@emotion/styled';
import DebaterStage from '../../common/debaterStage';
import DebateInfoBox from '../../common/debateInfoBox';
import ChatingPanel from '../../common/chatingPanel';
import ModeratorChat from '../../common/moderatorChat';
import VoteSummaryPanel from '../fragments/VoteSummaryPanel';
import DebateChatTitleBar from '../../common/debateChatTitleBar';

const VotePage: React.FC = () => {
  // 샘플 데이터
  const debateInfo = "미드는 황족 라인이다";
  const proSummary = "찬성측 모든 의견 요약...";
  const conSummary = "반대측 모든 의견 요약...";

  // 투표 핸들러
  const handleVote = (team: 'pro' | 'con') => {
    alert(`${team === 'pro' ? '찬성측' : '반대측'}에 투표하셨습니다!`);
  };

  return (
    <Wrapper>
      <DebaterStage participantCount={6} />
      <Content>
        <DebateArea>
          <DebateLeft>
            <DebateChatBox>
              <Spacing>
                <DebateChatTitleBar
                  proCount={2}
                  conCount={1}
                  maxCount={3}
                  phaseText="투표 진행중"
                  timer="05:49"
                />
                <ModeratorChat message={"투표 시간입니다.\n원하는 팀에 투표하세요"} />
              </Spacing>
              <ChatScrollArea>
                <VoteSummaryPanel
                  proSummary={proSummary}
                  conSummary={conSummary}
                  onVote={handleVote}
                />
              </ChatScrollArea>
            </DebateChatBox>
            <DebateInfoSpacer />
            <DebateInfoBox info={debateInfo} />
          </DebateLeft>
          <ChatingPanelWrapper>
            <ChatingPanel />
          </ChatingPanelWrapper>
        </DebateArea>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 0;
  min-height: 0;
  height: 100%;
`;

const DebateArea = styled.div`
  flex: 1 1 0;
  display: flex;
  padding: 2.2rem 2.2rem 2.2rem 2.2rem;
  gap: 2.2rem;
  min-width: 0;
  min-height: 0;
  height: 100%;
`;

const DebateLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow-y: hidden;
`;

const DebateChatBox = styled.div`
  background: #ffffff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 10 1 0;
  min-height: 0;
  user-select: none;
  cursor: default;
`;

const ChatScrollArea = styled.div`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const DebateInfoSpacer = styled.div`
  height: 0.5rem;
  flex-shrink: 0;
  flex-grow: 0;
`;



const ChatingPanelWrapper = styled.div`
  width: 340px;
  min-width: 300px;
  max-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  overflow-y: hidden;
`;

const Spacing = styled.div`
  margin-bottom: 1rem;
`;

export default VotePage; 