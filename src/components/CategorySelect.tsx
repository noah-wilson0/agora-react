import React, { useState } from 'react';
import styled from '@emotion/styled';

interface Category {
  main: string;
  sub: string[];
}

const categories: Category[] = [
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

interface CategorySelectProps {
  onCategoryChange: (mainCategory: string, subCategory: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategoryChange }) => {
  const [selectedMain, setSelectedMain] = useState<string>('');
  const [selectedSub, setSelectedSub] = useState<string>('');

  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mainCategory = e.target.value;
    setSelectedMain(mainCategory);
    setSelectedSub('');
    onCategoryChange(mainCategory, '');
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategory = e.target.value;
    setSelectedSub(subCategory);
    onCategoryChange(selectedMain, subCategory);
  };

  const selectedCategory = categories.find(cat => cat.main === selectedMain);

  return (
    <Container>
      <SelectWrapper>
        <Select value={selectedMain} onChange={handleMainChange}>
          <option value="">대분류 선택</option>
          {categories.map((category) => (
            <option key={category.main} value={category.main}>
              {category.main}
            </option>
          ))}
        </Select>
      </SelectWrapper>
      <SelectWrapper>
        <Select 
          value={selectedSub} 
          onChange={handleSubChange}
          disabled={!selectedMain}
        >
          <option value="">소분류 선택</option>
          {selectedCategory?.sub.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </Select>
      </SelectWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectWrapper = styled.div`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  color: #222;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: #407BFF;
  }
`;

export default CategorySelect; 