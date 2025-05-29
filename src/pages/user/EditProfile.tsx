import styled from 'styled-components';
import { useState } from 'react';

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

export default function EditProfile() {
  const [form, setForm] = useState({
    id: 'gd8080',
    password: '************',
    email: 'gd8080@naver.com',
    nickname: '두글자',
    birth: '2001',
    gender: '남자',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Title>개인정보 수정</Title>
      <Form>
        <Field>
          <Label htmlFor="id">아이디</Label>
          <Input id="id" name="id" value={form.id} onChange={handleChange} disabled />
        </Field>

        <Field>
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
        </Field>

        <Field>
          <Label htmlFor="email">이메일 주소</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </Field>

        <Field>
          <Label htmlFor="nickname">닉네임</Label>
          <Input id="nickname" name="nickname" value={form.nickname} onChange={handleChange} />
        </Field>

        <Field>
          <Label htmlFor="birth">출생년도</Label>
          <Select id="birth" name="birth" value={form.birth} onChange={handleChange}>
            {Array.from({ length: 30 }, (_, i) => 2001 - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
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

        <Button type="submit">수정</Button>
      </Form>
    </Container>
  );
}
