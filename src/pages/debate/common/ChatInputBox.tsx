import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface ChatInputBoxProps {
  placeholder?: string;
  onSend?: (value: string) => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ placeholder = '메시지를 입력하세요', onSend }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (onSend) onSend(inputValue);
    setInputValue('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ChatInput>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
      />
      <SendButton onClick={handleSend}>전송</SendButton>
    </ChatInput>
  );
};

export default ChatInputBox;

export const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.7rem 1rem;
  border-top: 1.5px solid #e0e0e0;
  background: #f8f9fa;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.4rem 0.7rem;
  border: 1.5px solid #ddd;
  border-radius: 6px;
  font-size: 0.97rem;
  background: #fff;
  color: #222;
  &:focus {
    outline: none;
    border-color: #407BFF;
  }
`;

export const SendButton = styled.button`
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #407BFF;
  color: white;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background-color: #2456b3;
  }
`; 