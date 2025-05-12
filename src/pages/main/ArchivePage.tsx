import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import MainHeader from './MainHeader';

const breakpoints = {
  tablet: '@media (max-width: 1024px)',
  mobile: '@media (max-width: 768px)',
  small: '@media (max-width: 480px)',
};

const MAIN_COLOR = '#007aff';
const BG_COLOR = '#f8fafc';
const POINT_BG = '#f0f6ff';
const CARD_BG = '#ffffff';
const CARD_SHADOW = '0 2px 8px rgba(0, 122, 255, 0.06)';

const categories = [
  '정치/사회', '경제/산업', '과학/기술', '교육', '환경/기후', '문화/예술', '윤리/철학', '국제/외교', '건강/의료'
];
const archiveData = [
  {
    title: '정치/사회',
    debates: [
      {
        id: 1,
        category: '카테고리',
        title: '암호화폐는 기존 화폐를 완전히 대체할 수 있는가?',
        agree: 10,
        disagree: 10,
        agreePercent: 50,
        disagreePercent: 50,
        summaryAgree: '암호화폐는 분산화된 구조 덕분에 정부나 중앙 기관의 통제를 받지 않으며, 글로벌 거래 비용과 속도를 크게 줄일 수 있다. 또한 블록체인 기술을 바탕으로 한 투명성과 보안성은 기존 금융 시스템보다 더 신뢰할 수 있는 대안이 될 수 있다.',
        summaryDisagree: '암호화폐는 가격 변동성이 심하고 안정적이지 않으며, 합법성과 과세 문제, 에너지 소비, 범죄 악용 우려 등 해결되지 않은 문제가 많다. 또한 모든 시민이 디지털 자산과 관련된 기술을 동일하게 이해하고 접근하기 어렵기 때문에 화폐의 공공성과 포용성이라는 측면에서 적절하지 않다.',
        comments: 34,
        views: 205,
      },
      {
        id: 2,
        category: '카테고리',
        title: '정치적 올바름은 사회에 긍정적인가?',
        agree: 12,
        disagree: 8,
        agreePercent: 60,
        disagreePercent: 40,
        summaryAgree: '정치적 올바름은 소수자 인권 보호에 기여한다.',
        summaryDisagree: '과도한 정치적 올바름은 표현의 자유를 침해할 수 있다.',
        comments: 21,
        views: 110,
      },
      {
        id: 3,
        category: '카테고리',
        title: '선거 연령을 18세로 낮추는 것이 바람직한가?',
        agree: 15,
        disagree: 5,
        agreePercent: 75,
        disagreePercent: 25,
        summaryAgree: '청소년의 정치 참여를 확대할 수 있다.',
        summaryDisagree: '정치적 판단력이 부족할 수 있다.',
        comments: 12,
        views: 80,
      },
      {
        id: 4,
        category: '카테고리',
        title: '사형제도는 유지되어야 하는가?',
        agree: 8,
        disagree: 12,
        agreePercent: 40,
        disagreePercent: 60,
        summaryAgree: '강력 범죄 억제 효과가 있다.',
        summaryDisagree: '인권 침해 및 오판 위험이 있다.',
        comments: 18,
        views: 95,
      },
      {
        id: 5,
        category: '카테고리',
        title: '국가보안법은 폐지되어야 하는가?',
        agree: 6,
        disagree: 14,
        agreePercent: 30,
        disagreePercent: 70,
        summaryAgree: '표현의 자유를 보장해야 한다.',
        summaryDisagree: '국가 안보에 필요하다.',
        comments: 9,
        views: 60,
      },
      {
        id: 6,
        category: '카테고리',
        title: '복지 확대는 국가 경쟁력을 높이는가?',
        agree: 13,
        disagree: 7,
        agreePercent: 65,
        disagreePercent: 35,
        summaryAgree: '사회적 안정과 경제 활성화에 기여한다.',
        summaryDisagree: '재정 부담이 커질 수 있다.',
        comments: 15,
        views: 70,
      },
      {
        id: 7,
        category: '카테고리',
        title: '이민자 수용 확대는 사회에 긍정적인가?',
        agree: 9,
        disagree: 11,
        agreePercent: 45,
        disagreePercent: 55,
        summaryAgree: '다양성 증진과 노동력 보충에 도움된다.',
        summaryDisagree: '사회 통합에 어려움이 있다.',
        comments: 11,
        views: 55,
      },
      {
        id: 8,
        category: '카테고리',
        title: '인터넷 실명제는 필요한가?',
        agree: 7,
        disagree: 13,
        agreePercent: 35,
        disagreePercent: 65,
        summaryAgree: '악성 댓글과 범죄 예방에 효과적이다.',
        summaryDisagree: '익명성 보장과 표현의 자유 침해 우려가 있다.',
        comments: 13,
        views: 50,
      },
    ]
  },
  {
    title: '경제/산업',
    debates: [
      {
        id: 9,
        category: '카테고리',
        title: '최저임금 인상은 경제에 긍정적인가?',
        agree: 7,
        disagree: 13,
        agreePercent: 35,
        disagreePercent: 65,
        summaryAgree: '최저임금 인상은 저소득층의 소득을 높여 소비를 촉진하고 경제성장에 기여할 수 있다.',
        summaryDisagree: '최저임금 인상은 기업의 인건비 부담을 높여 고용 감소와 실업률 증가를 초래할 수 있다.',
        comments: 12,
        views: 88,
      },
      {
        id: 10,
        category: '카테고리',
        title: '부동산 규제 강화는 집값 안정에 효과적인가?',
        agree: 11,
        disagree: 9,
        agreePercent: 55,
        disagreePercent: 45,
        summaryAgree: '투기 억제와 실수요자 보호에 도움이 된다.',
        summaryDisagree: '시장 왜곡과 공급 부족을 초래할 수 있다.',
        comments: 10,
        views: 70,
      },
      {
        id: 11,
        category: '카테고리',
        title: '기본소득제 도입은 바람직한가?',
        agree: 8,
        disagree: 12,
        agreePercent: 40,
        disagreePercent: 60,
        summaryAgree: '소득 불평등 해소와 사회 안전망 강화에 기여한다.',
        summaryDisagree: '재원 마련과 근로 의욕 저하 우려가 있다.',
        comments: 14,
        views: 65,
      },
      {
        id: 12,
        category: '카테고리',
        title: '주 4일제 도입은 경제에 긍정적인가?',
        agree: 10,
        disagree: 10,
        agreePercent: 50,
        disagreePercent: 50,
        summaryAgree: '일과 삶의 균형과 생산성 향상에 기여한다.',
        summaryDisagree: '기업 부담과 임금 감소 우려가 있다.',
        comments: 8,
        views: 40,
      },
      {
        id: 13,
        category: '카테고리',
        title: '공공기관 민영화는 효율성을 높이는가?',
        agree: 6,
        disagree: 14,
        agreePercent: 30,
        disagreePercent: 70,
        summaryAgree: '경쟁 촉진과 서비스 질 향상에 기여한다.',
        summaryDisagree: '공공성 약화와 요금 인상 우려가 있다.',
        comments: 7,
        views: 30,
      },
      {
        id: 14,
        category: '카테고리',
        title: '대기업 규제 강화는 경제에 도움이 되는가?',
        agree: 9,
        disagree: 11,
        agreePercent: 45,
        disagreePercent: 55,
        summaryAgree: '공정 경쟁 환경 조성에 기여한다.',
        summaryDisagree: '기업 경쟁력 약화와 투자 위축 우려가 있다.',
        comments: 6,
        views: 25,
      },
    ]
  },
  {
    title: '과학/기술',
    debates: [
      {
        id: 15,
        category: '카테고리',
        title: '인공지능은 인간의 일자리를 대체할 것인가?',
        agree: 15,
        disagree: 5,
        agreePercent: 75,
        disagreePercent: 25,
        summaryAgree: 'AI는 반복적이고 규칙적인 업무를 빠르게 대체할 수 있다.',
        summaryDisagree: 'AI가 대체할 수 없는 창의적, 감성적 직업이 많다.',
        comments: 8,
        views: 120,
      },
      {
        id: 16,
        category: '카테고리',
        title: '유전자 편집 기술은 허용되어야 하는가?',
        agree: 11,
        disagree: 9,
        agreePercent: 55,
        disagreePercent: 45,
        summaryAgree: '질병 치료와 예방에 혁신적이다.',
        summaryDisagree: '윤리적 문제와 예측 불가능한 위험이 있다.',
        comments: 10,
        views: 70,
      },
      {
        id: 17,
        category: '카테고리',
        title: '자율주행차는 교통사고를 줄일 수 있는가?',
        agree: 13,
        disagree: 7,
        agreePercent: 65,
        disagreePercent: 35,
        summaryAgree: '운전자 실수 감소와 교통 효율성 향상에 기여한다.',
        summaryDisagree: '기술적 한계와 사고 책임 문제가 있다.',
        comments: 9,
        views: 60,
      },
      {
        id: 18,
        category: '카테고리',
        title: '인터넷 검열은 필요한가?',
        agree: 7,
        disagree: 13,
        agreePercent: 35,
        disagreePercent: 65,
        summaryAgree: '유해 정보 차단과 사회 질서 유지에 필요하다.',
        summaryDisagree: '표현의 자유 침해와 정보 접근 제한 우려가 있다.',
        comments: 11,
        views: 55,
      },
      {
        id: 19,
        category: '카테고리',
        title: '우주 개발은 국가에 이익이 되는가?',
        agree: 10,
        disagree: 10,
        agreePercent: 50,
        disagreePercent: 50,
        summaryAgree: '첨단 기술 발전과 경제적 파급 효과가 크다.',
        summaryDisagree: '막대한 비용과 환경 파괴 우려가 있다.',
        comments: 7,
        views: 40,
      },
      {
        id: 20,
        category: '카테고리',
        title: '로봇의 인간화는 사회에 긍정적인가?',
        agree: 8,
        disagree: 12,
        agreePercent: 40,
        disagreePercent: 60,
        summaryAgree: '노동력 보충과 삶의 질 향상에 기여한다.',
        summaryDisagree: '인간 소외와 일자리 감소 우려가 있다.',
        comments: 6,
        views: 30,
      },
    ]
  },
];

const ArchivePage: React.FC = () => {
  const [selectedField, setSelectedField] = useState<string>('전체');
  const [detailDebate, setDetailDebate] = useState<any>(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
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

  // 분야별 필터링
  const filteredData = selectedField === '전체'
    ? archiveData
    : archiveData.filter(section => section.title === selectedField);

  // 상세 결과 화면 렌더링
  if (detailDebate) {
    return (
      <Wrapper>
        <MainHeader />
        <MainContent>
          <SideMenu>
            <MenuTitle>카테고리</MenuTitle>
            <MenuSection>
              <MenuSectionTitle>분야별</MenuSectionTitle>
              <MenuItem onClick={() => setSelectedField('전체')} active={selectedField==='전체'}>전체</MenuItem>
              {archiveData.map((cat, i) => (
                <MenuItem key={i} onClick={() => setSelectedField(cat.title)} active={selectedField===cat.title}>{cat.title}</MenuItem>
              ))}
            </MenuSection>
            <MenuSectionTitle>세대별</MenuSectionTitle>
            <MenuSectionTitle>독서 토론</MenuSectionTitle>
          </SideMenu>
          <DetailContent>
            <DetailHeader>
              <DetailPath>토론 아카이브 / 토론 결과</DetailPath>
              <DetailTitle>{detailDebate.title}</DetailTitle>
              <DetailCategory>{selectedField}</DetailCategory>
              <DetailStats>
                <span>찬성: {detailDebate.agreePercent}% / 반대: {detailDebate.disagreePercent}%</span>
                <span>👁 {detailDebate.views}</span>
                <span>📝 {detailDebate.comments}개</span>
              </DetailStats>
            </DetailHeader>
            <DetailBody>
              <SummaryBox agree>
                <SummaryTitle>🟢 찬성 요약</SummaryTitle>
                <SummaryText>{detailDebate.summaryAgree}</SummaryText>
              </SummaryBox>
              <SummaryBox>
                <SummaryTitle>🔴 반대 요약</SummaryTitle>
                <SummaryText>{detailDebate.summaryDisagree}</SummaryText>
              </SummaryBox>
            </DetailBody>
            <BackBtn onClick={() => setDetailDebate(null)}>토론 아카이브로 돌아가기</BackBtn>
          </DetailContent>
        </MainContent>
        <Footer>footer</Footer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <MainHeader />
      <MainContent>
        <SideMenu>
          <MenuTitle>카테고리</MenuTitle>
          <MenuSection>
            <MenuSectionTitle>분야별</MenuSectionTitle>
            <MenuItem onClick={() => setSelectedField('전체')} active={selectedField==='전체'}>전체</MenuItem>
            {archiveData.map((cat, i) => (
              <MenuItem key={i} onClick={() => setSelectedField(cat.title)} active={selectedField===cat.title}>{cat.title}</MenuItem>
            ))}
          </MenuSection>
          <MenuSectionTitle>세대별</MenuSectionTitle>
          <MenuSectionTitle>독서 토론</MenuSectionTitle>
        </SideMenu>
        <ArchiveContent>
          <PageTitle>토론 아카이브</PageTitle>
          {filteredData.map((section, idx) => (
            <ArchiveSection key={idx}>
              <SectionHeader>{section.title}</SectionHeader>
              <CardRow>
                {section.debates.slice(0, 5).map((debate, i) => (
                  <DebateCard key={i} onClick={() => setDetailDebate(debate)}>
                    <CardCategoryRow>
                      <CardCategory>{debate.category}</CardCategory>
                      <CardIcon>✨</CardIcon>
                    </CardCategoryRow>
                    <CardTitle>{debate.title}</CardTitle>
                    <GraphBox>
                      <GraphBar>
                        <GraphAgree style={{width: `${debate.agreePercent}%`}} />
                        <GraphDisagree style={{width: `${debate.disagreePercent}%`}} />
                      </GraphBar>
                      <GraphLabelRow>
                        <GraphLabelAgree>찬{debate.agree}</GraphLabelAgree>
                        <GraphLabelDisagree>반{debate.disagree}</GraphLabelDisagree>
                      </GraphLabelRow>
                    </GraphBox>
                  </DebateCard>
                ))}
              </CardRow>
              {selectedField === '전체' && (
                <DetailBtnRow>
                  <DetailBtn onClick={() => setSelectedField(section.title)}>자세히보기</DetailBtn>
                </DetailBtnRow>
              )}
            </ArchiveSection>
          ))}
        </ArchiveContent>
      </MainContent>
      <Footer>footer</Footer>
    </Wrapper>
  );
};

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
  padding: 1rem 1.2rem 0 1.2rem;
  gap: 1.2rem;
`;
const SideMenu = styled.div`
  width: 220px;
  min-width: 180px;
  background: ${CARD_BG};
  border-radius: 1rem;
  box-shadow: ${CARD_SHADOW};
  padding: 1.5rem 1.2rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const MenuTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;
const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MenuSectionTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0.7rem 0 0.3rem 0;
`;
const MenuItem = styled.div<{active?: boolean}>`
  font-size: 1rem;
  color: #222;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  background: ${({active}) => active ? POINT_BG : 'none'};
  color: ${({active}) => active ? MAIN_COLOR : '#222'};
  font-weight: ${({active}) => active ? 700 : 400};
  &:hover {
    background: ${POINT_BG};
    color: ${MAIN_COLOR};
  }
`;
const ArchiveContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const PageTitle = styled.h1`
  font-size: 2.7rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: #222;
`;
const ArchiveSection = styled.section`
  margin-bottom: 1rem;
`;
const SectionHeader = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${MAIN_COLOR};
  margin-bottom: 0.7rem;
`;
const CardRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.7rem;
  margin-bottom: 0.3rem;
`;
const DebateCard = styled.div`
  background: ${POINT_BG};
  border-radius: 0.8rem;
  padding: 1rem 1.1rem;
  min-width: 260px;
  max-width: 260px;
  min-height: 180px;
  max-height: 180px;
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0 1px 8px rgba(0,122,255,0.07);
  cursor: pointer;
`;
const CardCategoryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 22px;
  max-height: 22px;
`;
const CardIcon = styled.span`
  font-size: 1.1rem;
`;
const CardCategory = styled.div`
  color: #888;
  font-size: 0.97rem;
`;
const CardTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 600;
  color: #222;
  margin: 0.2rem 0 0.1rem 0;
  min-height: 28px;
  max-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const GraphBox = styled.div`
  margin-top: 0.7rem;
  min-height: 32px;
  max-height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const GraphBar = styled.div`
  display: flex;
  height: 6px;
  width: 100%;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;
const GraphAgree = styled.div`
  background: #6bb6ff;
  height: 100%;
`;
const GraphDisagree = styled.div`
  background: #e57373;
  height: 100%;
`;
const GraphLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
`;
const GraphLabelAgree = styled.span`
  color: #6bb6ff;
  font-weight: 600;
  font-size: 1rem;
`;
const GraphLabelDisagree = styled.span`
  color: #e57373;
  font-weight: 600;
  font-size: 1rem;
`;
const DetailBtn = styled.button`
  background: none;
  border: none;
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
const DetailContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 2.5rem 0 2.5rem;
`;
const DetailHeader = styled.div`
  border-bottom: 1.5px solid #bbb;
  padding-bottom: 1.2rem;
`;
const DetailPath = styled.div`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
`;
const DetailTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #222;
`;
const DetailCategory = styled.div`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
`;
const DetailStats = styled.div`
  display: flex;
  gap: 2.5rem;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
`;
const DetailBody = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
`;
const SummaryBox = styled.div<{agree?: boolean}>`
  flex: 1;
  background: #fff;
  color: #222;
  border-radius: 1rem;
  border: 1.5px solid #bbb;
  padding: 1.2rem 1.5rem;
  min-height: 180px;
`;
const SummaryTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;
const SummaryText = styled.div`
  font-size: 1.05rem;
  color: #222;
  white-space: pre-line;
`;
const BackBtn = styled.button`
  margin-top: 2.5rem;
  align-self: flex-end;
  background: none;
  border: 1.5px solid #bbb;
  color: #333;
  font-size: 1.1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${POINT_BG};
    color: ${MAIN_COLOR};
  }
`;
const DetailBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
`;

export default ArchivePage; 