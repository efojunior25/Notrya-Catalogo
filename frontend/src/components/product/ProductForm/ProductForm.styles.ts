import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { mixins } from '../../../styles/mixins';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[5]};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[4]};

  ${mixins.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[1]};
`;

export const Label = styled.label`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[700]};
`;

export const Select = styled.select`
  padding: ${theme.spacing[3]};
  border: 2px solid ${theme.colors.neutral.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  background-color: ${theme.colors.neutral.white};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(193, 24, 26, 0.1);
  }

  &:disabled {
    background-color: ${theme.colors.neutral.gray[100]};
    color: ${theme.colors.neutral.gray[500]};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  padding: ${theme.spacing[3]};
  border: 2px solid ${theme.colors.neutral.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  background-color: ${theme.colors.neutral.white};
  transition: all 0.2s ease-in-out;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(193, 24, 26, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray[400]};
  }
`;

export const ImageUploadContainer = styled.div`
  border: 2px dashed ${theme.colors.neutral.gray[300]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[4]};
  text-align: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary.main};
  }
`;

export const UploadArea = styled.div`
  padding: ${theme.spacing[8]} ${theme.spacing[4]};
`;

export const UploadLabel = styled.label<{ disabled: boolean }>`
    ${mixins.buttonBase}
    display: inline-block;
    background: ${theme.colors.gradients.primary};
    color: ${theme.colors.neutral.white};
    padding: ${theme.spacing[3]} ${theme.spacing[6]};
    border-radius: ${theme.borderRadius.md};
    font-weight: ${theme.typography.fontWeight.semibold};
    cursor: ${({ disabled }: { disabled: boolean }) => disabled ? 'not-allowed' : 'pointer'};
    margin-bottom: ${theme.spacing[3]};
    opacity: ${({ disabled }: { disabled: boolean }) => disabled ? 0.5 : 1};

    &:hover:not([disabled]) {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
    }
`;


export const UploadHint = styled.p`
  color: ${theme.colors.neutral.gray[500]};
  font-size: ${theme.typography.fontSize.sm};
  margin: 0;
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  display: block;
  margin: 0 auto ${theme.spacing[4]} auto;
`;

export const ImageActions = styled.div`
  ${mixins.flexCenter}
  gap: ${theme.spacing[2]};
`;

export const RemoveImageButton = styled.button`
  ${mixins.buttonBase}
  background: ${theme.colors.error};
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.typography.fontSize.sm};

  &:hover:not(:disabled) {
    background: #c82333;
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${theme.colors.neutral.gray[400]};
    cursor: not-allowed;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  justify-content: flex-end;
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.neutral.gray[200]};

  ${mixins.mobile} {
    flex-direction: column-reverse;
  }
`;