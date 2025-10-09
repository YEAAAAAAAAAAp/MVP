import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const HeaderContainer = styled.header`
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-4) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
`

const Logo = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
`

const NavLinks = styled.div`
  display: flex;
  gap: var(--spacing-6);
  
  @media (max-width: 768px) {
    gap: var(--spacing-4);
  }
`

const NavLink = styled(Link)`
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  
  .badge {
    background: rgba(255, 255, 255, 0.3);
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
  }
`

const LoginButton = styled(Link)`
  padding: 8px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`

const LogoutButton = styled.button`
  padding: 8px 16px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo>ARTRA</Logo>
        <NavLinks>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/artist">아티스트</NavLink>
          <NavLink to="/collector">콜렉터</NavLink>
        </NavLinks>
        <UserSection>
          {isAuthenticated && user ? (
            <>
              <UserInfo>
                <span className="badge">{user.type === 'artist' ? '🎨 작가' : '👤 컬렉터'}</span>
                <span>{user.name}</span>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <LoginButton to="/login">로그인</LoginButton>
          )}
        </UserSection>
      </Nav>
    </HeaderContainer>
  )
}

export default Header