import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay, ModalContainer, ModalHeader, ModalTitle, CloseButton, ModalContent } from './Modal.styles';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                title,
                                                children,
                                                size = 'medium'
                                            }) => {
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            // Bloquear scroll do body quando modal está aberto
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscapeKey);

            return () => {
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscapeKey);
            };
        }
    }, [isOpen, onClose]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
            <ModalContainer size={size} onClick={(e) => e.stopPropagation()}>
                {title && (
                    <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <CloseButton onClick={onClose} aria-label="Fechar modal">
                            ✕
                        </CloseButton>
                    </ModalHeader>
                )}
                {!title && (
                    <ModalHeader>
                        <div></div>
                        <CloseButton onClick={onClose} aria-label="Fechar modal">
                            ✕
                        </CloseButton>
                    </ModalHeader>
                )}
                <ModalContent>{children}</ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );

    // Renderizar no body usando portal
    return ReactDOM.createPortal(modalContent, document.body);
};