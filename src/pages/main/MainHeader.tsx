import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MAIN_COLOR = '#007aff';
const POINT_BG = '#f0f6ff';
const CARD_BG = '#ffffff';
const breakpoints = {
  tablet: '@media (max-width: 1024px)',
  mobile: '@media (max-width: 768px)',
  small: '@media (max-width: 480px)',
};

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
  return (
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
            <AuthBtn>{nickname}</AuthBtn>
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

export default MainHeader; 