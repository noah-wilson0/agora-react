import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom'; // URL 파라미터 가져오기용
import axios from 'axios';

import DebaterStage from '../../common/debaterStage';
import DebateInfoBox from '../../common/debateInfoBox';
import ChatingPanel from '../../common/chatingPanel';
import ModeratorChat from '../../common/moderatorChat';
import VoteSummaryPanel from '../fragments/VoteSummaryPanel';
import DebateChatTitleBar from '../../common/debateChatTitleBar';
import useTimerNavigate from '../../common/useTimerNavigate';

// 서버에서 받아올 데이터 타입 정의 (Spring Entity/DTO와 일치)
interface SummaryData {
  boardId: number;
  prosContent: string;
  consContent: string;
}

const VotePage: React.FC = () => {
  // 1. URL에서 boardId 가져오기 (예: /vote/1001)
  // const { boardId } = useParams<{ boardId: string }>();

  const boardId = "222"; // 임시 변수
  // 2. 상태 관리 (데이터, 로딩, 에러)
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const safeProSummary = summaryData?.prosContent || "찬성 측 요약 내용이 없습니다.";
  const safeConSummary = summaryData?.consContent || "반대 측 요약 내용이 없습니다.";
  // 샘플 투표 결과 데이터 (이 부분도 추후 API 연동 필요)
  const voteResult = { pro: 10, con: 5, winner: 'pro' };

  const dataForOutcome = {
    voteResult: voteResult,
    proSummary: safeProSummary,
    conSummary: safeConSummary
  };
  
  // 타이머 (결과 페이지로 이동)
  const timerSec = useTimerNavigate(60, '/discussion/outcome', dataForOutcome);

  // 3. 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchSummary = async () => {
      if (!boardId) return;
      
      try {
        setIsLoading(true);
        // Spring Boot Controller 호출 (/api/debates/{boardId}/summary)
        const response = await axios.get<SummaryData>(`http://localhost:8080/api/debates/${boardId}/summary`);
        setSummaryData(response.data);
      } catch (error) {
        console.error("요약 정보를 가져오는데 실패했습니다.", error);
        // 에러 발생 시 빈 값이나 에러 메시지로 대체
        setSummaryData({
          boardId: Number(boardId),
          prosContent: "요약 정보를 불러올 수 없습니다.",
          consContent: "요약 정보를 불러올 수 없습니다."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [boardId]);

  const handleVote = async (team: 'pro' | 'con') => {
    console.log(`${team === 'pro' ? '찬성측' : '반대측'} 투표 처리`);
    
    // [TODO] 실제 투표 API 호출 로직 추가
    // try {
    //   await axios.post(`/api/votes`, { boardId, team });
    //   alert("투표가 완료되었습니다!");
    // } catch (e) { ... }
  };

  // 4. 로딩 중일 때 표시할 화면 (선택 사항)
  if (isLoading) {
    return (
      <Wrapper>
        <LoadingMessage>AI가 토론 내용을 분석하고 있습니다... 🤖</LoadingMessage>
      </Wrapper>
    );
  }

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
                  timerSec={timerSec}
                />
                <ModeratorChat message={"투표 시간입니다.\nAI가 요약한 내용을 참고하여 투표해주세요."} />
              </Spacing>
              <ChatScrollArea>
                {/* 5. 실제 데이터 주입 */}
                <VoteSummaryPanel
                  proSummary={summaryData?.prosContent || "찬성 측 요약이 없습니다."}
                  conSummary={summaryData?.consContent || "반대 측 요약이 없습니다."}
                  onVote={handleVote}
                />
              </ChatScrollArea>
            </DebateChatBox>
            <DebateInfoSpacer />
            <DebateInfoBox />
          </DebateLeft>
          <ChatingPanelWrapper>
            <ChatingPanel />
          </ChatingPanelWrapper>
        </DebateArea>
      </Content>
    </Wrapper>
  );
};

// ... (기존 스타일링 유지)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
`;

// ... (나머지 스타일 컴포넌트들은 기존 코드 그대로 사용)
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