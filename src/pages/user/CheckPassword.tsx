import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 0;
`;
const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;
const Button = styled.button`
  background: #357cff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #2b65d9;
  }
`;
const ErrorMsg = styled.div`
  color: #e74c3c;
  font-size: 0.98rem;
  text-align: center;
`;

interface CheckPasswordProps {
  onSuccess: () => void;
}

export default function CheckPassword({ onSuccess }: CheckPasswordProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/members/check-password', { password }, { withCredentials: true });
      if (res.data && res.data.success) {
        onSuccess();
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>비밀번호 확인</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit" disabled={loading || !password}>
          확인
        </Button>
      </Form>
    </Container>
  );
} 