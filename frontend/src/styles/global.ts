import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography - Baseado no Manual NOTRYA */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Formula Condensed', 'Montserrat', sans-serif;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
  }

  h3 {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 600;
  }

  h4 {
    font-size: clamp(1.125rem, 2vw, 1.375rem);
    font-weight: 500;
  }

  p {
    margin-bottom: 1em;
    line-height: 1.7;
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* Buttons - Base Styles */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
    font-weight: 500;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
    }

    /* Ripple effect */
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease;
    }

    &:active::after {
      width: 100px;
      height: 100px;
    }
  }

  /* Form Elements */
  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    border: 2px solid ${({ theme }) => theme.colors.border.default};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: 0.75rem 1rem;
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    transition: all 0.3s ease;
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
    }

    &:invalid {
      border-color: ${({ theme }) => theme.colors.error};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }

  /* Label */
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.95rem;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Lists */
  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  /* Loading Animation */
  .loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid ${({ theme }) => theme.colors.border.default};
    border-radius: 50%;
    border-top-color: ${({ theme }) => theme.colors.primary.main};
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Fade In Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  /* Slide Animations */
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Pulse Animation */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Scrollbar Customization */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.default};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.primary.main}30;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Focus Visible */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  /* Print Styles */
  @media print {
    body {
      background: white;
      color: black;
    }
    
    button, input, select, textarea {
      border: 1px solid black !important;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* High Contrast Mode */
  @media (prefers-contrast: high) {
    button, input, select, textarea {
      border-width: 2px;
    }
  }

  /* Dark Mode Adjustments */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #1a1a1a;
      color: #ffffff;
    }
  }

  /* Mobile Optimizations */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    .container {
      padding: 0 1rem;
    }

    /* Touch-friendly tap targets */
    button, a, input, select, textarea {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Tablet Optimizations */
  @media (min-width: 769px) and (max-width: 1024px) {
    .container {
      padding: 0 1.5rem;
    }
  }
`;