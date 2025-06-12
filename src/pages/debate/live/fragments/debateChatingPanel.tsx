import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import DebateChatingMessage, { ChatMessage } from '../../common/debateChatingMessage';
import ChatInputBox from '../../common/ChatInputBox';

import DebateChatTitleBar from '../../common/debateChatTitleBar';

type DebatePhase = {
  name: string;
  duration: number;
  team: '찬성' | '반대';
  type: '입론' | '심문' | '반론';
};

const debatePhases: DebatePhase[] = [
  { name: '찬성 입론', duration: 100, team: '찬성', type: '입론' },
  { name: '반대 심문', duration: 100, team: '반대', type: '심문' },
  { name: '반대 입론', duration: 100, team: '반대', type: '입론' },
  { name: '찬성 심문', duration: 100, team: '찬성', type: '심문' },
  { name: '반대 반론', duration: 100, team: '반대', type: '반론' },
  { name: '찬성 반론', duration: 100, team: '찬성', type: '반론' },
];

const DebateChatingPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timerSec, setTimerSec] = useState(debatePhases[0].duration);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 토론 페이즈 전환 + 사회자 메시지 추가
  useEffect(() => {
    if (timerSec <= 0) {
      if (currentPhaseIndex === debatePhases.length - 1) {
        setMessages(prev => [
          ...prev,
          {
            team: 'moderator',
            username: '사회자',
            message: '토론이 종료되었습니다.',
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            isMe: false,
          },
        ]);
        return;
      }

      const nextPhaseIndex = currentPhaseIndex + 1;
      const nextPhase = debatePhases[nextPhaseIndex];

      setCurrentPhaseIndex(nextPhaseIndex);
      setTimerSec(nextPhase.duration);

      setMessages(prev => [
        ...prev,
        {
          team: 'moderator',
          username: '사회자',
          message: `${nextPhase.name}이(가) 시작되었습니다. ${nextPhase.team}측 발언해주세요.`,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          isMe: false,
        },
      ]);
    } else {
      const interval = setInterval(() => {
        setTimerSec(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerSec, currentPhaseIndex]);

  // 초기 진입 시 첫 페이즈 사회자 메시지 한 번만 추가
  useEffect(() => {
    const firstPhase = debatePhases[0];
    setMessages([
      {
        team: 'moderator',
        username: '사회자',
        message: `${firstPhase.name}이(가) 시작되었습니다. ${firstPhase.team}측 발언해주세요.`,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        isMe: false,
      },
    ]);
  }, []);

  // 스크롤 항상 아래로 유지
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 사용자 메시지 전송
  const handleSend = (msg: string) => {
    const match = msg.match(/^(찬성|반대)\s*:\s*(.*)$/);
    let team: '찬성' | '반대' = '찬성';
    let message = msg;
    if (match) {
      team = match[1] as '찬성' | '반대';
      message = match[2];
    }
    // 현재 페이즈의 team과 일치하는 경우에만 메시지 추가
    if (team === debatePhases[currentPhaseIndex].team) {
      setMessages(prev => [
        ...prev,
        {
          team,
          username: team === '찬성' ? '찬성측 000' : '반대측 001',
          message,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          isMe: false,
        },
      ]);
    } else {
      alert(`${debatePhases[currentPhaseIndex].team}측 차례입니다.`);
    }
  };

  const currentPhase = debatePhases[currentPhaseIndex];

  return (
    <Container>
      <DebateChatTitleBar
        proCount={3}
        conCount={3}
        maxCount={5}
        phaseText={currentPhase.name}
        timerSec={timerSec}
      />
      <MessageArea ref={scrollRef}>
        <DebateChatingMessage messages={messages} chatType="debate" />
      </MessageArea>
      <ChatInputBox onSend={handleSend} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageArea = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
  min-height: 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

export default DebateChatingPanel;
