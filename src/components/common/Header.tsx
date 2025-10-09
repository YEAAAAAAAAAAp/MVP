import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-[100] shadow-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="no-underline">
            <h1 className="text-2xl font-bold text-blue-600 m-0 cursor-pointer hover:text-blue-700 transition-colors">
              ARTRA
            </h1>
          </Link>
          
          <div className="flex gap-6 md:gap-4">
            <Link 
              to="/collector" 
              className="text-gray-800 font-medium no-underline transition-colors hover:text-blue-600 tracking-wider"
            >
              ART
            </Link>
            <Link 
              to="/artist" 
              className="text-gray-800 font-medium no-underline transition-colors hover:text-blue-600 tracking-wider"
            >
              ARTIST
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <button
                onClick={() => user.type === 'artist' ? navigate('/artist/dashboard') : navigate('/collector/dashboard')}
                className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[20px] text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 cursor-pointer"
              >
                <span className="bg-white/30 px-2 py-1 rounded-[10px] text-xs">
                  {user.type === 'artist' ? '🎨 아티스트' : '👤 콜렉터'}
                </span>
                <span>{user.name}</span>
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-indigo-500 border-2 border-indigo-500 rounded-[20px] font-semibold text-sm cursor-pointer transition-all hover:bg-indigo-500 hover:text-white"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white no-underline rounded-[20px] font-semibold text-sm transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header