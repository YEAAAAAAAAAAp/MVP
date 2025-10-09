import React, { useState } from 'react'

interface AIMatchModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (preferences: UserPreferences) => void
}

export interface UserPreferences {
  genre: string
  priceRange: string
  mood: string
  color: string
  description: string
}

const AIMatchModal: React.FC<AIMatchModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    genre: '',
    priceRange: '',
    mood: '',
    color: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(preferences)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1001] animate-fadeIn p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
        {/* Fixed Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 px-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold leading-none mt-0 mb-4">🎨 AI 작품 매칭</h2>
              <p className="text-indigo-100 text-sm leading-none mt-4 mb-0">취향을 알려주시면 완벽한 작품을 찾아드립니다</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0 ml-4"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-10">
          <div className="space-y-8">
            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-2 gap-8">
              {/* 선호 장르 - 2행 4열 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  선호하는 장르 <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-100 rounded-md p-1 border border-gray-200">
                  <div className="grid grid-cols-4 gap-1.5">
                    {['추상화', '인상주의', '현대미술', '팝아트', '미니멀리즘', '표현주의', '사실주의', '기타'].map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, genre })}
                        className={`
                          px-2 py-1.5 text-xs font-medium rounded transition-all duration-200
                          ${preferences.genre === genre
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 예산 범위 - 2행 2열 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  예산 범위 <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-100 rounded-md p-1 border border-gray-200">
                  <div className="grid grid-cols-2 gap-1.5">
                    {['100만원 이하', '100-300만원', '300-500만원', '500만원 이상'].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, priceRange: range })}
                        className={`
                          px-2 py-1.5 text-xs font-medium rounded transition-all duration-200
                          ${preferences.priceRange === range
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 원하는 분위기 - 2행 3열 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  원하는 분위기
                </label>
                <div className="bg-gray-100 rounded-md p-1 border border-gray-200">
                  <div className="grid grid-cols-3 gap-1.5">
                    {['차분한', '화려한', '몽환적인', '역동적인', '따뜻한', '시원한'].map((mood) => (
                      <button
                        key={mood}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, mood })}
                        className={`
                          px-2 py-1.5 text-xs font-medium rounded transition-all duration-200
                          ${preferences.mood === mood
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 선호 색감 - 2행 3열 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  선호하는 색감
                </label>
                <div className="bg-gray-100 rounded-md p-1 border border-gray-200">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { name: '파란색', gradient: 'from-blue-400 to-blue-600' },
                      { name: '빨간색', gradient: 'from-red-400 to-red-600' },
                      { name: '노란색', gradient: 'from-yellow-400 to-yellow-600' },
                      { name: '초록색', gradient: 'from-green-400 to-green-600' },
                      { name: '보라색', gradient: 'from-purple-400 to-purple-600' },
                      { name: '무채색', gradient: 'from-gray-400 to-gray-600' }
                    ].map((colorOption) => (
                      <button
                        key={colorOption.name}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, color: colorOption.name })}
                        className={`
                          px-2 py-1.5 text-xs font-medium rounded transition-all duration-200
                          ${preferences.color === colorOption.name
                            ? `bg-gradient-to-br ${colorOption.gradient} text-white shadow-md`
                            : 'text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {colorOption.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 설명 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                추가로 원하는 스타일이나 느낌 (선택)
              </label>
              <textarea
                value={preferences.description}
                onChange={(e) => setPreferences({ ...preferences, description: e.target.value })}
                placeholder="예: 집 거실에 걸 작품을 찾고 있어요. 북유럽 스타일 인테리어와 잘 어울렸으면 좋겠어요."
                className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none bg-white"
                rows={6}
              />
            </div>
          </div>
        </form>

        {/* Fixed Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex-shrink-0">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 bg-white rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!preferences.genre || !preferences.priceRange}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              AI 매칭 시작 ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIMatchModal
