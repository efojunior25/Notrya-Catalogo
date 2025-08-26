import React from 'react';
import {
    LoadingContainer,
    Spinner,
    LoadingText,
} from './Loading.styles';

interface LoadingProps {
    text?: string;
    size?: 'small' | 'medium' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({
                                                    text = 'Carregando...',
                                                    size = 'medium',
                                                }) => {
    return (
        <LoadingContainer>
            <Spinner size={size} />
            {text && <LoadingText>{text}</LoadingText>}
        </LoadingContainer>
    );
};
