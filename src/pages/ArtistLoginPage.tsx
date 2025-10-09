import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
`

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  color: #1a1a1a;
`

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 25px;
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    font-size: 0.9rem;
    color: #64748b;
    cursor: pointer;
  }
`

const LoginButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-bottom: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  
  button {
    background: none;
    border: none;
    color: #667eea;
    font-size: 0.9rem;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
      color: #764ba2;
    }
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    padding: 0 15px;
    color: #9ca3af;
    font-size: 0.9rem;
  }
`

const RegisterLink = styled.div`
  text-align: center;
  
  p {
    color: #64748b;
    font-size: 0.95rem;
    margin: 0 0 10px 0;
  }
  
  button {
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    padding: 12px 30px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #667eea;
      color: white;
    }
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 20px;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`

const AlertBox = styled.div`
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  
  p {
    margin: 0;
    color: #92400e;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`

const ArtistLoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.')
      return
    }
    
    // TODO: 실제 로그인 API 연동
    alert('로그인 기능은 백엔드 연동 후 구현됩니다.')
  }

  return (
    <PageContainer>
      <div>
        <BackButton onClick={() => navigate('/')}>
          ← 홈으로 돌아가기
        </BackButton>
        
        <Container>
          <Header>
            <Logo>ARTRA</Logo>
            <Title>아티스트 로그인</Title>
            <Subtitle>작품을 세상에 선보이세요</Subtitle>
          </Header>


          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
                placeholder="artist@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>비밀번호</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <RememberMe>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">로그인 상태 유지</label>
            </RememberMe>

            <LoginButton type="submit">
              로그인
            </LoginButton>

            <Links>
              <button type="button" onClick={() => alert('비밀번호 찾기 기능은 준비중입니다.')}>
                비밀번호 찾기
              </button>
              <button type="button" onClick={() => alert('이메일 찾기 기능은 준비중입니다.')}>
                이메일 찾기
              </button>
            </Links>
          </form>

          <Divider>
            <span>OR</span>
          </Divider>

          <RegisterLink>
            <p>아직 아티스트 회원이 아니신가요?</p>
            <button onClick={() => navigate('/artist/register')}>
              아티스트 회원가입
            </button>
          </RegisterLink>
        </Container>
      </div>
    </PageContainer>
  )
}

export default ArtistLoginPage
