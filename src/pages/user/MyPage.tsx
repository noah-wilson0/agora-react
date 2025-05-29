import React, { useState } from 'react';
import styled from 'styled-components';
import DebateHistory from './DebateHistory';
import EditProfile from './EditProfile';

interface DebateType {
  id: number;
  category: string;
  isFavorite: boolean;
  title: string;
  agree: number;
  disagree: number;
  result: string;
}

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  flex-direction: row;
`;

const SideBar = styled.div`
  width: 220px;
  padding: 40px 0 0 40px;
  background: #fff;
  border-right: 1px solid #eee;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  padding: 40px 48px 0 48px;
  background: #fff;
  min-height: 100vh;
`;

const Profile = styled.div`
  margin-bottom: 24px;
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

const Category = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 8px;
`;

const Footer = styled.div`
  background: #eee;
  text-align: center;
  padding: 12px 0;
  margin-top: 40px;
  color: #888;
  font-size: 0.95rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Nav = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const NavItem = styled.div<{active?: boolean}>`
  font-weight: ${({active}) => (active ? 'bold' : 'normal')};
  color: ${({active}) => (active ? '#222' : '#888')};
  border-bottom: ${({active}) => (active ? '2px solid #222' : 'none')};
  padding-bottom: 4px;
  cursor: pointer;
`;

const initialDebates: DebateType[] = [
  {
    id: 1,
    category: "정책",
    isFavorite: true,
    title: "암호화폐는 기존 화폐를 완전히 대체할 수 있는가?",
    agree: 10,
    disagree: 10,
    result: "승리"
  },
  {
    id: 2,
    category: "정책",
    isFavorite: false,
    title: "암호화폐는 기존 화폐를 완전히 대체할 수 있는가?",
    agree: 10,
    disagree: 10,
    result: "승리"
  },
  {
    id: 3,
    category: "정책",
    isFavorite: false,
    title: "암호화폐는 기존 화폐를 완전히 대체할 수 있는가?",
    agree: 10,
    disagree: 10,
    result: "승리"
  },
  {
    id: 4,
    category: "정책",
    isFavorite: false,
    title: "암호화폐는 기존 화폐를 완전히 대체할 수 있는가?",
    agree: 10,
    disagree: 10,
    result: "승리"
  },
];

function FavoriteList({ debates, setDebates }: { debates: DebateType[], setDebates: React.Dispatch<React.SetStateAction<DebateType[]>> }) {
  const favoriteDebates = debates.filter((d) => d.isFavorite);
  const toggleFavorite = (id: number) => {
    setDebates((debates) =>
      debates.map((d) =>
        d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
      )
    );
  };
  return (
    <div>
      <h2 style={{fontSize: "1.3rem", fontWeight: "bold", margin: 0}}>즐겨찾기</h2>
      <table style={{width: "100%", borderCollapse: "collapse", marginTop: 16}}>
        <thead>
          <tr>
            <th style={{ background: "#f7f7f7", fontWeight: 600, padding: "8px 8px 8px 2px", borderBottom: "1px solid #ddd", textAlign: "left" }}></th>
            <th style={{ background: "#f7f7f7", fontWeight: 600, padding: "8px 8px 8px 2px", borderBottom: "1px solid #ddd", textAlign: "left" }}>분야</th>
            <th style={{ background: "#f7f7f7", fontWeight: 600, padding: "8px 8px 8px 2px", borderBottom: "1px solid #ddd", textAlign: "center" }}>토론 주제</th>
            <th style={{ background: "#f7f7f7", fontWeight: 600, padding: "8px 8px 8px 2px", borderBottom: "1px solid #ddd", textAlign: "left" }}>찬성</th>
            <th style={{ background: "#f7f7f7", fontWeight: 600, padding: "8px 8px 8px 2px", borderBottom: "1px solid #ddd", textAlign: "left" }}>반대</th>
            <th style={{ background: "#f7f7f7", fontWeight: 600, padding: "8px 8px 8px 2px", borderBottom: "1px solid #ddd", textAlign: "left" }}>결과</th>
        </tr>


        </thead>
        <tbody>
          {favoriteDebates.map((debate) => (
            <tr key={debate.id}>
              <td style={{padding: 8, borderBottom: "1px solid #eee", textAlign: "center"}}>
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
              </td>
              <td>{debate.category}</td>
              <td style={{textAlign: "left"}}>{debate.title}</td>
              <td>
                <div style={{display: "flex", alignItems: "center", gap: 4, justifyContent: "center"}}>
                  <span style={{color: "#3b82f6"}}>찬{debate.agree}</span>
                  <ProgressBar>
                    <Bar color="#3b82f6" width={50} />
                    <Bar color="#ef4444" width={50} />
                  </ProgressBar>
                </div>
              </td>
              <td>
                <span style={{color: "#ef4444"}}>반{debate.disagree}</span>
              </td>
              <td>{debate.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MyPage() {
  const [tab, setTab] = useState<'history' | 'favorite' | 'edit'>('history');
  const [debates, setDebates] = useState<DebateType[]>(initialDebates);

  return (
    <Container>
      <SideBar>
        <Profile>
          <div style={{fontWeight: 700, fontSize: "1.1rem"}}>🔥 닉네임</div>
          <div>OO승 OO패 (00.0%)</div>
          <div>획득한 포인트 : 000포</div>
        </Profile>
        <Category>카테고리</Category>
        <div>승리</div>
        <div>패배</div>
        <Category>분야별</Category>
        <div>정치/사회</div>
        <div>정치/산업</div>
        <div>과학/기술</div>
        <Category>세대별</Category>
        <div>독서 토론</div>
      </SideBar>
      <Main>
        <Header>
          <div style={{color: "#b5c7a7", fontWeight: 700, fontSize: "1.1rem"}}>마이페이지</div>
          <div style={{display: "flex", alignItems: "center", gap: 8}}>
            <span style={{fontSize: 24}}>👤</span>
            <span>닉네임</span>
          </div>
        </Header>
        <Nav>
          <NavItem active={tab === 'history'} onClick={() => setTab('history')}>토론내역확인</NavItem>
          <NavItem active={tab === 'favorite'} onClick={() => setTab('favorite')}>즐겨찾기</NavItem>
          <NavItem active={tab === 'edit'} onClick={() => setTab('edit')}>개인정보 수정</NavItem>
        </Nav>
        <div style={{marginTop: 32}}>
          {tab === 'history' && <DebateHistory debates={debates} setDebates={setDebates} />}
          {tab === 'favorite' && <FavoriteList debates={debates} setDebates={setDebates} />}
          {tab === 'edit' && <EditProfile />}
        </div>
        <Footer>footer</Footer>
        </Main>
        
      </Container>
    );
}

