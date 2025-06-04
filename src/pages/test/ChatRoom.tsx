import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";

interface Message {
  sender: string;
  chatType: string;
  message: string;
  sentAt?: string; // 시간 필드 (옵션)
}

interface ChatRoomProps {
  roomId?: string;
  username?: string;
  chatType?: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId = 222, username = "namon" , chatType = "free" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState("");
  const [connected, setConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);

  // ✅ [1] 컴포넌트 마운트 시 과거 메시지 먼저 불러오기
  useEffect(() => {
    axios.get<Message[]>(`http://localhost:8080/api/chat/history`, {
      params: { roomId, chatType, count: 50 },
    })
    .then((res) => {
      setMessages(res.data || []);
    })
    .catch((err) => {
      console.error("과거 메시지 조회 실패", err);
    });
  }, [roomId]);

  // ✅ [2] WebSocket 연결 및 실시간 메시지 수신
  useEffect(() => {
    const wsUrl = 'ws://localhost:8080/ws-chat';
    const client = new Client({
      webSocketFactory: () => new WebSocket(wsUrl),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      setConnected(true);
      client.subscribe(`/sub/chat/room/topic-${roomId}-${chatType}`, (message) => {
        console.log("실시간 수신: ", message.body);
        try {
          const msgObj = JSON.parse(message.body);
          setMessages((prev) => [...prev, msgObj]);
        } catch (e) {
          console.log("메시지 파싱 오류", e, message.body);
        }
      });
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
      setConnected(false);
    };
  }, [roomId]);

  // ✅ [3] 메시지 전송
  const send = () => {
    if (connected && stompClientRef.current && msg.trim() !== "") {
      stompClientRef.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify({
          roomId,
          chatType,
          sender: username,
          message: msg,
          sentAt: new Date().toISOString(),
        }),
      });
      setMsg("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <h3>채팅방: {roomId}</h3>
      <ul style={{ minHeight: 200, listStyle: "none", padding: 0 }}>
        {messages.map((m, i) => (
          <li key={i}>
            <b>{m.sender}</b>: {m.message}
            {m.sentAt && (
              <span style={{ color: "#999", marginLeft: 8, fontSize: 12 }}>
                {new Date(m.sentAt).toLocaleTimeString()}
              </span>
            )}
          </li>
        ))}
      </ul>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        style={{ width: "75%" }}
        placeholder="메시지 입력"
      />
      <button onClick={send} style={{ width: "23%", marginLeft: "2%" }} disabled={!connected || msg.trim() === ""}>
        전송
      </button>
    </div>
  );
};

export default ChatRoom;
