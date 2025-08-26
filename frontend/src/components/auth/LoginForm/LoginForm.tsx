import React, { useState } from 'react';
import { Input, Button } from '../../common';
import { FormWrapper, FormHeader, FormBody, Actions, ErrorText } from './LoginForm.styles';

export interface LoginFormValues {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => Promise<void> | void;
    isLoading?: boolean;
    error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error = null }) => {
    const [values, setValues] = useState<LoginFormValues>({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(values);
    };

    return (
        <FormWrapper>
            <FormHeader>
                <h2>Entrar</h2>
                <p>Faça login para acessar sua conta</p>
            </FormHeader>

            <FormBody onSubmit={handleSubmit}>
                <Input
                    name="username"
                    type="text"
                    placeholder="Usuário"
                    value={values.username}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    value={values.password}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {error && <ErrorText>{error}</ErrorText>}

                <Actions>
                    <Button type="submit" variant="primary" loading={isLoading} disabled={isLoading} fullWidth>
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Actions>
            </FormBody>
        </FormWrapper>
    );
};