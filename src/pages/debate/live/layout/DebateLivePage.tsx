import React from 'react';
import styled from '@emotion/styled';
import DebaterStage from '../../common/debaterStage';
import ChatingPanel from '../../common/chatingPanel';
import DebateChatingPanel from '../fragments/debateChatingPanel';
import { ChatMessage } from '../../common/debateChatingMessage';

import DebateChatTitleBar from '../../common/debateChatTitleBar';

export const debateMessages: ChatMessage[] = [
  { team: 'moderator', username: '사회자', message: '토론이 시작되었습니다. 찬성측부터 발언해주세요.', timestamp: '05:50' },
  { team: '찬성', username: '찬성측 000', message: '찬성측 첫 메시지(왼쪽)11111111111111111111111111111111111111111111111111111111111', timestamp: '05:49' },
  { team: '반대', username: '반대측 001', message: '반대측 첫 메시지(오른쪽)', timestamp: '05:51' },
  { team: '찬성', username: '찬성측 002', message: '찬성측 두 번째 메시지(왼쪽)', timestamp: '05:52' },
  { team: '반대', username: '반대측 003', message: '반대측 두 번째 메시지(오른쪽)', timestamp: '05:53' },
  { team: 'moderator', username: '사회자자', message: '반론이 시작되었습니다. 찬성측부터 발언해주세요.', timestamp: '05:54' }

];

const debateInfo = '미드는 황족 라인이다';

// 예시 인원수 및 진행상황
const proCount = 2;
const conCount = 1;
const maxCount = 3;
const debatePhase = '찬성측 입론';

const DiscussionRoom: React.FC = () => {
  return (
    <Wrapper>
      <DebaterStage participantCount={2} />
      <Content>
        <DebateArea>
          <DebateLeft>
            <DebateChatBox>
              <DebateChatTitleBar
                proCount={proCount}
                conCount={conCount}
                maxCount={maxCount}
                phaseText={debatePhase}
                timer="5:00"
              />
              <ChatScrollArea>
                <DebateChatingPanel />
              </ChatScrollArea>
            </DebateChatBox>
            <DebateInfoSpacer />
            <DebateInfoBox>
              <InfoTitle>
                토론 정보
                <InfoDivider />
              </InfoTitle>
              <InfoContent>{debateInfo}</InfoContent>
            </DebateInfoBox>
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

const DebateInfoBox = styled.div`
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

export default DiscussionRoom; 