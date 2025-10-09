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

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
`

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #1a1a1a;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #667eea;
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

const CollectorRegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collectorType: 'individual',
    interests: [] as string[],
    budgetRange: '',
    experience: '',
    motivation: '',
    preferredStyle: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.phone) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    
    // TODO: 실제 API 연동
    alert('컬렉터 회원가입이 완료되었습니다!\n\n이제 ARTRA에서 다양한 예술 작품을 탐색하고 구매할 수 있습니다.')
    navigate('/')
  }

  const interestOptions = [
    '회화', '조각', '사진', '판화', '도자기', '설치미술', '디지털아트', '일러스트레이션'
  ]

  return (
    <PageContainer>
      <Container>
        <TopNav>
          <BackButton onClick={() => navigate('/')}>
            ← 홈으로 돌아가기
          </BackButton>
          <LoginLinkTop>
            이미 계정이 있으신가요?
            <button onClick={() => navigate('/login?type=collector')}>
              로그인
            </button>
          </LoginLinkTop>
        </TopNav>
        
        <Header>
          <Logo>ARTRA</Logo>
          <Title>컬렉터 회원가입</Title>
          <Subtitle>예술 작품과의 특별한 만남을 시작하세요</Subtitle>
        </Header>

        <InfoBox>
          <h4>🎨 컬렉터 혜택</h4>
          <ul>
            <li>AI 기반 맞춤형 작품 추천</li>
            <li>작가와 직접 소통할 수 있는 채팅 기능</li>
            <li>안전하고 투명한 거래 시스템</li>
            <li>작품 진품 보장 및 가격 정보 제공</li>
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
              placeholder="collector@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
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
            <Label>컬렉터 유형</Label>
            <Select
              name="collectorType"
              value={formData.collectorType}
              onChange={handleChange}
            >
              <option value="individual">개인 컬렉터</option>
              <option value="corporate">기업 컬렉터</option>
              <option value="gallery">갤러리/딜러</option>
              <option value="museum">박물관/기관</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>관심 분야</Label>
            <CheckboxGroup>
              {interestOptions.map(interest => (
                <CheckboxItem key={interest}>
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                  />
                  {interest}
                </CheckboxItem>
              ))}
            </CheckboxGroup>
            <HelperText>관심 있는 예술 분야를 선택해주세요 (복수 선택 가능)</HelperText>
          </FormGroup>

          <FormGroup>
            <Label>구매 예산 범위</Label>
            <Select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
            >
              <option value="">선택해주세요</option>
              <option value="under-100">10만원 미만</option>
              <option value="100-500">10만원 - 50만원</option>
              <option value="500-1000">50만원 - 100만원</option>
              <option value="1000-5000">100만원 - 500만원</option>
              <option value="over-5000">500만원 이상</option>
            </Select>
            <HelperText>대략적인 작품 구매 예산 범위를 선택해주세요</HelperText>
          </FormGroup>

          <FormGroup>
            <Label>선호하는 스타일</Label>
            <Input
              type="text"
              name="preferredStyle"
              placeholder="예) 추상화, 인상주의, 현대미술, 모던아트 등"
              value={formData.preferredStyle}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>컬렉팅 경험</Label>
            <Textarea
              name="experience"
              placeholder="이전에 미술 작품을 구매해본 경험이나 컬렉팅에 대한 경험을 알려주세요"
              value={formData.experience}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>가입 동기</Label>
            <Textarea
              name="motivation"
              placeholder="ARTRA를 통해 무엇을 기대하시는지, 어떤 작품을 찾고 계신지 알려주세요"
              value={formData.motivation}
              onChange={handleChange}
            />
          </FormGroup>

          <ButtonGroup>
            <SubmitButton type="submit">
              회원가입 완료하기
            </SubmitButton>
          </ButtonGroup>
        </form>
      </Container>
    </PageContainer>
  )
}

export default CollectorRegisterPage