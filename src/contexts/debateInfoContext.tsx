import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DebateData {
  title: string;
  category: string;
  description: string;
}

interface DebateContextType {
  debateData: DebateData;
  setDebateData: (data: DebateData) => void;
}

const defaultDebateData: DebateData = {
  title: '새로운 토론',
  category: '카테고리',
  description: '토론 설명이 없습니다.'
};

const DebateContext = createContext<DebateContextType | undefined>(undefined);

export const DebateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [debateData, setDebateData] = useState<DebateData>(defaultDebateData);

  return (
    <DebateContext.Provider value={{ debateData, setDebateData }}>
      {children}
    </DebateContext.Provider>
  );
};

export const useDebate = () => {
  const context = useContext(DebateContext);
  if (context === undefined) {
    throw new Error('useDebate must be used within a DebateProvider');
  }
  return context;
}; 