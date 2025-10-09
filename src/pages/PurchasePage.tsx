import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockArtworks } from '../utils/mockData'

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
    <div className="min-h-screen bg-slate-50 py-10 px-[60px] max-md:px-5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="bg-transparent border-0 text-[#667eea] text-base cursor-pointer py-[10px] px-0 mb-5 transition-colors duration-200 hover:text-[#764ba2]"
          >
            ← 뒤로 가기
          </button>
          <h1 className="text-[2rem] mb-[10px] text-[#1a1a1a]">작품 구매하기</h1>
          <p className="text-slate-500 text-base">안전한 거래를 위해 정확한 정보를 입력해주세요</p>
        </div>

        <div className="grid grid-cols-[1fr_450px] gap-[50px] items-start max-[1024px]:grid-cols-1 max-[1024px]:gap-[30px]">
          <div className="flex flex-col gap-[30px]">
            <div className="bg-white rounded-2xl p-[30px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <h2 className="text-[1.3rem] mb-5 text-[#1a1a1a] font-semibold">주문 작품</h2>
              <div className="flex gap-5 items-center p-5 bg-slate-50 rounded-xl">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-[120px] h-[150px] object-cover rounded-lg border-[3px] border-[#d4af37]"
                />
                <div className="flex-1">
                  <h3 className="text-[1.2rem] my-0 mb-[5px] text-[#1a1a1a]">{artwork.title}</h3>
                  <p className="my-[3px] text-slate-500 text-[0.95rem]">작가: {artwork.artist}</p>
                  <p className="my-[3px] text-slate-500 text-[0.95rem]">크기: 60x80cm / Oil on canvas</p>
                </div>
                <div className="text-right">
                  <div className="text-[0.9rem] text-slate-500 mb-[5px]">작품 가격</div>
                  <div className="text-[1.8rem] font-bold text-[#667eea]">₩{artworkPrice.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-[30px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <h2 className="text-[1.3rem] mb-5 text-[#1a1a1a] font-semibold">구매자 정보</h2>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">이름</label>
                <input type="text" placeholder="홍길동" className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#667eea] placeholder:text-gray-400" />
              </div>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">연락처</label>
                <input type="tel" placeholder="010-1234-5678" className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#667eea] placeholder:text-gray-400" />
              </div>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">이메일</label>
                <input type="email" placeholder="example@email.com" className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#667eea] placeholder:text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-[30px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <h2 className="text-[1.3rem] mb-5 text-[#1a1a1a] font-semibold">배송 정보</h2>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">배송 주소</label>
                <input type="text" placeholder="서울시 강남구 테헤란로 123" className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#667eea] placeholder:text-gray-400" />
              </div>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">상세 주소</label>
                <input type="text" placeholder="4층 401호" className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#667eea] placeholder:text-gray-400" />
              </div>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">배송 메모</label>
                <input type="text" placeholder="부재 시 경비실에 맡겨주세요" className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#667eea] placeholder:text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-[30px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <h2 className="text-[1.3rem] mb-5 text-[#1a1a1a] font-semibold">결제 수단</h2>
              <div className="mb-[25px]">
                <label className="block text-[0.95rem] font-semibold text-[#1a1a1a] mb-2">결제 방법</label>
                <select className="w-full py-3 px-4 border border-gray-200 rounded-lg text-base bg-white cursor-pointer transition-colors duration-200 focus:outline-none focus:border-[#667eea]">
                  <option>신용/체크카드</option>
                  <option>계좌이체</option>
                  <option>무통장입금</option>
                </select>
              </div>

              <div className="my-[25px]">
                <label className="flex items-center gap-[10px] p-[15px] bg-slate-50 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-slate-100">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                  <span className="text-[0.95rem] text-[#1a1a1a]">구매 약관 및 개인정보 처리방침에 동의합니다</span>
                </label>
              </div>

              <div className="flex gap-[15px] mt-[30px]">
                <button 
                  onClick={() => navigate(-1)}
                  className="bg-white text-[#667eea] border-2 border-[#667eea] py-4 px-[30px] rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[#667eea] hover:text-white"
                >
                  취소
                </button>
                <button 
                  onClick={handlePurchase} 
                  disabled={!agreed}
                  className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-0 py-[18px] px-10 rounded-xl text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.3)] hover:not(:disabled):-translate-y-0.5 hover:not(:disabled):shadow-[0_6px_20px_rgba(102,126,234,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ₩{totalPrice.toLocaleString()} 결제하기
                </button>
              </div>
            </div>
          </div>

          <div className="sticky top-10 flex flex-col gap-[30px]">
            <div className="bg-white rounded-2xl p-[30px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <div className="bg-slate-50 rounded-xl p-5 mt-5">
                <div className="flex justify-between items-center py-[10px] px-0 border-b border-gray-200">
                  <span className="text-[0.95rem] font-medium text-slate-500">작품 가격</span>
                  <span className="text-base font-semibold text-[#1a1a1a]">₩{artworkPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-[10px] px-0 border-b border-gray-200">
                  <span className="text-[0.95rem] font-medium text-slate-500">배송비</span>
                  <span className="text-base font-semibold text-[#1a1a1a]">₩{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-[10px] px-0 mt-[15px] pt-[15px] border-t-2 border-gray-200">
                  <span className="text-[1.1rem] font-bold text-[#1a1a1a]">총 결제금액</span>
                  <span className="text-2xl font-bold text-[#667eea]">₩{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-[30px] text-white shadow-[0_8px_25px_rgba(102,126,234,0.3)]">
              <h3 className="text-[1.4rem] my-0 mb-5 font-bold flex items-center gap-[10px]">
                <span className="text-[1.3rem]">🛡️</span>
                안전거래 보장
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-[1.3rem] flex-shrink-0 mt-0.5">✓</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-[5px]">진품 보증</div>
                    <div className="text-[0.9rem] opacity-90 leading-[1.5]">
                      작품 진품 인증서가 함께 제공되며, 위작 발견 시 전액 환불해드립니다.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-[1.3rem] flex-shrink-0 mt-0.5">✓</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-[5px]">투명한 프로세스</div>
                    <div className="text-[0.9rem] opacity-90 leading-[1.5]">
                      검증된 작가와의 직거래로 공정한 가격과 안전한 거래를 보장합니다.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-[1.3rem] flex-shrink-0 mt-0.5">✓</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-[5px]">안전 배송</div>
                    <div className="text-[0.9rem] opacity-90 leading-[1.5]">
                      전문 배송 시스템으로 작품을 안전하게 보호하여 배송합니다.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="text-[1.3rem] flex-shrink-0 mt-0.5">✓</span>
                  <div className="flex-1">
                    <div className="font-semibold text-base mb-[5px]">구매자 보호</div>
                    <div className="text-[0.9rem] opacity-90 leading-[1.5]">
                      7일 이내 단순 변심 시에도 전액 환불 가능합니다. (배송비 별도)
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasePage