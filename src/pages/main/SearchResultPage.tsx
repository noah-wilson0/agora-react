import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const breakpoints = {
  tablet: '@media (max-width: 1024px)',
  mobile: '@media (max-width: 768px)',
  small: '@media (max-width: 480px)',
};

// 더미 데이터 (MainPage와 동일)
const aiDebates = Array(5).fill({ category: '카테고리', status: '진행 중', title: '영화화되는 기존 작품들 원작에 대항할 수 있는가?', agree: 0, disagree: 0, views: 391 });
const userDebates = Array(5).fill({ category: '카테고리', status: '진행 중', title: '영화화되는 기존 작품들 원작에 대항할 수 있는가?', agree: 0, disagree: 0, views: 391 });

const MAIN_COLOR = '#007aff';
const BG_COLOR = '#f8fafc';
const POINT_BG = '#f0f6ff';
const CARD_BG = '#ffffff';
const CARD_SHADOW = '0 2px 8px rgba(0, 122, 255, 0.06)';

const SearchResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keywordParam = params.get('keyword') || '';
  const [search, setSearch] = useState(keywordParam);

  useEffect(() => {
    setSearch(keywordParam);
  }, [keywordParam]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(search)}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Wrapper>
      <Header>
        <LogoBox>
          <LogoText as="button" onClick={() => navigate('/main')}>AGORA</LogoText>
        </LogoBox>
        <HeaderRight>
          <HeaderTop>
            <SearchArea>
              <FiSearch size={20} style={{ marginRight: '0.5rem', color: '#888' }} />
              <SearchBar
                placeholder="궁금한 주제를 찾아보세요"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SearchBtn onClick={handleSearch}>검색</SearchBtn>
            </SearchArea>
            <AuthBox>
              <AuthBtn>닉네임</AuthBtn>
            </AuthBox>
          </HeaderTop>
          <HeaderBottom>
            <Nav>
              <NavItem>분야별</NavItem>
              <NavItem>세대별</NavItem>
              <NavItem>독서 토론</NavItem>
              <NavItem>토론 아카이브</NavItem>
            </Nav>
          </HeaderBottom>
        </HeaderRight>
      </Header>
      <MainContent>
        <SearchTitle>
          <span>{search || '검색어'} 로 검색된 토론/카테고리(소분류)</span>
        </SearchTitle>
        <Section>
          <SectionTitle>AI 추천 토론방</SectionTitle>
          <CardList>
            {aiDebates.map((debate, i) => (
              <DebateCard key={i}>
                <CardTop>
                  <span>{debate.category}</span>
                  <span>{debate.status}</span>
                </CardTop>
                <CardTitle>{debate.title}</CardTitle>
                <CardBottom>
                  <span>찬성 {debate.agree}/3 | 반대 {debate.disagree}/3</span>
                  <span>👁 {debate.views}</span>
                </CardBottom>
              </DebateCard>
            ))}
          </CardList>
        </Section>
        <Section>
          <SectionTitle>사용자 개설 토론방</SectionTitle>
          <CardList>
            {userDebates.map((debate, i) => (
              <DebateCard key={i}>
                <CardTop>
                  <span>{debate.category}</span>
                  <span>{debate.status}</span>
                </CardTop>
                <CardTitle>{debate.title}</CardTitle>
                <CardBottom>
                  <span>찬성 {debate.agree}/3 | 반대 {debate.disagree}/3</span>
                  <span>👁 {debate.views}</span>
                </CardBottom>
              </DebateCard>
            ))}
          </CardList>
        </Section>
      </MainContent>
      <Footer>footer</Footer>
    </Wrapper>
  );
};

// 스타일 컴포넌트 (MainPage와 동일, 필요 없는 부분은 제외)
const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${BG_COLOR};
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: ${CARD_BG};
  border-bottom: 2px solid ${POINT_BG};
  padding: 0.5rem 0 0 1.8rem;
  ${breakpoints.tablet} {
    flex-direction: column;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
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
  color: ${MAIN_COLOR};
  background: white;
  letter-spacing: 0.1em;
`;
const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0;
`;
const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0.2rem 0 0.1rem 0;
  padding-left : 2rem;
  gap: 1rem;
  ${breakpoints.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding-left: 0;
  }
`;
const HeaderBottom = styled.div`
  width: 100%;
  display: flex;
  padding-left : 2rem;
  justify-content: left;
  background: ${CARD_BG};
  ${breakpoints.tablet} {
    padding-left: 0;
    overflow-x: auto;
    font-size: 0.95rem;
  }
`;
const SearchArea = styled.div`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  border-radius: 8px;
  border: 1.5px solid #e0e0e0;
  padding: 0.4rem 1rem;
  width: 100%;
  max-width: 900px;
  flex: 1;
`;
const SearchBar = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.1rem;
  width: 100%;
  color: #222;
  &::placeholder {
    color: #888;
  }
`;
const SearchBtn = styled.button`
  background: none;
  border: none;
  white-space: nowrap;
  color: ${MAIN_COLOR};
  font-size: 1rem;
  padding: 0.4rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 0.2rem;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${POINT_BG};
    color: ${MAIN_COLOR};
  }
`;
const Nav = styled.nav`
  display: flex;
  gap: 1.2rem;
  padding: 0.5rem 0 0.5rem 0;
  ${breakpoints.mobile} {
    gap: 0.5rem;
    font-size: 0.95rem;
  }
`;
const NavItem = styled.div`
  font-size: 1.08rem;
  color: #222;
  cursor: pointer;
  font-weight: 500;
  min-width: 90px;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  transition: background 0.15s, color 0.15s;
  &:hover {
    color: ${MAIN_COLOR};
    background: ${POINT_BG};
  }
`;
const AuthBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1.5rem;
`;
const AuthBtn = styled.button`
  background: none;
  border: none;
  color: ${MAIN_COLOR};
  font-size: 1.1rem;
  padding: 0.4rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-left: 0.2rem;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${POINT_BG};
    color: ${MAIN_COLOR};
  }
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  width: 100%;
  padding: 1rem 1.8rem 0 1.8rem;
  gap: 1.8rem;
  ${breakpoints.tablet} {
    gap: 1rem;
    padding: 1rem 0.7rem 0 0.7rem;
  }
`;
const SearchTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0 1.5rem 0;
  color: #222;
  ${breakpoints.mobile} {
    font-size: 1.5rem;
    margin: 1rem 0 1rem 0;
  }
`;
const Section = styled.section`
  background: ${CARD_BG};
  border-radius: 1rem;
  box-shadow: ${CARD_SHADOW};
  padding: 1rem 1rem 0.7rem 1rem;
  margin-bottom: 1.5rem;
`;
const SectionTitle = styled.h2`
  font-size: 1.18rem;
  font-weight: 700;
  color: ${MAIN_COLOR};
  margin-bottom: 1.1rem;
`;
const CardList = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  ${breakpoints.mobile} {
    gap: 0.5rem;
  }
`;
const DebateCard = styled.div`
  background: ${POINT_BG};
  border-radius: 0.8rem;
  padding: 1rem 1.1rem;
  min-width: 200px;
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0 1px 8px rgba(0,122,255,0.07);
  margin-bottom: 0.7rem;
  ${breakpoints.mobile} {
    min-width: 100%;
    flex-basis: 100%;
    padding: 0.7rem 0.5rem;
  }
`;
const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.97rem;
`;
const CardTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 600;
  color: #222;
  margin: 0.2rem 0 0.1rem 0;
`;
const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  color: #444;
  font-size: 0.97rem;
`;
const Footer = styled.footer`
  width: 100%;
  background: ${POINT_BG};
  color: ${MAIN_COLOR};
  font-size: 1.1rem;
  text-align: left;
  padding: 0.7rem 2.2rem;
  margin-top: 1.5rem;
  ${breakpoints.mobile} {
    padding: 0.7rem 1rem;
    font-size: 1rem;
  }
`;

export default SearchResultPage; 