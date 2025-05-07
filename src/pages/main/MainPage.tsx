import React from 'react';
import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// 더미 데이터
const liveDebates = [
  { status: '대기 중', time: '03:50', title: '소셜 미디어를 규제하는 것이 정신 건강을 보호하는가?', type: '소셜', agree: 1, disagree: 3 },
  { status: '진행 중', time: '23:50', title: '소셜 미디어를 규제하는 것이 정신 건강을 보호하는가?', type: '소셜', agree: 1, disagree: 3 },
  { status: '아카이브', time: '', title: '인공지능은 인간의 감독 없이 독립적으로...', type: '소셜', views: 11930 },
];
const aiDebates = Array(5).fill({ category: '카테고리', status: '진행 중', title: '영화화되는 기존 작품들 원작에 대항할 수 있는가?', agree: 0, disagree: 0, views: 391 });
const cultureDebates = Array(5).fill({ category: '카테고리', status: '진행 중', title: '영화화되는 기존 작품들 원작에 대항할 수 있는가?', agree: 0, disagree: 0, views: 391 });
const economyDebates = Array(5).fill({ category: '카테고리', status: '진행 중', title: '영화화되는 기존 작품들 원작에 대항할 수 있는가?', agree: 0, disagree: 0, views: 391 });
const topContributors = [
  { name: '홍길동', icon: '🟡' },
  { name: '김길동', icon: '🥈' },
  { name: '이길동', icon: '🥉' },
  { name: '박길동', icon: '🔷' },
  { name: '최길동', icon: '🔶' },
];

const MainPage: React.FC = () => {
  // 슬라이드 인덱스 예시 (실제 구현 시 useState로 관리)
  const slideIndex = 0;
  const totalSlides = 3;

  return (
    <Wrapper>
      <Header>
        <LogoBox>
          <LogoText>AGORA</LogoText>
        </LogoBox>
        <HeaderRight>
          <HeaderTop>
            <SearchArea>
              <FiSearch size={20} style={{ marginRight: '0.5rem', color: '#888' }} />
              <SearchBar placeholder="궁금한 주제를 찾아보세요" />
            </SearchArea>
            <AuthBox>
              <AuthBtn>로그인</AuthBtn>
              <AuthBtn>회원가입</AuthBtn>
            </AuthBox>
          </HeaderTop>
          <HeaderBottom>
            <Nav>
              <NavItem>문화</NavItem>
              <NavItem>경제</NavItem>
              <NavItem>국제/외교</NavItem>
              <NavItem>산업</NavItem>
              <NavItem>세계</NavItem>
              <NavItem>기후/환경</NavItem>
              <NavItem>과학/기술</NavItem>
              <NavItem>인문</NavItem>
              <NavItem>건강/의료</NavItem>
              <NavItem>토론 아카이브</NavItem>
            </Nav>
          </HeaderBottom>
        </HeaderRight>
      </Header>
      <MainContent>
        <LeftContent>
          <Section>
            <SectionTitle>🔥 실시간 인기 토론</SectionTitle>
            <LiveDebateBox>
              <LiveTabs>
                <Tab active>대기 중</Tab>
                <Tab>진행 중</Tab>
                <Tab>아카이브</Tab>
              </LiveTabs>
              <LiveDebateSlider>
                <ArrowBtn>
                  <FiChevronLeft size={28} />
                </ArrowBtn>
                <LiveDebateList>
                  {liveDebates.map((debate, i) => (
                    <LiveDebateCard key={i}>
                      <LiveStatus status={debate.status}>{debate.status}</LiveStatus>
                      <LiveTime>{debate.time}</LiveTime>
                      <LiveTitle>{debate.title}</LiveTitle>
                      <LiveType>{debate.type}</LiveType>
                      {debate.status !== '아카이브' ? (
                        <LiveStats>
                          <span>찬성 {debate.agree}/3</span>
                          <span>반대 {debate.disagree}/3</span>
                        </LiveStats>
                      ) : (
                        <LiveStats>
                          <span>👁 {debate.views}</span>
                        </LiveStats>
                      )}
                    </LiveDebateCard>
                  ))}
                </LiveDebateList>
                <ArrowBtn>
                  <FiChevronRight size={28} />
                </ArrowBtn>
              </LiveDebateSlider>
              <SliderIndicator>
                {[...Array(totalSlides)].map((_, i) => (
                  <Dot key={i} active={i === slideIndex} />
                ))}
              </SliderIndicator>
            </LiveDebateBox>
          </Section>
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
            <SectionTitle>문화</SectionTitle>
            <CardList>
              {cultureDebates.map((debate, i) => (
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
            <SectionTitle>경제</SectionTitle>
            <CardList>
              {economyDebates.map((debate, i) => (
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
        </LeftContent>
        <RightContent>
          <SectionTitle>최고 기여자</SectionTitle>
          <ContributorList>
            {topContributors.map((user, i) => (
              <Contributor key={i}>
                <span>{user.icon}</span>
                <span>{user.name}</span>
              </Contributor>
            ))}
          </ContributorList>
        </RightContent>
      </MainContent>
      <Footer>footer</Footer>
    </Wrapper>
  );
};

// 컬러 변수
const MAIN_COLOR = '#007aff';
const BG_COLOR = '#f8fafc';
const POINT_BG = '#f0f6ff';
const CARD_BG = '#ffffff';
const CARD_SHADOW = '0 2px 8px rgba(0, 122, 255, 0.06)';

// 스타일 컴포넌트 정의
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
`;
const LogoBox = styled.div`
  width: 130px;
  min-width: 110px;
  height: 60px;
  background: ${POINT_BG};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 0.5rem 0;
`;
const LogoText = styled.div`
  font-size: 2.3rem;
  font-weight: 900;
  color: ${MAIN_COLOR};
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
  justify-content: center;
  padding: 0.2rem 0 0.1rem 0;
  gap: 1rem;
`;
const HeaderBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${CARD_BG};
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
const Nav = styled.nav`
  display: flex;
  gap: 1.2rem;
  padding: 0.5rem 0 0.5rem 0;
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
  flex: 1 1 0;
  width: 100%;
  padding: 1rem 1.8rem 0 1.8rem;
  gap: 1.8rem;
`;
const LeftContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const RightContent = styled.div`
  flex: 1;
  background: ${CARD_BG};
  border-radius: 1rem;
  box-shadow: ${CARD_SHADOW};
  padding: 1rem 0.8rem;
  min-width: 180px;
  max-width: 240px;
  height: fit-content;
`;
const Section = styled.section`
  background: ${CARD_BG};
  border-radius: 1rem;
  box-shadow: ${CARD_SHADOW};
  padding: 1rem 1rem 0.7rem 1rem;
  margin-bottom: 0.7rem;
`;
const SectionTitle = styled.h2`
  font-size: 1.18rem;
  font-weight: 700;
  color: ${MAIN_COLOR};
  margin-bottom: 1.1rem;
`;
const LiveDebateBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const LiveTabs = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.7rem;
`;
const Tab = styled.div<{ active?: boolean }>`
  padding: 0.3rem 1.1rem;
  border-radius: 8px;
  background: ${({ active }) => (active ? POINT_BG : '#f7f7f7')};
  color: ${({ active }) => (active ? MAIN_COLOR : '#888')};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
`;
const LiveDebateList = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: stretch;
`;
const LiveDebateCard = styled.div`
  background: ${POINT_BG};
  border-radius: 0.8rem;
  padding: 1rem 1.1rem;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0 1px 8px rgba(0,122,255,0.07);
`;
const LiveStatus = styled.div<{ status: string }>`
  color: ${({ status }) =>
    status === '대기 중' ? MAIN_COLOR : status === '진행 중' ? '#34c759' : '#a85a5a'};
  font-weight: 700;
  font-size: 1rem;
`;
const LiveTime = styled.div`  color: #a85a5a;
  font-size: 0.95rem;
  font-weight: 600;
`;
const LiveTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 600;
  color: #222;
  margin: 0.2rem 0 0.1rem 0;
`;
const LiveType = styled.div`
  font-size: 0.95rem;
  color: #888;
`;
const LiveStats = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 0.97rem;
  color: #444;
`;
const CardList = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
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
const ContributorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1.2rem;
`;
const Contributor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.08rem;
  font-weight: 600;
  color: #444;
`;
const Footer = styled.footer`
  width: 100%;
  background: ${POINT_BG};
  color: ${MAIN_COLOR};
  font-size: 1.1rem;
  text-align: left;
  padding: 0.7rem 2.2rem;
  margin-top: 1.5rem;
`;
// 실시간 인기 토론 슬라이더 스타일
const LiveDebateSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;
const ArrowBtn = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  color: #222;
  font-size: 1.5rem;
  &:hover {
    color: #007aff;
    background: #f0f6ff;
    border-radius: 50%;
  }
`;
const SliderIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const Dot = styled.div<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#007aff' : '#e0e0e0')};
  transition: background 0.2s;
`;
export default MainPage; 
