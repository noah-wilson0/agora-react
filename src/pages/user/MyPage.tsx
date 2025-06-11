import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DebateHistory from './DebateHistory';
import EditProfile from './EditProfile';
import CheckPassword from './CheckPassword';

interface DebateType {
  id: number;
  category: string;
  isFavorite: boolean;
  title: string;
  agree: number;
  disagree: number;
  result: string;
}

interface MemberInfo {
  name: string;
  username: string;
  email: string;
  gender: string;
  birthday: string;
  score: number;
  level: number;
  win: number;
  lose: number;
}

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  flex-direction: column;
`;

const TopHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: #fff;
  border-bottom: 2px solid #f0f6ff;
  padding: 0.5rem 0 0 1.8rem;
`;

const SideBar = styled.div`
  width: 220px;
  padding: 40px 0 0 40px;
  background: #fff;
  border-right: 1px solid #eee;
  min-height: 100vh;
  margin-top: 20px;
`;

const Main = styled.div`
  flex: 1;
  padding: 40px 48px 0 48px;
  background: #fff;
  min-height: 100vh;
  margin-top: 20px;
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

const LogoBox = styled.div`
  width: 130px;
  min-width: 110px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 0.5rem 0;
`;

const LogoText = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #007aff;
  background: white;
  letter-spacing: 0.1em;
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
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [editAuth, setEditAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/members/me', {
          withCredentials: true
        });
        setMemberInfo(response.data);
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
        navigate('/');
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  const winRate = memberInfo
    ? (memberInfo.win + memberInfo.lose === 0
        ? '0.0'
        : ((memberInfo.win / (memberInfo.win + memberInfo.lose)) * 100).toFixed(1))
    : '0.0';

  return (
    <Container>
      <TopHeader>
        <LogoBox>
          <LogoText onClick={() => navigate('/')}>AGORA</LogoText>
        </LogoBox>
      </TopHeader>
      <div style={{ display: 'flex' }}>
        <SideBar>
          <Profile>
            <div style={{fontWeight: 700, fontSize: "1.1rem"}}>🔥 {memberInfo?.name || '로딩중...'}</div>
            <div>{memberInfo ? `${memberInfo.win}승 ${memberInfo.lose}패 (${winRate}%)` : '로딩중...'}</div>
            <div>획득한 점수 : {memberInfo?.score || 0}점</div>
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
          </Header>
          <Nav>
            <NavItem active={tab === 'history'} onClick={() => setTab('history')}>토론내역확인</NavItem>
            <NavItem active={tab === 'favorite'} onClick={() => setTab('favorite')}>즐겨찾기</NavItem>
            <NavItem active={tab === 'edit'} onClick={() => { setTab('edit'); setEditAuth(false); }}>개인정보 수정</NavItem>
          </Nav>
          <div style={{marginTop: 32}}>
            {tab === 'history' && <DebateHistory debates={debates} setDebates={setDebates} />}
            {tab === 'favorite' && <FavoriteList debates={debates} setDebates={setDebates} />}
            {tab === 'edit' && (!editAuth
              ? <CheckPassword onSuccess={() => setEditAuth(true)} />
              : <EditProfile />
            )}
          </div>
          <Footer>footer</Footer>
        </Main>
      </div>
    </Container>
  );
}

