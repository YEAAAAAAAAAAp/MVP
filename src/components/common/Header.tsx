import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>ARTRA</Logo>
        <NavLinks>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/artist">아티스트</NavLink>
          <NavLink to="/collector">콜렉터</NavLink>
          <NavLink to="/about">소개</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header