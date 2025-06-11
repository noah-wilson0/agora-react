import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FiSearch, FiPlus  } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../../components/CategorySelect';

const MAIN_COLOR = '#007aff';
const POINT_BG = '#f0f6ff';
const CARD_BG = '#ffffff';
const breakpoints = {
  tablet: '@media (max-width: 1024px)',
  mobile: '@media (max-width: 768px)',
  small: '@media (max-width: 480px)',
};
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

interface MainHeaderProps {
  nickname?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ nickname = '닉네임' }) => {
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
  const handleArchiveClick = () => {
    navigate('/archive');
  };
  const handleChatClick = () => {
    navigate('/chat/room1');
  };
  const [navHoverIndex, setNavHoverIndex] = useState<number|null>(null);

  return (
    <Header>
      <LogoBox>
        <LogoText as="button" onClick={() => navigate('/')}>AGORA</LogoText>
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
            {/* <AuthBtn>{nickname}</AuthBtn> */}
            <AuthBtn>로그인</AuthBtn>
            <AuthBtn>회원가입</AuthBtn>
            {/* 채팅 모듈 테스트 */}
            {/* <AuthBtn onClick={handleChatClick}>채팅</AuthBtn> */}
          </AuthBox>
        </HeaderTop>
        <HeaderBottom>
          <Nav>
            {navCategories.map((cat, idx) => (
                <NavItem
                  key={cat.main}
                  onMouseEnter={() => setNavHoverIndex(idx)}
                  onMouseLeave={() => setNavHoverIndex(null)}
                >
                  {cat.main}
                  {navHoverIndex === idx && (
                    <SubMenu>
                      {cat.sub.map(sub => (
                        <SubMenuItem key={sub}>{sub}</SubMenuItem>
                      ))}
                    </SubMenu>
                  )}
                </NavItem>
              ))}
            <NavItem onClick={handleArchiveClick}>토론 아카이브</NavItem>
          </Nav>
        </HeaderBottom>
      </HeaderRight>
    </Header>
  );
};

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
  color: ${MAIN_COLOR};
  white-space: nowrap;
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
  position: relative;
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

export default MainHeader; 