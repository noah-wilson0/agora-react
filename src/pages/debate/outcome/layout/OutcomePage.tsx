import React from 'react';
import styled from '@emotion/styled';
import DebaterStage from '../../common/debaterStage';
import OutcomePanel from '../fragments/OutcomePanel';
import DebateInfoBox from '../../common/debateInfoBox';
import ChatingPanel from '../../common/chatingPanel';
import DebateChatTitleBar from '../../common/debateChatTitleBar';
import ModeratorChat from '../../common/moderatorChat';
import { useLocation } from 'react-router-dom';

const proSummary = '찬성측 모든 의견 요약...';
const conSummary = '반대측 모든 의견 요약...';
const proScore = 200;
const conScore = 100;
const resultText = '투표 결과!\n총 투표 000표\n찬성 00표 반대 00표\n찬성측 승리!!';
const debateInfo = '미드는 황족 라인이다';
/**
 * 
 * TODO: 투표 결과 state값을 console.log로 출력되는 구조를 적용 중 추후 삭제 예정
 */
const OutcomePage: React.FC = () => {
  const location = useLocation();
  console.log('전달받은 투표 결과:', location.state);
  const handleReplay = () => alert('토론 다시보기');
  const handleArchive = () => alert('토론 아카이브');

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
                  phaseText="투표 결과"
                />
                <ModeratorChat message="투표가 완료되었습니다. 투표결과를 확인하세요" />
              </Spacing>
              <ChatScrollArea>
                <OutcomePanel
                  proSummary={proSummary}
                  conSummary={conSummary}
                  proScore={proScore}
                  conScore={conScore}
                  resultText={resultText}
                  onReplay={handleReplay}
                  onArchive={handleArchive}
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

export default OutcomePage; 