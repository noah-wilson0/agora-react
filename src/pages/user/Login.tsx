import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const MAIN_COLOR = '#5c6eff';
const POINT_BG = '#f0f6ff';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/members/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키(JWT) 포함
        body: JSON.stringify({
            username: id,
            password: pw
        }),
      });
      if (res.ok) {
        // 로그인 성공: 메인으로 이동
        navigate('/main');
      } else {
        alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (err) {
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/oauth/callback/naver";
  const handleNaverLogin = () => {
  const state = Math.random().toString(36).substring(2) + Date.now();
  localStorage.setItem('state', state);
  const naverAuthUrl =
      `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
      `&client_id=${NAVER_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;

  console.log('✅ ENV:', import.meta.env);
console.log('✅ VITE_KAKAO_CLIENT_ID:', import.meta.env.VITE_KAKAO_CLIENT_ID);
console.log('✅ VITE_KAKAO_CLIENT_ID:', import.meta.env.VITE_KAKAO_CLIENT_ID);
  const KAKAO_REDIRECT_URI = "http://localhost:5173/oauth/callback/kakao";
  const handleKakaoLogin = () => {
    const state = Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem('state', state);
    const naverAuthUrl =
        `https://kauth.kakao.com/oauth/authorize?response_type=code` +
        `&client_id=${KAKAO_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
        '&scope=profile_nickname';
      window.location.href = naverAuthUrl;
    };

  return (
    <LoginWrapper>
      <LoginBox>
        <LogoArea onClick={() => navigate('/main')} style={{cursor:'pointer'}}>LOGO</LogoArea>
        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
          <OptionRow>
            <label>
              <input type="checkbox" checked={keepLogin} onChange={e => setKeepLogin(e.target.checked)} /> 로그인 상태 유지
            </label>
            <label>
              <input type="checkbox" checked={saveId} onChange={e => setSaveId(e.target.checked)} /> 아이디 저장
            </label>
          </OptionRow>
          <LoginBtn type="submit">로그인</LoginBtn>
        </Form>
        <Divider>또는</Divider>
        <SocialRow>
          <SocialBtn style={{ background: '#2DB400', color: 'white' }}onClick={handleNaverLogin}>N</SocialBtn>
          <SocialBtn style={{ background: '#FEE500', color: '#3C1E1E' }}onClick={handleKakaoLogin}>카</SocialBtn>
        </SocialRow>
        <BottomRow>
          <BottomLink onClick={() => navigate('/find-account')}>아이디 / 비밀번호 찾기</BottomLink>
          <BottomLink onClick={() => navigate('/signup')}>회원가입</BottomLink>
        </BottomRow>
      </LoginBox>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;
const LoginBox = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
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
  margin-bottom: 2rem;
  background: #e5e5e5;
  border-radius: 8px;
  padding: 0.7rem 0;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  background: #fafbfc;
  &:focus {
    border-color: ${MAIN_COLOR};
    outline: none;
  }
`;
const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.98rem;
  color: #888;
  margin-bottom: 0.2rem;
  & label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 400;
  }
`;
const LoginBtn = styled.button`
  width: 100%;
  background: ${MAIN_COLOR};
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 0;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #3d4ed6;
  }
`;
const Divider = styled.div`
  width: 100%;
  text-align: center;
  color: #aaa;
  margin: 1.5rem 0 1rem 0;
  font-size: 1rem;
  position: relative;
  &:before, &:after {
    content: '';
    display: inline-block;
    width: 40%;
    height: 1px;
    background: #eee;
    vertical-align: middle;
    margin: 0 0.5rem;
  }
`;
const SocialRow = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`;
const SocialBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
`;
const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;
const BottomLink = styled.span`
  color: #222;
  font-size: 1.05rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default Login; 