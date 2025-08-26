
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
            if (event.key === 'Escape' && typeof onClose === 'function') {
                onClose();
            }
        };

        if (isOpen) {
            // Salva o estado atual do overflow
            const originalOverflow = document.body.style.overflow;
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';

            return () => {
                document.removeEventListener('keydown', handleEscapeKey);
                // Restaura o estado original ou remove se estava vazio
                if (originalOverflow) {
                    document.body.style.overflow = originalOverflow;
                } else {
                    document.body.style.removeProperty('overflow');
                }
            };
        }

        // Cleanup vazio quando modal não está aberto
        return () => {};
    }, [isOpen]); // Remove onClose das dependências

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && typeof onClose === 'function') {
            onClose();
        }
    };

    const handleCloseClick = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
            <ModalContainer size={size} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {title && (
                    <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <CloseButton onClick={handleCloseClick}>✕</CloseButton>
                    </ModalHeader>
                )}
                {!title && typeof onClose === 'function' && (
                    <ModalHeader>
                        <CloseButton onClick={handleCloseClick}>✕</CloseButton>
                    </ModalHeader>
                )}
                <ModalContent>{children}</ModalContent>
            </ModalContainer>
        </ModalOverlay>,
        document.body
    );
};