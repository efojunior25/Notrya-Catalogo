import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import { mixins } from '../../../styles/mixins';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

interface ModalStyleProps {
    isOpen?: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
}

const modalSizes = {
    small: '400px',
    medium: '600px',
    large: '800px',
    full: '95vw',
};

export const ModalOverlay = styled.div<ModalStyleProps>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${theme.zIndex.modal};
    animation: ${fadeIn} 0.3s ease-out;
    backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div<ModalStyleProps>`
    background: ${theme.colors.neutral.white};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.xl};
    width: 100%;
    max-width: ${({ size }: { size?: 'small'|'medium'|'large'|'full' }) => modalSizes[size || 'medium']};
    max-height: 90vh;
    overflow: hidden;
    position: relative;
    animation: ${slideIn} 0.3s ease-out;
    margin: ${theme.spacing[4]};

    ${mixins.mobile} {
        max-width: 95vw;
        max-height: 95vh;
        margin: ${theme.spacing[2]};
    }
`;


export const ModalHeader = styled.div`
    ${mixins.flexBetween}
    padding: ${theme.spacing[6]} ${theme.spacing[6]} ${theme.spacing[4]};
    border-bottom: 1px solid ${theme.colors.neutral.gray[200]};
    position: sticky;
    top: 0;
    background: ${theme.colors.neutral.white};
    z-index: 1;
`;

export const ModalTitle = styled.h2`
    ${mixins.heading}
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.gray[900]};
    margin: 0;
`;

export const CloseButton = styled.button`
    ${mixins.buttonBase}
    ${mixins.flexCenter}
    width: 40px;
    height: 40px;
    border-radius: ${theme.borderRadius.full};
    background: ${theme.colors.neutral.gray[100]};
    color: ${theme.colors.neutral.gray[600]};
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    transition: all 0.2s ease;

    &:hover {
        background: ${theme.colors.neutral.gray[200]};
        color: ${theme.colors.neutral.gray[800]};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const ModalContent = styled.div`
    padding: ${theme.spacing[6]};
    overflow-y: auto;
    max-height: calc(90vh - 100px);

    ${mixins.mobile} {
        padding: ${theme.spacing[4]};
    }
`;
