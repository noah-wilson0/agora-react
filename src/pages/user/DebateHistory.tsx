import React from 'react';
import styled from 'styled-components';

interface DebateType {
  id: number;
  category: string;
  isFavorite: boolean;
  title: string;
  agree: number;
  disagree: number;
  result: string;
}

interface DebateHistoryProps {
  debates: DebateType[];
  setDebates: React.Dispatch<React.SetStateAction<DebateType[]>>;
}

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const Th = styled.th`
  background: #f7f7f7;
  font-weight: 600;
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 0.98rem;
`;

const ProgressBar = styled.div`
  background: #eee;
  border-radius: 8px;
  height: 16px;
  width: 120px;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
`;

const Bar = styled.div<{color: string, width: number}>`
  background: ${({color}) => color};
  width: ${({width}) => width}%;
  height: 100%;
  transition: width 0.3s;
`;

export default function DebateHistory({ debates, setDebates }: DebateHistoryProps) {
  const toggleFavorite = (id: number) => {
    setDebates(debates =>
      debates.map(d =>
        d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
      )
    );
  };
  return (
    <div>
      <Title>토론내역확인</Title>
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>분야</Th>
            <Th>토론 주제</Th>
            <Th style={{ textAlign: "left", paddingLeft: "8px" }}>찬성</Th>
            <Th>반대</Th>
            <Th>결과</Th>
          </tr>
        </thead>
        <tbody>
          {debates.map((debate) => (
            <tr key={debate.id}>
              <Td>
                <button
                  aria-label={debate.isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                  onClick={() => toggleFavorite(debate.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  {debate.isFavorite ? <span style={{color: '#FFD600'}}>★</span> : <span style={{color: '#bbb'}}>☆</span>}
                </button>
              </Td>
              <Td>{debate.category}</Td>
              <Td style={{textAlign: "left"}}>{debate.title}</Td>
              <Td>
                <div style={{display: "flex", alignItems: "center", gap: 4, justifyContent: "center"}}>
                  <span style={{color: "#3b82f6"}}>찬{debate.agree}</span>
                  <ProgressBar>
                    <Bar color="#3b82f6" width={50} />
                    <Bar color="#ef4444" width={50} />
                  </ProgressBar>
                </div>
              </Td>
              <Td>
                <span style={{color: "#ef4444"}}>반{debate.disagree}</span>
              </Td>
              <Td>{debate.result}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}