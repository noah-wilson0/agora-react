import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const RadioLabel = styled.label`
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
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

interface MemberInfo {
  name: string;
  id: string;
  email: string;
  gender: string;
  birthday: string;
  type: string;
}

export default function SocialEditProfile() {
  const [form, setForm] = useState({
    id: '',
    nickname: '',
    email: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axios.get<MemberInfo>('http://localhost:8080/members/me', { withCredentials: true });
        const { name, id, email, gender, birthday } = response.data;
        
        // birthday를 yyyy-MM-dd 형식에서 분리
        const [year, month, day] = birthday ? birthday.split('-') : ['', '', ''];
        
        setForm({
          id: id,
          nickname: name,
          email: email || '',
          birthYear: year,
          birthMonth: month,
          birthDay: day,
          gender: gender || '',
        });
      } catch (err) {
        setError('회원정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!window.confirm('입력하신 정보로 수정하시겠습니까?')) return;
    
    try {
      const formattedBirthday = `${form.birthYear}-${form.birthMonth.padStart(2, '0')}-${form.birthDay.padStart(2, '0')}`;
      
      await axios.patch('http://localhost:8080/members/update/change-info', {
        name: form.nickname,
        email: form.email,
        gender: form.gender,
        birthday: formattedBirthday
      }, { withCredentials: true });
      
      window.location.href = '/';
    } catch (err: any) {
      setError('회원정보 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>;
  }

  return (
    <Container>
      <Title>개인정보 수정</Title>
      <Form onSubmit={handleSubmit}>


        <Field>
          <Label htmlFor="nickname">닉네임</Label>
          <Input id="nickname" name="nickname" value={form.nickname} onChange={handleChange} />
        </Field>

        <Field>
          <Label htmlFor="email">이메일 주소</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </Field>

        <Field>
          <Label>생년월일</Label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Select 
              name="birthYear" 
              value={form.birthYear} 
              onChange={handleChange}
              style={{ flex: 2 }}
            >
              <option value="">년도</option>
              {Array.from({ length: 30 }, (_, i) => 2001 - i).map((year) => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </Select>
            <Select 
              name="birthMonth" 
              value={form.birthMonth} 
              onChange={handleChange}
              style={{ flex: 1 }}
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, '0')}>
                  {month}월
                </option>
              ))}
            </Select>
            <Select 
              name="birthDay" 
              value={form.birthDay} 
              onChange={handleChange}
              style={{ flex: 1 }}
            >
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString().padStart(2, '0')}>
                  {day}일
                </option>
              ))}
            </Select>
          </div>
        </Field>

        <Field>
          <Label>성별</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="남자"
                checked={form.gender === '남자'}
                onChange={handleChange}
              />
              남자
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="gender"
                value="여자"
                checked={form.gender === '여자'}
                onChange={handleChange}
              />
              여자
            </RadioLabel>
          </RadioGroup>
        </Field>

        {error && <div style={{ color: '#e74c3c', textAlign: 'center', marginBottom: 8 }}>{error}</div>}
        <Button type="submit">수정</Button>
      </Form>
      <Button type="button" style={{ background: '#e53935', marginTop: 16 }} onClick={async () => {
        if (!window.confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
        try {
          await axios.delete('http://localhost:8080/members', { withCredentials: true });
          alert('회원 탈퇴가 완료되었습니다.');
          window.location.href = '/';
        } catch (err) {
          alert('회원 탈퇴에 실패했습니다.');
        }
      }}>
        회원 탈퇴
      </Button>
    </Container>
  );
} 