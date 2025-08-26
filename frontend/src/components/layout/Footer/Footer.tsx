import React from 'react';
import { FooterContainer, FooterContent, FooterLinks, FooterText } from './Footer.styles';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <FooterContainer>
            <FooterContent>
                <FooterText>© {year} NOTRYA. Todos os direitos reservados.</FooterText>
                <FooterLinks>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                </FooterLinks>
            </FooterContent>
        </FooterContainer>
    );
};