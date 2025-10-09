import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { mockArtworks } from '../utils/mockData'

const CollectorDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'collection' | 'purchases' | 'recommendations'>('collection')

  const stats = {
    totalPurchases: 8,
    totalSpent: 15600000,
    wishlistItems: 12,
    followingArtists: 5
  }

  const myCollection = [
    {
      id: '1',
      title: '시미안의 초상화',
      artist: '시미안',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop',
      purchasePrice: 1500000,
      purchaseDate: '2024-12-15',
      currentValue: 1800000,
      appreciation: '+20%'
    },
    {
      id: '2',
      title: '현대의 꿈',
      artist: '김아트',
      imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=400&fit=crop',
      purchasePrice: 2300000,
      purchaseDate: '2024-11-20',
      currentValue: 2500000,
      appreciation: '+8.7%'
    },
    {
      id: '3',
      title: '자연의 속삭임',
      artist: '이창작',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      purchasePrice: 1800000,
      purchaseDate: '2024-10-10',
      currentValue: 1950000,
      appreciation: '+8.3%'
    }
  ]

  const purchaseHistory = [
    {
      id: 'PUR-001',
      artwork: '시미안의 초상화',
      artist: '시미안',
      amount: 1500000,
      status: '배송완료',
      date: '2024-12-15',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'PUR-002',
      artwork: '현대의 꿈',
      artist: '김아트',
      amount: 2300000,
      status: '배송완료',
      date: '2024-11-20',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'PUR-003',
      artwork: '추상의 세계',
      artist: '박아트',
      amount: 3200000,
      status: '배송중',
      date: '2025-01-18',
      trackingNumber: 'TRK456789123'
    }
  ]

  const aiRecommendations = [
    {
      id: '1',
      title: '추상의 세계',
      artist: '박아트',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      price: 3200000,
      matchScore: 95,
      reason: '당신이 좋아하는 추상화 스타일과 유사합니다',
      tags: ['추상화', '현대미술', '컬러풀']
    },
    {
      id: '2',
      title: '도시의 밤',
      artist: '최아트',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop',
      price: 2800000,
      matchScore: 88,
      reason: '기존 컬렉션과 잘 어울리는 색감입니다',
      tags: ['도시', '야경', '네온']
    },
    {
      id: '3',
      title: '바다의 노래',
      artist: '정아트',
      imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=400&fit=crop',
      price: 2100000,
      matchScore: 82,
      reason: '자연 테마 작품을 선호하는 패턴을 발견했습니다',
      tags: ['자연', '바다', '평화']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '배송완료': return 'bg-green-100 text-green-800'
      case '배송중': return 'bg-yellow-100 text-yellow-800'
      case '결제대기': return 'bg-orange-100 text-orange-800'
      case '취소': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-orange-600'
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">콜렉터 대시보드</h1>
              <p className="text-gray-600">안녕하세요, {user?.name}님! 오늘도 멋진 작품을 발견해보세요.</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              작품 둘러보기
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 구매 작품</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPurchases}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 투자 금액</p>
                <p className="text-2xl font-bold text-gray-900">₩{stats.totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">위시리스트</p>
                <p className="text-2xl font-bold text-gray-900">{stats.wishlistItems}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">팔로우 아티스트</p>
                <p className="text-2xl font-bold text-gray-900">{stats.followingArtists}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('collection')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'collection'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                내 컬렉션
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'purchases'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                구매 내역
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'recommendations'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                AI 추천
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Collection Tab */}
            {activeTab === 'collection' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">내 컬렉션</h3>
                  <div className="text-sm text-gray-500">
                    총 {myCollection.length}개 작품 • 총 가치 ₩{myCollection.reduce((sum, item) => sum + item.currentValue, 0).toLocaleString()}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myCollection.map((artwork) => (
                    <div key={artwork.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{artwork.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">by {artwork.artist}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">구매가</span>
                            <span className="font-medium">₩{artwork.purchasePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">현재가</span>
                            <span className="font-medium text-green-600">₩{artwork.currentValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">수익률</span>
                            <span className="font-medium text-green-600">{artwork.appreciation}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">구매일</span>
                            <span className="text-gray-600">{artwork.purchaseDate}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            상세보기
                          </button>
                          <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                            재판매
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">구매 내역</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문번호</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작품명</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">아티스트</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구매일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {purchaseHistory.map((purchase) => (
                        <tr key={purchase.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.artwork}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.artist}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₩{purchase.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                              {purchase.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900 transition-colors">
                                상세보기
                              </button>
                              {purchase.status === '배송중' && (
                                <button className="text-green-600 hover:text-green-900 transition-colors">
                                  배송추적
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">AI 맞춤 추천</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    추천 새로고침
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiRecommendations.map((artwork) => (
                    <div key={artwork.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold bg-white ${getMatchScoreColor(artwork.matchScore)}`}>
                            {artwork.matchScore}% 매치
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{artwork.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">by {artwork.artist}</p>
                        <p className="text-sm text-gray-700 mb-3">{artwork.reason}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {artwork.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-indigo-600">₩{artwork.price.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                              위시리스트
                            </button>
                            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                              구매하기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectorDashboardPage
