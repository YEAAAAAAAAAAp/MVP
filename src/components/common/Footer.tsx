import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--bg-dark);
  color: var(--text-light);
  padding: var(--spacing-12) 0 var(--spacing-8);
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  text-align: center;
`

const Copyright = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
`

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © 2025 ARTRA. 예술가와 콜렉터를 연결하는 플랫폼
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer