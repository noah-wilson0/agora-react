import React, { useState } from 'react';
import styled from '@emotion/styled';

interface SubCategory {
  id: number;
  name: string;
}
interface Category {
  main: { id: number; name: string };
  sub: SubCategory[];
}

const categories: Category[] = [
  {
    main: { id: 100, name: '문화' },
    sub: [
      { id: 101, name: '대중문화/엔터테인먼트' },
      { id: 102, name: '문학/에세이' },
      { id: 103, name: '예술/디자인' },
      { id: 104, name: '소셜' },
      { id: 105, name: '연애' },
      { id: 106, name: '스포츠' },
    ],
  },
  {
    main: { id: 200, name: '경제' },
    sub: [
      { id: 201, name: '경제 일반' },
      { id: 202, name: '고용/노동시장' },
      { id: 203, name: '금융/화폐' },
      { id: 204, name: '부동산/자산' },
      { id: 205, name: '소비/물가' },
    ],
  },
  {
    main: { id: 300, name: '사회' },
    sub: [
      { id: 301, name: '사회/시사' },
      { id: 302, name: '정치' },
      { id: 303, name: '인권/복지' },
      { id: 304, name: '젠더/가족' },
      { id: 305, name: '사건·사고 및 사회현상' },
    ],
  },
  {
    main: { id: 400, name: '국제/외교' },
    sub: [
      { id: 401, name: '외교/안보' },
      { id: 402, name: '국제 갈등/협력' },
      { id: 403, name: '글로벌 경제·무역' },
      { id: 404, name: '국제 인권/정책' },
      { id: 405, name: '국제기구/세계 질서' },
    ],
  },
  {
    main: { id: 500, name: '산업' },
    sub: [
      { id: 501, name: '산업구조/노동' },
      { id: 502, name: 'IT산업/콘텐츠 산업' },
      { id: 503, name: '제조/중공업' },
      { id: 504, name: '유통/물류' },
      { id: 505, name: '스타트업/창업' },
    ],
  },
  {
    main: { id: 600, name: '기후/환경' },
    sub: [
      { id: 601, name: '기후변화/탄소중립' },
      { id: 602, name: '에너지 정책' },
      { id: 603, name: '생태계 보호' },
      { id: 604, name: '환경오염' },
      { id: 605, name: '환경 윤리' },
    ],
  },
  {
    main: { id: 700, name: '과학/기술' },
    sub: [
      { id: 701, name: '인공지능/로봇' },
      { id: 702, name: '생명과학/유전공학' },
      { id: 703, name: '정보보안/데이터' },
      { id: 704, name: '우주/물리/기초과학' },
      { id: 705, name: '일반 기술' },
    ],
  },
  {
    main: { id: 800, name: '인문' },
    sub: [
      { id: 801, name: '철학' },
      { id: 802, name: '현대사상' },
      { id: 803, name: '종교' },
      { id: 804, name: '자기성찰·자기계발' },
    ],
  },
  {
    main: { id: 900, name: '생활' },
    sub: [
      { id: 901, name: '동물' },
      { id: 902, name: '음식' },
      { id: 903, name: '여행' },
      { id: 904, name: '취미' },
      { id: 905, name: '육아' },
    ],
  },
];



interface CategorySelectProps {
  onCategoryChange: (mainCategoryId: number | '', subCategoryId: number | '') => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategoryChange }) => {
  const [selectedMain, setSelectedMain] = useState<number | ''>('');
  const [selectedSub, setSelectedSub] = useState<number | ''>('');

  const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mainId = e.target.value ? Number(e.target.value) : '';
    setSelectedMain(mainId);
    setSelectedSub('');
    onCategoryChange(mainId, '');
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subId = e.target.value ? Number(e.target.value) : '';
    setSelectedSub(subId);
    onCategoryChange(selectedMain, subId);
  };

  const selectedCategory = categories.find(cat => cat.main.id === selectedMain);

  return (
    <Container>
      <SelectWrapper>
        <Select value={selectedMain} onChange={handleMainChange}>
          <option value="">대분류 선택</option>
          {categories.map(category => (
            <option key={category.main.id} value={category.main.id}>
              {category.main.name}
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
          {selectedCategory?.sub.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
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