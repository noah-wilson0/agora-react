import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px 24px 28px;
  min-width: 350px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.13);
`;
const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Label = styled.label`
  font-size: 0.98rem;
  font-weight: 500;
  margin-bottom: 4px;
`;
const Input = styled.input`
  padding: 10px;
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
  margin-top: 8px;
  transition: background 0.2s ease;
  &:hover {
    background: #2b65d9;
  }
`;
const ErrorMsg = styled.div`
  color: #e74c3c;
  font-size: 0.97rem;
  margin-top: -8px;
  margin-bottom: 4px;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
`;

function validatePassword(pw: string) {
  // 영문, 숫자, 특수문자 포함 8~15자
  return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pw);
}

interface UpdatePasswordProps {
  onClose: () => void;
}

export default function UpdatePassword({ onClose }: UpdatePasswordProps) {
  const [next, setNext] = useState('');
  const [nextCheck, setNextCheck] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validatePassword(next)) {
      setError('새 비밀번호는 영문, 숫자, 특수문자 포함 8~15자여야 합니다.');
      return;
    }
    if (next !== nextCheck) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/members/update/change-password', {
        newPassword: next,
        confirmNewPassword: nextCheck
      }, { withCredentials: true });
      setSuccess('비밀번호가 성공적으로 변경되었습니다.');
      setNext(''); setNextCheck('');
      setTimeout(() => { onClose(); }, 1200);
      window.location.href = '/';
    } catch (err: any) {
      setError('비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal style={{ position: 'relative' }}>
        <CloseBtn onClick={onClose} type="button">×</CloseBtn>
        <Title>비밀번호 변경</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="next">새 비밀번호</Label>
          <Input id="next" type="password" value={next} onChange={e => setNext(e.target.value)} required disabled={loading} />
          {next && !validatePassword(next) && <ErrorMsg>비밀번호: 영문, 숫자, 특수문자 포함 8~15자</ErrorMsg>}

          <Label htmlFor="nextCheck">새 비밀번호 재확인</Label>
          <Input id="nextCheck" type="password" value={nextCheck} onChange={e => setNextCheck(e.target.value)} required disabled={loading} />
          {nextCheck && next !== nextCheck && <ErrorMsg>새 비밀번호가 일치하지 않습니다.</ErrorMsg>}

          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <div style={{ color: '#357cff', textAlign: 'center', marginBottom: 8 }}>{success}</div>}
          <Button type="submit" disabled={loading}>비밀번호 변경</Button>
        </Form>
      </Modal>
    </Overlay>
  );
} 