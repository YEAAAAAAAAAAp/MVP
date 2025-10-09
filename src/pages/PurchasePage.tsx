import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mockArtworks } from '../utils/mockData'

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 40px 60px;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 40px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 1rem;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 20px;
  transition: color 0.2s ease;
  
  &:hover {
    color: #764ba2;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #1a1a1a;
`

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 50px;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const RightColumn = styled.div`
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const SafetyCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 30px;
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
`

const SafetyTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 20px 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`

const SafetyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const SafetyItem = styled.li`
  display: flex;
  align-items: start;
  gap: 12px;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .icon {
    font-size: 1.3rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  .content {
    flex: 1;
    
    .title {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 5px;
    }
    
    .description {
      font-size: 0.9rem;
      opacity: 0.9;
      line-height: 1.5;
    }
  }
`

const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-weight: 600;
`

const ArtworkSummary = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
`

const ArtworkThumbnail = styled.img`
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 3px solid #d4af37;
`

const ArtworkInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.2rem;
    margin: 0 0 5px 0;
    color: #1a1a1a;
  }
  
  p {
    margin: 3px 0;
    color: #64748b;
    font-size: 0.95rem;
  }
`

const PriceDisplay = styled.div`
  text-align: right;
  
  .label {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 5px;
  }
  
  .price {
    font-size: 1.8rem;
    font-weight: 700;
    color: #667eea;
  }
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
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const CheckboxGroup = styled.div`
  margin: 25px 0;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
  }
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  span {
    font-size: 0.95rem;
    color: #1a1a1a;
  }
`

const PriceBreakdown = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`

const PriceRow = styled.div<{ $isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: ${props => props.$isTotal ? 'none' : '1px solid #e5e7eb'};
  
  .label {
    font-size: ${props => props.$isTotal ? '1.1rem' : '0.95rem'};
    font-weight: ${props => props.$isTotal ? '700' : '500'};
    color: ${props => props.$isTotal ? '#1a1a1a' : '#64748b'};
  }
  
  .value {
    font-size: ${props => props.$isTotal ? '1.5rem' : '1rem'};
    font-weight: ${props => props.$isTotal ? '700' : '600'};
    color: ${props => props.$isTotal ? '#667eea' : '#1a1a1a'};
  }
  
  ${props => props.$isTotal && `
    margin-top: 15px;
    padding-top: 15px;
    border-top: 2px solid #e5e7eb;
  `}
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SecondaryButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 16px 30px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`

const PurchasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  
  const artwork = mockArtworks.find(art => art.id === id)
  
  if (!artwork) {
    return <div>작품을 찾을 수 없습니다.</div>
  }
  
  const artworkPrice = artwork.price || 0
  const deliveryFee = 30000
  const totalPrice = artworkPrice + deliveryFee

  const handlePurchase = () => {
    if (!agreed) {
      alert('구매 약관에 동의해주세요.')
      return
    }
    alert('결제가 진행됩니다.\n(실제 결제 API 연동 예정)')
    // TODO: 실제 결제 API 연동
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            ← 뒤로 가기
          </BackButton>
          <Title>작품 구매하기</Title>
          <Subtitle>안전한 거래를 위해 정확한 정보를 입력해주세요</Subtitle>
        </Header>

        <ContentGrid>
          <LeftColumn>
            <Section>
              <SectionTitle>주문 작품</SectionTitle>
              <ArtworkSummary>
                <ArtworkThumbnail src={artwork.imageUrl} alt={artwork.title} />
                <ArtworkInfo>
                  <h3>{artwork.title}</h3>
                  <p>작가: {artwork.artist}</p>
                  <p>크기: 60x80cm / Oil on canvas</p>
                </ArtworkInfo>
                <PriceDisplay>
                  <div className="label">작품 가격</div>
                  <div className="price">₩{artworkPrice.toLocaleString()}</div>
                </PriceDisplay>
              </ArtworkSummary>
            </Section>

            <Section>
              <SectionTitle>구매자 정보</SectionTitle>
            <FormGroup>
              <Label>이름</Label>
              <Input type="text" placeholder="홍길동" />
            </FormGroup>
            <FormGroup>
              <Label>연락처</Label>
              <Input type="tel" placeholder="010-1234-5678" />
            </FormGroup>
            <FormGroup>
              <Label>이메일</Label>
              <Input type="email" placeholder="example@email.com" />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>배송 정보</SectionTitle>
            <FormGroup>
              <Label>배송 주소</Label>
              <Input type="text" placeholder="서울시 강남구 테헤란로 123" />
            </FormGroup>
            <FormGroup>
              <Label>상세 주소</Label>
              <Input type="text" placeholder="4층 401호" />
            </FormGroup>
            <FormGroup>
              <Label>배송 메모</Label>
              <Input type="text" placeholder="부재 시 경비실에 맡겨주세요" />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>결제 수단</SectionTitle>
            <FormGroup>
              <Label>결제 방법</Label>
              <Select>
                <option>신용/체크카드</option>
                <option>계좌이체</option>
                <option>무통장입금</option>
              </Select>
            </FormGroup>

            <CheckboxGroup>
              <CheckboxLabel>
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>구매 약관 및 개인정보 처리방침에 동의합니다</span>
              </CheckboxLabel>
            </CheckboxGroup>

            <ButtonGroup>
              <SecondaryButton onClick={() => navigate(-1)}>
                취소
              </SecondaryButton>
              <PrimaryButton onClick={handlePurchase} disabled={!agreed}>
                ₩{totalPrice.toLocaleString()} 결제하기
              </PrimaryButton>
            </ButtonGroup>
          </Section>
          </LeftColumn>

          <RightColumn>
            <Section>
              <PriceBreakdown>
                <PriceRow>
                  <span className="label">작품 가격</span>
                  <span className="value">₩{artworkPrice.toLocaleString()}</span>
                </PriceRow>
                <PriceRow>
                  <span className="label">배송비</span>
                  <span className="value">₩{deliveryFee.toLocaleString()}</span>
                </PriceRow>
                <PriceRow $isTotal>
                  <span className="label">총 결제금액</span>
                  <span className="value">₩{totalPrice.toLocaleString()}</span>
                </PriceRow>
              </PriceBreakdown>
            </Section>

            <SafetyCard>
              <SafetyTitle>
                <span className="icon">🛡️</span>
                안전거래 보장
              </SafetyTitle>
              <SafetyList>
                <SafetyItem>
                  <span className="icon">✓</span>
                  <div className="content">
                    <div className="title">진품 보증</div>
                    <div className="description">
                      작품 진품 인증서가 함께 제공되며, 위작 발견 시 전액 환불해드립니다.
                    </div>
                  </div>
                </SafetyItem>
                <SafetyItem>
                  <span className="icon">✓</span>
                  <div className="content">
                    <div className="title">투명한 프로세스</div>
                    <div className="description">
                      검증된 작가와의 직거래로 공정한 가격과 안전한 거래를 보장합니다.
                    </div>
                  </div>
                </SafetyItem>
                <SafetyItem>
                  <span className="icon">✓</span>
                  <div className="content">
                    <div className="title">안전 배송</div>
                    <div className="description">
                      전문 배송 시스템으로 작품을 안전하게 보호하여 배송합니다.
                    </div>
                  </div>
                </SafetyItem>
                <SafetyItem>
                  <span className="icon">✓</span>
                  <div className="content">
                    <div className="title">구매자 보호</div>
                    <div className="description">
                      7일 이내 단순 변심 시에도 전액 환불 가능합니다. (배송비 별도)
                    </div>
                  </div>
                </SafetyItem>
              </SafetyList>
            </SafetyCard>
          </RightColumn>
        </ContentGrid>
      </Container>
    </PageContainer>
  )
}

export default PurchasePage