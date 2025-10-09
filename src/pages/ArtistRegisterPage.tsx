import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
`

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
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
  margin-bottom: 25px;
`

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  
  .required {
    color: #ef4444;
    margin-left: 4px;
  }
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
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

const FileInputWrapper = styled.div`
  position: relative;
  
  input[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .file-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 16px;
    border: 2px dashed #e5e7eb;
    border-radius: 10px;
    background: #f8fafc;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #667eea;
      background: #f1f5f9;
    }
  }
`

const HelperText = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 6px 0 0 0;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 35px;
`

const SubmitButton = styled.button`
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`

const LoginLink = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: #64748b;
  
  button {
    background: none;
    border: none;
    color: #667eea;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    margin-left: 5px;
    
    &:hover {
      color: #764ba2;
    }
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 10px 0;
  transition: color 0.2s ease;
  
  &:hover {
    color: #764ba2;
  }
`

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const LoginLinkTop = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  
  button {
    background: none;
    border: none;
    color: #667eea;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    margin-left: 5px;
    
    &:hover {
      color: #764ba2;
    }
  }
`

const InfoBox = styled.div`
  background: #f0f9ff;
  border-left: 4px solid #667eea;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
  
  h4 {
    margin: 0 0 10px 0;
    color: #1a1a1a;
    font-size: 1rem;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      color: #64748b;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  }
`

const ArtistRegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artistName: '',
    bio: '',
    portfolio: '',
    instagram: '',
    experience: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.phone || !formData.artistName) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    
    // TODO: 실제 API 연동
    alert('회원가입 신청이 완료되었습니다!\n\n관리자 심사 후 승인 메일을 발송해드립니다.\n일반적으로 1-3일 정도 소요됩니다.')
    navigate('/')
  }

  return (
    <PageContainer>
      <Container>
        <TopNav>
          <BackButton onClick={() => navigate('/')}>
            ← 홈으로 돌아가기
          </BackButton>
          <LoginLinkTop>
            이미 승인된 아티스트이신가요?
            <button onClick={() => navigate('/login?type=artist')}>
              로그인
            </button>
          </LoginLinkTop>
        </TopNav>
        
        <Header>
          <Logo>ARTRA</Logo>
          <Title>아티스트 회원가입</Title>
          <Subtitle>예술가와 콜렉터를 연결합니다</Subtitle>
        </Header>

        <InfoBox>
          <h4>📋 회원가입 안내</h4>
          <ul>
            <li>신청서 제출 후 관리자 심사가 진행됩니다</li>
            <li>심사는 1-3일 정도 소요됩니다</li>
            <li>승인 시 이메일로 알림을 보내드립니다</li>
            <li>승인 후 로그인하여 작품을 등록할 수 있습니다</li>
          </ul>
        </InfoBox>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              이름<span className="required">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              placeholder="홍길동"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              이메일<span className="required">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="artist@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <HelperText>승인 메일이 발송될 이메일 주소입니다</HelperText>
          </FormGroup>

          <FormGroup>
            <Label>
              연락처<span className="required">*</span>
            </Label>
            <Input
              type="tel"
              name="phone"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              활동명 (아티스트명)<span className="required">*</span>
            </Label>
            <Input
              type="text"
              name="artistName"
              placeholder="예) 김아트, Art Kim"
              value={formData.artistName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>아티스트 소개</Label>
            <Textarea
              name="bio"
              placeholder="자신의 작품 세계와 예술관을 소개해주세요"
              value={formData.bio}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>포트폴리오 URL</Label>
            <Input
              type="url"
              name="portfolio"
              placeholder="https://your-portfolio.com"
              value={formData.portfolio}
              onChange={handleChange}
            />
            <HelperText>개인 웹사이트나 포트폴리오 링크를 입력해주세요</HelperText>
          </FormGroup>

          <FormGroup>
            <Label>인스타그램</Label>
            <Input
              type="text"
              name="instagram"
              placeholder="@your_instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>경력 및 전시 이력</Label>
            <Textarea
              name="experience"
              placeholder="주요 전시회, 수상 경력, 학력 등을 입력해주세요"
              value={formData.experience}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>작품 샘플 (선택)</Label>
            <FileInputWrapper>
              <input type="file" accept="image/*" multiple />
              <div className="file-label">
                📁 파일 선택 (최대 5개)
              </div>
            </FileInputWrapper>
            <HelperText>대표 작품 이미지를 업로드해주세요 (JPG, PNG)</HelperText>
          </FormGroup>

          <ButtonGroup>
            <SubmitButton type="submit">
              회원가입 신청하기
            </SubmitButton>
          </ButtonGroup>
        </form>
      </Container>
    </PageContainer>
  )
}

export default ArtistRegisterPage