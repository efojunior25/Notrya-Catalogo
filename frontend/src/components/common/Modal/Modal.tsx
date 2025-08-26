import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalContent,
} from './Modal.styles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'small' | 'medium' | 'large' | 'full';
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                title,
                                                size = 'medium',
                                                children,
                                            }) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
            <ModalContainer size={size} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            {(title || onClose) && (
                    <ModalHeader>
                        {title && <ModalTitle>{title}</ModalTitle>}
                        <CloseButton onClick={onClose} aria-label="Fechar modal">
                            ✕
                        </CloseButton>
                    </ModalHeader>
                )}
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>,
        document.body
    );
};
