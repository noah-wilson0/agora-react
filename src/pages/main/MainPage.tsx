import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../../components/CategorySelect';
import MainHeader from './MainHeader';
import MainHeaderLogin from './MainHeaderLogin';
import axios from 'axios';

// axios 기본 설정
axios.defaults.withCredentials = true;

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

// 카테고리 데이터 (CategorySelect와 동일)
const navCategories = [
  {
    main: '문화',
    sub: ['대중문화/엔터테인먼트', '문학/에세이', '예술/디자인', '소셜', '연애', '스포츠']
  },
  {
    main: '경제',
    sub: ['경제 일반', '고용/노동시장', '금융/화폐', '부동산/자산', '소비/물가']
  },
  {
    main: '사회',
    sub: ['사회/시사', '정치', '인권/복지', '젠더/가족', '사건·사고 및 사회현상']
  },
  {
    main: '국제/외교',
    sub: ['외교/안보', '국제 갈등/협력', '글로벌 경제·무역', '국제 인권/정책', '국제기구/세계 질서']
  },
  {
    main: '산업',
    sub: ['산업구조/노동', 'IT산업/콘텐츠 산업', '제조/중공업', '유통/물류', '스타트업/창업']
  },
  {
    main: '기후/환경',
    sub: ['기후변화/탄소중립', '에너지 정책', '생태계 보호', '환경오염', '환경 윤리']
  },
  {
    main: '과학/기술',
    sub: ['인공지능/로봇', '생명과학/유전공학', '정보보안/데이터', '우주/물리/기초과학', '일반 기술']
  },
  {
    main: '인문',
    sub: ['철학', '현대사상', '종교', '자기성찰·자기계발']
  },
  {
    main: '생활',
    sub: ['동물', '음식', '여행', '취미', '육아']
  }
];

const breakpoints = {
  tablet: '@media (max-width: 1024px)',
  mobile: '@media (max-width: 768px)',
  small: '@media (max-width: 480px)',
};

const MainPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/me', {
          withCredentials: true
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserInfo(response.data);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  console.log('isLoggedIn:', isLoggedIn, 'isLoading:', isLoading, 'userInfo:', userInfo);

  // 슬라이드 인덱스 예시 (실제 구현 시 useState로 관리)
  const slideIndex = 0;
  const totalSlides = 3;

  // 검색어 상태 및 라우터
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(search)}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [navHoverIndex, setNavHoverIndex] = useState<number|null>(null);

  const handleCreateDebate = () => {
    setIsCreatePopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsCreatePopupOpen(false);
  };

  const handleCategoryChange = (mainCategory: string, subCategory: string) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(subCategory);
  };

  const handleDebateClick = () => {
    navigate('/discussion');
  };

  return (
    <Wrapper>
      {!isLoading && (isLoggedIn ? <MainHeaderLogin name={userInfo?.name} /> : <MainHeader />)}
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
                    <LiveDebateCard key={i} onClick={handleDebateClick}>
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
                <DebateCard key={i} onClick={handleDebateClick}>
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
                <DebateCard key={i} onClick={handleDebateClick}>
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
                <DebateCard key={i} onClick={handleDebateClick}>
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
      <FloatingButton onClick={handleCreateDebate}>
        <FiPlus size={20} style={{ marginRight: '8px' }} />
        새 토론방 만들기
      </FloatingButton>
      {isCreatePopupOpen && (
        <LayerPopup>
          <PopupOverlay onClick={handleClosePopup} />
          <PopupContent>
            <PopupHeader>
              <PopupTitle>토론방 생성</PopupTitle>
              <CloseButton onClick={handleClosePopup}>×</CloseButton>
            </PopupHeader>
            <PopupBody>
              <FormGroup>
                <Label>토론 제목</Label>
                <Input placeholder="토론 제목을 입력하세요" />
              </FormGroup>
              <FormGroup>
                <Label>카테고리</Label>
                <CategorySelect onCategoryChange={handleCategoryChange} />
              </FormGroup>
              <FormGroup>
                <Label>토론 설명</Label>
                <TextArea placeholder="토론에 대한 설명을 입력하세요" rows={10} />
              </FormGroup>
              <CreateButton>토론방 생성하기</CreateButton>
            </PopupBody>
          </PopupContent>
        </LayerPopup>
      )}
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
const MainContent = styled.div`
  display: flex;
  flex: 1 1 0;
  width: 100%;
  padding: 1rem 1.8rem 0 1.8rem;
  gap: 1.8rem;
  ${breakpoints.tablet} {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0.7rem 0 0.7rem;
  }
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
  ${breakpoints.tablet} {
    max-width: 100%;
    min-width: 0;
    margin-top: 1.5rem;
    width: 100%;
  }
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
  ${breakpoints.mobile} {
    padding: 0.7rem 1rem;
    font-size: 1rem;
  }
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
const FloatingButton = styled.button`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  background: ${MAIN_COLOR};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 100;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4);
  }
`;
const LayerPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
const PopupContent = styled.div`
  position: relative;
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1001;
`;
const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #eee;
`;
const PopupTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin: 0;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #d32f2f;
  }
`;
const PopupBody = styled.div`
  padding: 1.5rem;
`;
const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;
const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #000000;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: ${MAIN_COLOR};
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #000000;
  transition: border-color 0.2s;
  resize: none;
  height: 240px;
  background: white;

  &:focus {
    outline: none;
    border-color: ${MAIN_COLOR};
  }
`;
const CreateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${MAIN_COLOR};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #0056b3;
  }
`;
const SubMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  min-width: 180px;
  z-index: 10;
  padding: 0.5rem 0;
`;
const SubMenuItem = styled.div`
  padding: 0.5rem 1.2rem;
  color: #222;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: ${POINT_BG};
    color: ${MAIN_COLOR};
  }
`;
export default MainPage; 
