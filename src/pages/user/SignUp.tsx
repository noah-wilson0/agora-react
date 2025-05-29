import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const MAIN_COLOR = '#5c6eff';
const BG_COLOR = '#f7f9fb';

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    id: '',
    pw: '',
    email: '',
    nickname: '',
    birth: '',
    gender: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGender = (gender: string) => {
    setForm(prev => ({ ...prev, gender }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 처리 로직
    alert('회원가입 완료!');
    navigate('/user/login');
  };

  return (
    <Wrapper>
      <Card>
        <LogoArea onClick={() => navigate('/main')}>LOGO</LogoArea>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="id">아이디</Label>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="영문, 숫자 6~12자"
            value={form.id}
            onChange={handleChange}
            required
          />
          <Label htmlFor="pw">비밀번호</Label>
          <Input
            id="pw"
            name="pw"
            type="password"
            placeholder="영문, 숫자, 특수문자 8~15자"
            value={form.pw}
            onChange={handleChange}
            required
          />
          <Label htmlFor="email">이메일 주소</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="@포함 이메일 주소 입력"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="한글, 영문, 숫자 2~15자"
            value={form.nickname}
            onChange={handleChange}
            required
          />
          <Row>
            <div style={{flex:1}}>
              <Label htmlFor="birth">출생년도</Label>
              <Input
                id="birth"
                name="birth"
                type="number"
                placeholder="예: 1999"
                value={form.birth}
                onChange={handleChange}
                min={1900}
                max={2099}
                required
              />
            </div>
            <div style={{flex:1, marginLeft:'1.5rem'}}>
              <Label>성별</Label>
              <GenderRow>
                <RadioLabel>
                  <Radio
                    type="radio"
                    name="gender"
                    checked={form.gender === '남자'}
                    onChange={() => handleGender('남자')}
                  />
                  남자
                </RadioLabel>
                <RadioLabel>
                  <Radio
                    type="radio"
                    name="gender"
                    checked={form.gender === '여자'}
                    onChange={() => handleGender('여자')}
                  />
                  여자
                </RadioLabel>
              </GenderRow>
            </div>
          </Row>
          <SignUpBtn type="submit">회원가입</SignUpBtn>
        </Form>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${BG_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.09);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoArea = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.2rem;
  background: #e5e5e5;
  border-radius: 8px;
  padding: 0.7rem 0;
  cursor: pointer;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;
const Label = styled.label`
  font-size: 1.05rem;
  font-weight: 500;
  color: #222;
  margin-bottom: 0.3rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.08rem;
  background: #fafbfc;
  margin-bottom: 0.2rem;
  &:focus {
    border-color: ${MAIN_COLOR};
    outline: none;
  }
`;
const Row = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.2rem;
`;
const GenderRow = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-top: 0.5rem;
`;
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.05rem;
`;
const Radio = styled.input`
  accent-color: ${MAIN_COLOR};
`;
const SignUpBtn = styled.button`
  width: 100%;
  background: ${MAIN_COLOR};
  color: #fff;
  font-size: 1.18rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 1rem 0;
  margin-top: 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(92,110,255,0.08);
  transition: background 0.15s, box-shadow 0.15s;
  &:hover {
    background: #3d4ed6;
    box-shadow: 0 4px 16px rgba(92,110,255,0.13);
  }
`;

export default SignUp; 