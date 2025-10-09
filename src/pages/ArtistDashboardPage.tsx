import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const ArtistDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'portfolio' | 'promotion' | 'sales'>('portfolio')

  const stats = {
    totalArtworks: 12,
    totalSales: 8,
    totalRevenue: 15600000,
    pendingOrders: 3
  }

  const recentArtworks = [
    {
      id: '1',
      title: '시미안의 초상화',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop',
      price: 1500000,
      status: '판매중',
      views: 245,
      likes: 18
    },
    {
      id: '2',
      title: '현대의 꿈',
      imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&h=400&fit=crop',
      price: 2300000,
      status: '판매완료',
      views: 189,
      likes: 23
    },
    {
      id: '3',
      title: '자연의 속삭임',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      price: 1800000,
      status: '판매중',
      views: 156,
      likes: 12
    }
  ]

  const recentOrders = [
    {
      id: 'ORD-001',
      artwork: '시미안의 초상화',
      buyer: '김콜렉터',
      amount: 1500000,
      status: '배송중',
      date: '2025-01-15'
    },
    {
      id: 'ORD-002',
      artwork: '현대의 꿈',
      buyer: '이아트',
      amount: 2300000,
      status: '완료',
      date: '2025-01-10'
    },
    {
      id: 'ORD-003',
      artwork: '추상의 세계',
      buyer: '박갤러리',
      amount: 3200000,
      status: '결제대기',
      date: '2025-01-18'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case '판매중': return 'bg-green-100 text-green-800'
      case '판매완료': return 'bg-blue-100 text-blue-800'
      case '배송중': return 'bg-yellow-100 text-yellow-800'
      case '완료': return 'bg-green-100 text-green-800'
      case '결제대기': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">아티스트 대시보드</h1>
              <p className="text-gray-600">안녕하세요, {user?.name}님! 오늘도 멋진 작품 활동을 응원합니다.</p>
            </div>
            <button
              onClick={() => alert('새 작품 등록 기능은 현재 구현중입니다.')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              새 작품 등록
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
                <p className="text-sm font-medium text-gray-600">등록 작품</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalArtworks}</p>
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
                <p className="text-sm font-medium text-gray-600">총 판매</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
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
                <p className="text-sm font-medium text-gray-600">총 수익</p>
                <p className="text-2xl font-bold text-gray-900">₩{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">대기 주문</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                onClick={() => setActiveTab('portfolio')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'portfolio'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                포트폴리오 관리
              </button>
              <button
                onClick={() => setActiveTab('promotion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'promotion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                홍보 및 마케팅
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sales'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                거래 관리
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">내 작품 관리</h3>
                  <button 
                    onClick={() => alert('새 작품 추가 기능은 현재 구현중입니다.')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    새 작품 추가
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentArtworks.map((artwork) => (
                    <div key={artwork.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{artwork.title}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-indigo-600">₩{artwork.price.toLocaleString()}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artwork.status)}`}>
                            {artwork.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>👁️ {artwork.views}</span>
                          <span>❤️ {artwork.likes}</span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button 
                            onClick={() => alert('작품 수정 기능은 현재 구현중입니다.')}
                            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                          >
                            수정
                          </button>
                          <button 
                            onClick={() => navigate(`/artwork/${artwork.id}`)}
                            className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                          >
                            상세보기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Promotion Tab */}
            {activeTab === 'promotion' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">홍보 및 마케팅</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                    <h4 className="font-semibold text-gray-900 mb-3">AI 추천 최적화</h4>
                    <p className="text-gray-600 text-sm mb-4">작품 태그와 설명을 개선하여 AI 추천 알고리즘에 더 잘 노출되도록 하세요.</p>
                    <button 
                      onClick={() => alert('AI 추천 최적화 기능은 현재 구현중입니다.')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      최적화하기
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-3">소셜 미디어 연동</h4>
                    <p className="text-gray-600 text-sm mb-4">인스타그램, 페이스북 등 소셜 미디어와 연동하여 작품을 홍보하세요.</p>
                    <button 
                      onClick={() => alert('소셜 미디어 연동 기능은 현재 구현중입니다.')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      연동하기
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">거래 관리</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문번호</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작품명</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구매자</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.artwork}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.buyer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₩{order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button 
                              onClick={() => alert('거래관리 상세보기 기능은 현재 구현중입니다.')}
                              className="text-indigo-600 hover:text-indigo-900 transition-colors"
                            >
                              상세보기
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistDashboardPage
