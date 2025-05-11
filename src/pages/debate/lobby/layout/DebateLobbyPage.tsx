import React, { useState } from 'react';
import styled from '@emotion/styled';
import DebaterStage from '../../common/debaterStage';
import DebateInfoBox from '../../common/debateInfoBox';
import ChatingPanel from '../../common/chatingPanel';
import DebateLobbyPanel, { Participant } from '../fragments/DebateLobbyPanel';
import DebateChatTitleBar from '../../common/debateChatTitleBar';
import ModeratorChat from '../../common/moderatorChat';

// 임의의 참가자 데이터
const availableParticipants: Record<'찬성' | '반대', Participant[]> = {
  찬성: [
    { id: '1', username: '찬성측 001', isHost: false },
    { id: '2', username: '찬성측 002', isHost: false },
    { id: '3', username: '찬성측 003', isHost: false }
  ],
  반대: [
    { id: '4', username: '반대측 001', isHost: false },
    { id: '5', username: '반대측 002', isHost: false },
    { id: '6', username: '반대측 003', isHost: false }
  ]
};

const maxCount = 3;
const debateInfo = '미드는 황족 라인이다';

const DebateLobbyPage: React.FC = () => {
    const [proParticipants, setProParticipants] = useState<Participant[]>([]);
    const [conParticipants, setConParticipants] = useState<Participant[]>([]);

    // 실제 참가자 수 계산 함수
    const getParticipantCount = (participants: Participant[]) => {
        return participants.filter(p => p !== undefined && p !== null).length;
    };

    const handleAddParticipant = (team: '찬성' | '반대', position: string) => {
        const currentParticipants = team === '찬성' ? proParticipants : conParticipants;
        const availableTeamParticipants = availableParticipants[team];
        
        // 해당 팀의 참가 가능한 인원이 있는지 확인
        if (getParticipantCount(currentParticipants) >= maxCount) {
            alert(`${team}팀은 최대 ${maxCount}명까지만 참가할 수 있습니다.`);
            return;
        }

        // 아직 참가하지 않은 인원 중 첫 번째 인원을 추가
        const nextParticipant = availableTeamParticipants.find(
            p => !currentParticipants.some(cp => cp && cp.id === p.id)
        );

        if (nextParticipant) {
            // position에 따라 새로운 배열 생성
            const newParticipants = [...currentParticipants];
            const positionIndex = ['입론', '심문', '반론'].indexOf(position);
            
            // 해당 위치에 참가자 추가
            newParticipants[positionIndex] = nextParticipant;

            if (team === '찬성') {
                setProParticipants(newParticipants);
            } else {
                setConParticipants(newParticipants);
            }
        } else {
            alert(`${team}팀의 참가 가능한 인원이 없습니다.`);
        }
    };

    return (
        <Wrapper>
            <DebaterStage participantCount={getParticipantCount(proParticipants) + getParticipantCount(conParticipants)} />
            <Content>
                <DebateArea>
                    <DebateLeft>
                        <DebateChatBox>
                            <Spacing>
                                <DebateChatTitleBar
                                    proCount={getParticipantCount(proParticipants)}
                                    conCount={getParticipantCount(conParticipants)}
                                    maxCount={maxCount}
                                    phaseText="입장 대기중"
                                    timerSec={0}
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
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 0;
  min-height: 0;
  height: 100%;
  align-items: center;
`;

const DebateArea = styled.div`
  flex: 1 1 0;
  display: flex;
  padding: 4rem 2.2rem 2.2rem 2.2rem;
  gap: 2.2rem;
  min-width: 0;
  min-height: 0;
  height: 100%;
  align-items: center;
`;

const DebateLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow-y: hidden;
  justify-content: center;
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
