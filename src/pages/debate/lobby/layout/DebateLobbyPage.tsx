import React from 'react';
import styled from '@emotion/styled';
import DebaterStage from '../../common/debaterStage';
import DebateInfoBox from '../../common/debateInfoBox';
import ChatingPanel from '../../common/chatingPanel';
import DebateLobbyPanel, { Participant } from '../fragments/DebateLobbyPanel';
import DebateChatTitleBar from '../../common/debateChatTitleBar';
import ModeratorChat from '../../common/moderatorChat';

const proParticipants: Participant[] = [
    { id: '1', username: '닉네임 000', isHost: true },
    { id: '2', username: '닉네임001' },
    { id: '3', username: '닉네임 002' }
];
const conParticipants: Participant[] = [];
const maxCount = 3;
const debateInfo = '미드는 황족 라인이다';

const DebateLobbyPage: React.FC = () => {
    const handleAddParticipant = (team: '찬성' | '반대', position: string) => {
        alert(`${team}팀 ${position}에 참가자를 추가합니다.`);
    };

    return (
        <Wrapper>
            <DebaterStage participantCount={proParticipants.length + conParticipants.length} />
            <Content>
                <DebateArea>
                    <DebateLeft>
                        <DebateChatBox>
                            <Spacing>
                                <DebateChatTitleBar
                                    proCount={proParticipants.length}
                                    conCount={conParticipants.length}
                                    maxCount={maxCount}
                                    phaseText="입장 대기중"
                                    timer=""
                                />
                                <ModeratorChat message="입장 대기 중입니다. 원하는 팀과 역할을 선택하세요" />
                            </Spacing>
                            <ChatScrollArea>
                                <DebateLobbyPanel
                                    proParticipants={proParticipants}
                                    conParticipants={conParticipants}
                                    maxCount={maxCount}
                                    onAddParticipant={handleAddParticipant}
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

export default DebateLobbyPage;
