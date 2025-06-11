import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const MAIN_COLOR = '#5c6eff';
const BG_COLOR = '#f7f9fb';

const initialForm = {
  id: '',
  pw: '',
  pwCheck: '',
  email: '',
  nickname: '',
  birth: '',
  gender: '',
};

const initialErrors = {
  id: '',
  pw: '',
  pwCheck: '',
  email: '',
  nickname: '',
  birth: '',
  gender: '',
};

function validateId(id: string) {
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,12}$/.test(id)) {
    return '* 아이디는 영문, 숫자 모두 포함 6~12자여야 합니다.';
  }
  return '';
}
function validatePw(pw: string) {
  if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pw)) {
    return '* 비밀번호는 영문, 숫자, 특수문자 포함 8~15자여야 합니다.';
  }
  return '';
}
function validatePwCheck(pw: string, pwCheck: string) {
  if (!pwCheck) return '* 비밀번호 확인을 입력하세요.';
  if (pw !== pwCheck) return '* 비밀번호가 일치하지 않습니다.';
  return '';
}
function validateEmail(email: string) {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return '* 올바른 이메일 주소를 입력하세요.';
  }
  return '';
}
function validateNickname(nickname: string) {
  if (!/^[a-zA-Z0-9가-힣]{2,15}$/.test(nickname)) {
    return '* 닉네임은 한글, 영문, 숫자 2~15자여야 합니다.';
  }
  return '';
}
function validateBirth(birth: string) {
  if (!/^\d{4}$/.test(birth) || +birth < 1900 || +birth > 2099) {
    return '* 출생년도는 1900~2099년 사이 4자리여야 합니다.';
  }
  return '';
}
function validateGender(gender: string) {
  if (!gender) {
    return '* 성별을 선택하세요.';
  }
  return '';
}

const SignUp: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    id: false,
    pw: false,
    pwCheck: false,
    email: false,
    nickname: false,
    birth: false,
    gender: false,
  });
  const [idCheck, setIdCheck] = useState<'idle'|'checking'|'valid'|'invalid'>('idle');
  const [idCheckMsg, setIdCheckMsg] = useState('');
  const [nicknameCheck, setNicknameCheck] = useState<'idle'|'checking'|'valid'|'invalid'>('idle');
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState('');
  const navigate = useNavigate();

  // 각 필드별 유효성 검사
  const validators = {
    id: validateId,
    pw: validatePw,
    pwCheck: (v: string) => validatePwCheck(form.pw, v),
    email: validateEmail,
    nickname: validateNickname,
    birth: validateBirth,
    gender: validateGender,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: (validators as any)[name](value) }));
    if (name === 'id') {
      setIdCheck('idle');
      setIdCheckMsg('');
    }
    if (name === 'nickname') {
      setNicknameCheck('idle');
      setNicknameCheckMsg('');
    }
    if (name === 'pw' || name === 'pwCheck') {
      setErrors(prev => ({ ...prev, pwCheck: validatePwCheck(name === 'pw' ? value : form.pw, name === 'pwCheck' ? value : form.pwCheck) }));
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: (validators as any)[name](value) }));
    // 아이디 중복 체크
    if (name === 'id' && !validateId(value)) {
      setIdCheck('checking');
      setIdCheckMsg('');
      try {
        const res = await fetch('http://localhost:8080/members/signup/check/id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: value })
        });
        if (res.ok) {
          setIdCheck('valid');
          setIdCheckMsg('사용 가능한 아이디입니다.');
        } else {
          setIdCheck('invalid');
          setIdCheckMsg('* 이미 사용 중인 아이디입니다.');
        }
      } catch {
        setIdCheck('invalid');
        setIdCheckMsg('* 아이디 중복 확인 중 오류가 발생했습니다.');
      }
    }
    // 닉네임 중복 체크
    if (name === 'nickname' && !validateNickname(value)) {
      setNicknameCheck('checking');
      setNicknameCheckMsg('');
      try {
        const res = await fetch('http://localhost:8080/members/signup/check/name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: value })
        });
        if (res.ok) {
          setNicknameCheck('valid');
          setNicknameCheckMsg('사용 가능한 닉네임입니다.');
        } else {
          setNicknameCheck('invalid');
          setNicknameCheckMsg('* 이미 사용 중인 닉네임입니다.');
        }
      } catch {
        setNicknameCheck('invalid');
        setNicknameCheckMsg('* 닉네임 중복 확인 중 오류가 발생했습니다.');
      }
    }
  };

  const handleGender = (gender: string) => {
    setForm(prev => ({ ...prev, gender }));
    setTouched(prev => ({ ...prev, gender: true }));
    setErrors(prev => ({ ...prev, gender: validateGender(gender) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ id: true, pw: true, pwCheck: true, email: true, nickname: true, birth: true, gender: true });
    const newErrors = {
      id: validateId(form.id),
      pw: validatePw(form.pw),
      pwCheck: validatePwCheck(form.pw, form.pwCheck),
      email: validateEmail(form.email),
      nickname: validateNickname(form.nickname),
      birth: validateBirth(form.birth),
      gender: validateGender(form.gender),
    };
    setErrors(newErrors);
    if (
      Object.values(newErrors).some(msg => msg) ||
      idCheck !== 'valid' ||
      nicknameCheck !== 'valid'
    ) return;
    // 회원가입 요청
    try {
      const res = await fetch('http://localhost:8080/members/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.id,
          password: form.pw,
          email: form.email,
          name: form.nickname,
          birth: form.birth,
          gender: form.gender
        })
      });
      if (res.ok) {
        alert('회원가입 완료!');
        navigate('/user/login');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch {
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
  };

  const hasError =
    Object.values(errors).some(msg => msg) ||
    (Object.keys(form) as (keyof typeof form)[]).some(key => touched[key] && !form[key]) ||
    idCheck !== 'valid' ||
    nicknameCheck !== 'valid';

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
            placeholder="영문, 숫자 모두 포함 6~12자"
            value={form.id}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.id && errors.id && <ErrorMsg>{errors.id}</ErrorMsg>}
          {idCheckMsg && (
            idCheck === 'valid' ? <SuccessMsg>{idCheckMsg}</SuccessMsg> : idCheck === 'invalid' ? <ErrorMsg>{idCheckMsg}</ErrorMsg> : null
          )}

          <Label htmlFor="pw">비밀번호</Label>
          <Input
            id="pw"
            name="pw"
            type="password"
            placeholder="영문, 숫자, 특수문자 8~15자"
            value={form.pw}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.pw && errors.pw && <ErrorMsg>{errors.pw}</ErrorMsg>}

          <Label htmlFor="pwCheck">비밀번호 확인</Label>
          <Input
            id="pwCheck"
            name="pwCheck"
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요"
            value={form.pwCheck}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.pwCheck && errors.pwCheck && <ErrorMsg>{errors.pwCheck}</ErrorMsg>}

          <Label htmlFor="email">이메일 주소</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="@포함 이메일 주소 입력"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}

          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="한글, 영문, 숫자 2~15자"
            value={form.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.nickname && errors.nickname && <ErrorMsg>{errors.nickname}</ErrorMsg>}
          {nicknameCheckMsg && (
            nicknameCheck === 'valid' ? <SuccessMsg>{nicknameCheckMsg}</SuccessMsg> : nicknameCheck === 'invalid' ? <ErrorMsg>{nicknameCheckMsg}</ErrorMsg> : null
          )}

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
                onBlur={handleBlur}
                min={1900}
                max={2099}
                required
              />
              {touched.birth && errors.birth && <ErrorMsg>{errors.birth}</ErrorMsg>}
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
                    onBlur={() => handleGender(form.gender)}
                  />
                  남자
                </RadioLabel>
                <RadioLabel>
                  <Radio
                    type="radio"
                    name="gender"
                    checked={form.gender === '여자'}
                    onChange={() => handleGender('여자')}
                    onBlur={() => handleGender(form.gender)}
                  />
                  여자
                </RadioLabel>
              </GenderRow>
              {touched.gender && errors.gender && <ErrorMsg>{errors.gender}</ErrorMsg>}
            </div>
          </Row>
          <SignUpBtn type="submit" disabled={hasError}>회원가입</SignUpBtn>
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
const ErrorMsg = styled.div`
  color: #e53935;
  font-size: 0.92rem;
  margin: -0.7rem 0 0.5rem 0.2rem;
  min-height: 1.1em;
`;
const SuccessMsg = styled.div`
  color: #2e7d32;
  font-size: 0.92rem;
  margin: -0.7rem 0 0.5rem 0.2rem;
  min-height: 1.1em;
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
  &:disabled {
    background: #bfc6e0;
    cursor: not-allowed;
  }
`;

export default SignUp; 