import React from 'react';
import styled from '@emotion/styled';
import DebaterStage from '../layout/debaterStage';
import ChatingPanel from '../fragments/chatingPanel';
import ChatingMessage, { ChatMessage } from '../fragments/chatingMessage';

const debateMessages: ChatMessage[] = [
  { team: '찬성', username: '찬성측 000', message: '찬성측 첫 메시지(왼쪽)', timestamp: '05:49' },
  { team: '반대', username: '반대측 001', message: '반대측 첫 메시지(오른쪽)', timestamp: '05:50' },
  { team: '찬성', username: '찬성측 002', message: '찬성측 두 번째 메시지(왼쪽)', timestamp: '05:51' },
  { team: '반대', username: '반대측 003', message: '반대측 두 번째 메시지(오른쪽)', timestamp: '05:52' },
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
              <ChatTitleBar>
                <ChatTeamSide>
                  <TeamLabel>찬성</TeamLabel>
                  <TeamCount>({proCount}/{maxCount})</TeamCount>
                </ChatTeamSide>
                <ChatPhase>{debatePhase}</ChatPhase>
                <ChatTeamSide style={{ justifyContent: 'flex-end' }}>
                  <TeamLabel style={{ color: '#d32f2f' }}>반대</TeamLabel>
                  <TeamCount>({conCount}/{maxCount})</TeamCount>
                </ChatTeamSide>
              </ChatTitleBar>
              <ChatScrollArea>
                <ChatingMessage messages={debateMessages} chatType="debate" />
              </ChatScrollArea>
              <ChatInput>
                <Input placeholder="메시지를 입력하세요" />
                <SendButton>전송</SendButton>
              </ChatInput>
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
  background-color: #f8f9fa;
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
  background: #fff;
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

const ChatTitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  padding-top: 1.2rem;
  margin-bottom: 0.7rem;
  user-select: none;
  cursor: default;
`;

const ChatTeamSide = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  min-width: 70px;
  user-select: none;
  cursor: default;
`;

const TeamLabel = styled.span`
  font-size: 1.13rem;
  color: #388e3c;
  font-weight: 700;
  user-select: none;
  cursor: default;
`;

const TeamCount = styled.span`
  font-size: 0.92rem;
  color: #888;
  font-weight: 500;
  margin-left: 0.1rem;
  user-select: none;
  cursor: default;
`;

const ChatPhase = styled.div`
  font-size: 1.08rem;
  color: #333;
  font-weight: 600;
  text-align: center;
  flex: 1;
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
  background: #fff;
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

const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.7rem 1rem;
  border-top: 1.5px solid #e0e0e0;
  background: #f8f9fa;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.4rem 0.7rem;
  border: 1.5px solid #ddd;
  border-radius: 6px;
  font-size: 0.97rem;
  background: #fff;
  &:focus {
    outline: none;
    border-color: #407BFF;
  }
`;

const SendButton = styled.button`
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #407BFF;
  color: white;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background-color: #2456b3;
  }
`;

export default DiscussionRoom; 