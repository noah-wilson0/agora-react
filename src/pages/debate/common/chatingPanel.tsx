import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import ChatingMessage from './chatingMessage';
import teamChatIcon from '../../../assets/temChat.png';
import openChatIcon from '../../../assets/openChat.png';
import aiChatIcon from '../../../assets/aiChat.png';
import ChatInputBox from './ChatInputBox';

type ChatType = 'team' | 'free' | 'ai';
type TeamType = '찬성' | '반대' | 'moderator';

interface ChatMessage {
  team: TeamType;
  username: string;
  message: string;
  timestamp: Date;
  isMe?: boolean;
}

interface StyledProps {
  isSelected: boolean;
}

const myUsername = '나';

// 채팅별로 방이름, 토픽명 등 만드는 함수
const makeRoomId = (baseRoomId: string, type: ChatType) => `topic-${baseRoomId}-${type}`;


// const initialTeamMessages: ChatMessage[] = [
//   { team: '찬성', username: '유저1', message: '팀 채팅 예시(내 메시지, 왼쪽, 상대)', timestamp: '10:01' },
//   { team: '반대', username: '유저2', message: '팀 채팅 예시(내 메시지, 왼쪽, 상대)', timestamp: '10:02' },
//   { team: '찬성', username: myUsername, message: '팀 채팅 예시(내 메시지, 오른쪽)', timestamp: '10:03', isMe: true },
// ];

// const initialFreeMessages: ChatMessage[] = [
//   { team: '찬성', username: '유저3', message: '자유 채팅 예시(내 메시지, 왼쪽, 상대)', timestamp: '10:04' },
//   { team: '찬성', username: myUsername, message: '자유 채팅 예시(내 메시지, 오른쪽)', timestamp: '10:05', isMe: true },
// ];

const chatIcons: Record<ChatType, string> = {
  free: openChatIcon,
  team: teamChatIcon,
  ai: aiChatIcon,
};

const chatTitles: Record<ChatType, string> = {
  free: '자유 채팅',
  team: '팀 채팅',
  ai: 'AI 채팅',
};

const chatTooltips: Record<ChatType, string> = chatTitles;

const ALL_CHATS: ChatType[] = ['free', 'team', 'ai'];

const ChatingPanel: React.FC<{ baseRoomId?: string; username?: string }> = ({
  baseRoomId = '222', // 실제는 props로 방 id 넘김
  username = myUsername,
  }) => {
  const [openChats, setOpenChats] = useState<ChatType[]>(['free', 'team']);
  const [heights, setHeights] = useState<number[]>([50, 50]);
  const resizingIndex = useRef<number | null>(null);
  const startY = useRef<number>(0);
  const startHeights = useRef<number[]>([]);
  // const [teamMessages, setTeamMessages] = useState<ChatMessage[]>(initialTeamMessages);
  // const [freeMessages, setFreeMessages] = useState<ChatMessage[]>(initialFreeMessages);
  // const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  
  // 각 채팅창의 스크롤 ref를 위한 객체
  const scrollRefs = useRef<Record<ChatType, HTMLDivElement | null>>({
    team: null,
    free: null,
    ai: null
  });

  const [messagesMap, setMessagesMap] = useState<Record<ChatType, ChatMessage[]>>({
    team: [],
    free: [],
    ai: [],
  });
  const [connectedMap, setConnectedMap] = useState<Record<ChatType, boolean>>({
    team: false,
    free: false,
    ai: false,
  });

  const stompClients = useRef<Record<ChatType, Client | null>>({
    team: null,
    free: null,
    ai: null,
  });

  // 닫힌 채팅창 목록
  const closedChats = ALL_CHATS.filter((type) => !openChats.includes(type));

  const openChat = (type: ChatType) => {
    if (openChats.length < 2) {
      setOpenChats((prev) => {
        const newChats = [...prev, type];
        // 새로 열릴 때 높이 비율 재분배
        const newHeights = Array(newChats.length).fill(100 / newChats.length);
        setHeights(newHeights);
        return newChats;
      });
    }
  };

  const closeChat = (type: ChatType) => {
    setOpenChats((prev) => {
      const idx = prev.indexOf(type);
      if (idx === -1) return prev;
      const newChats = prev.filter((t) => t !== type);
      // 닫힌 채팅창의 높이를 위/아래로 분배
      setHeights((oldHeights) => {
        if (oldHeights.length <= 1) return [100];
        const removed = oldHeights[idx];
        const newHeights = oldHeights.filter((_, i) => i !== idx);
        // 분배: 위에 우선, 없으면 아래
        if (idx > 0) newHeights[idx - 1] += removed;
        else if (newHeights.length > 0) newHeights[0] += removed;
        return newHeights;
      });
      return newChats;
    });
  };

  // 리사이저 드래그 핸들러
  const onResizerMouseDown = (idx: number, e: React.MouseEvent) => {
    resizingIndex.current = idx;
    startY.current = e.clientY;
    startHeights.current = [...heights];
    document.body.style.cursor = 'row-resize';
    window.addEventListener('mousemove', onResizerMouseMove);
    window.addEventListener('mouseup', onResizerMouseUp);
  };

  const onResizerMouseMove = (e: MouseEvent) => {
    if (resizingIndex.current === null) return;
    const idx = resizingIndex.current;
    const deltaY = e.clientY - startY.current;
    const panel = document.getElementById('chatting-panel-vertical');
    if (!panel) return;
    const panelHeight = panel.clientHeight;
    const total = startHeights.current[idx] + startHeights.current[idx + 1];
    let h1 = ((startHeights.current[idx] * panelHeight) / 100 + deltaY);
    let h2 = ((startHeights.current[idx + 1] * panelHeight) / 100 - deltaY);
    // 최소 높이 제한 (60px)
    const minH = 60;
    if (h1 < minH) { h2 -= (minH - h1); h1 = minH; }
    if (h2 < minH) { h1 -= (minH - h2); h2 = minH; }

    const newHeights = [...startHeights.current];
    newHeights[idx] = (h1 / panelHeight) * 100;
    newHeights[idx + 1] = (h2 / panelHeight) * 100;
    setHeights(newHeights);
  };

  const onResizerMouseUp = () => {
    resizingIndex.current = null;
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', onResizerMouseMove);
    window.removeEventListener('mouseup', onResizerMouseUp);
  };

  // 채팅창 개수 변화 시 높이 동기화
  useEffect(() => {
    setHeights((prev) => {
      if (prev.length === openChats.length) return prev;
      return Array(openChats.length).fill(100 / openChats.length);
    });
  }, [openChats.length]);

  // 메시지 변경 시 스크롤 아래로 이동
  useEffect(() => {
    openChats.forEach(type => {
      const scrollRef = scrollRefs.current[type];
      if (scrollRef) {
        scrollRef.scrollTop = scrollRef.scrollHeight;
      }
    });
  }, [messagesMap, openChats]);

  // 초기 채팅 내역 불러오기 (axios)
  useEffect(() => {
    openChats.forEach((type) => {
      axios
        .get<ChatMessage[]>('http://localhost:8080/api/chat/history', {
          params: { roomId: baseRoomId, chatType: type, count: 50 },
        })
        .then((res) => {
          console.log(`[${type}] 불러온 메시지:`, res.data);
          setMessagesMap((prev) => ({
            ...prev,
            [type]: res.data.map((m) => ({
              ...m,
              isMe: m.username === username,
            })),
          }));
        });
    });
  }, [baseRoomId, openChats.length]);

  // const handleSendTeam = (msg: string) => {
  //   setTeamMessages(prev => [
  //     ...prev,
  //     {
  //       team: '찬성' as TeamType,
  //       username: myUsername,
  //       message: msg,
  //       timestamp: new Date().toLocaleTimeString().slice(0,5),
  //       isMe: true,
  //     }
  //   ]);
  // };

  // const handleSendFree = (msg: string) => {
  //   setFreeMessages(prev => [
  //     ...prev,
  //     {
  //       team: '찬성' as TeamType,
  //       username: myUsername,
  //       message: msg,
  //       timestamp: new Date().toLocaleTimeString().slice(0,5),
  //       isMe: true,
  //     }
  //   ]);
  // };

  // const handleSendAi = (msg: string) => {
  //   setAiMessages(prev => [
  //     ...prev,
  //     {
  //       team: '찬성' as TeamType,
  //       username: myUsername,
  //       message: msg,
  //       timestamp: new Date().toLocaleTimeString().slice(0,5),
  //       isMe: true,
  //     }
  //   ]);
  // };

  // WebSocket 연결 및 수신
  useEffect(() => {
    openChats.forEach((type) => {
      if (stompClients.current[type]) return;
      const wsUrl = 'ws://localhost:8080/ws-chat';
      const client = new Client({
        webSocketFactory: () => new WebSocket(wsUrl),
        reconnectDelay: 5000,
        debug: (str) => console.log(str),
      });

      client.onConnect = () => {
        setConnectedMap((prev) => ({ ...prev, [type]: true }));
        console.log(`[${type}] Connected!!`);
        client.subscribe(`/sub/chat/room/${makeRoomId(baseRoomId, type)}`, (msg) => {
          console.log(`[${type}] 메시지 수신:`, msg.body);
          try {
            const chatMsg = JSON.parse(msg.body);
            setMessagesMap((prev) => ({
              ...prev,
              [type]: [...(prev[type] || []), { ...chatMsg, isMe: chatMsg.username === username }],
            }));
          } catch (err) {
            console.error('채팅 파싱 오류', err, msg.body);
          }
        });
      };
      client.onDisconnect = () => {
        setConnectedMap((prev) => ({ ...prev, [type]: false }));
      };

      client.activate();
      stompClients.current[type] = client;

      return () => {
        stompClients.current[type]?.deactivate();        
      };
    });
    
  }, [baseRoomId, openChats, username]);

  // 메시지 전송
  const handleSend = (type: ChatType, msg: string) => {
    const client = stompClients.current[type];
    console.log('==== [채팅 전송 디버그] ====');
    console.log('client:', client);
    console.log('connectedMap[type]:', connectedMap[type]);
    console.log('보낼 메시지:', msg);
    if (client && msg && connectedMap[type]) {
      client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          team: '찬성',
          roomId: baseRoomId,
          chatType: type,
          username: username,
          message: msg,
          timestamp: new Date().toISOString(),
        }),
      });
      console.log('>> 메시지 publish 완료');
    } else {
      console.warn('[채팅오류] 연결 상태가 false거나 client 없음 or 메시지 없음');
    }
  };


  return (
    <Container>
      <ChatTypeSelector>
        {closedChats.map((type) => (
          <ChatTypeButton
            key={type}
            isSelected={false}
            onClick={() => openChat(type)}
            title={chatTooltips[type]}
            disabled={openChats.length >= 2}
          >
            <IconImg src={chatIcons[type]} alt={type} />
          </ChatTypeButton>
        ))}
      </ChatTypeSelector>
      <VerticalSplitArea id="chatting-panel-vertical">
        {openChats.map((type, i) => {
          return (
            <React.Fragment key={type}>
              <ChatBox style={{ height: `calc(${heights[i]}% - ${(openChats.length-1)*8/openChats.length}px)` }}>
                <ChatBoxHeader>
                  <ChatBoxTitle>
                    <IconImgSmall src={chatIcons[type]} alt={type} />
                    <ChatBoxTitleText>{chatTitles[type]}</ChatBoxTitleText>
                  </ChatBoxTitle>
                  <CloseBtn onClick={() => closeChat(type)} title="닫기">×</CloseBtn>
                </ChatBoxHeader>
                <ChatContainer ref={el => scrollRefs.current[type] = el}>
                  {type === 'team' && (
                    <ChatingMessage messages={messagesMap.team} chatType="team" />
                  )}
                  {type === 'free' && (
                    <ChatingMessage messages={messagesMap.free} chatType="free" />
                  )}
                  {type === 'ai' && (
                    <ChatingMessage messages={messagesMap.ai} chatType="ai" />
                  )}
                </ChatContainer>
                <ChatInputBox onSend={(msg) => handleSend(type, msg)} />
              </ChatBox>
              {i < openChats.length - 1 && (
                <ResizerBar onMouseDown={(e) => onResizerMouseDown(i, e)} />
              )}
            </React.Fragment>
          );
        })}
      </VerticalSplitArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: #f8f9fa;
`;

const ChatTypeSelector = styled.div`
  display: flex;
  padding: 0.55rem 0.6rem 0.35rem 0.6rem;
  gap: 0.35rem;
  border-bottom: 1.5px solid #e0e0e0;
  background: #f8f9fa;
`;

const ChatTypeButton = styled.button<StyledProps>`
  padding: 0.3rem 0.65rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected ? '#407BFF' : '#f0f0f0'};
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ isSelected }) => isSelected ? '#2456b3' : '#e0e0e0'};
  }
`;

const IconImg = styled.img`
  width: 14px;
  height: 14px;
  object-fit: contain;
`;

const VerticalSplitArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  gap: 0;
  height: 100%;
`;

const ChatBox = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const ChatBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.9rem 0.2rem 0.9rem;
  border-bottom: 1px solid #eee;
`;

const ChatBoxTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const IconImgSmall = styled.img`
  width: 13px;
  height: 13px;
  object-fit: contain;
`;

const ChatBoxTitleText = styled.span`
  font-size: 0.93rem;
  color: #444;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  transition: background 0.15s;
  &:hover {
    background: #f0f0f0;
    color: #d32f2f;
  }
`;

const ResizerBar = styled.div`
  height: 8px;
  background: #e0e0e0;
  cursor: row-resize;
  width: 100%;
  z-index: 2;
  transition: background 0.15s;
  &:hover {
    background: #bdbdbd;
  }
`;

const ChatContainer = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
  padding: 1.2rem 1.2rem 0.7rem 1.2rem;
  min-height: 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

export default ChatingPanel; 