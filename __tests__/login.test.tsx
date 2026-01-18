import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../app/login/page';
import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'next/navigation';

jest.mock('../app/components/Navbar', () => () => <nav data-testid="navbar" />);

jest.mock('../app/context/AuthContext');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef((props: any, ref: any) =>
        React.createElement('div', { ...props, ref }, props.children)
      ),
      button: React.forwardRef((props: any, ref: any) =>
        React.createElement('button', { ...props, ref }, props.children)
      )
    }
  };
});

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const buildAuthContext = (
    overrides: Partial<ReturnType<typeof useAuth>> = {}
  ): ReturnType<typeof useAuth> => ({
    user: null,
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
    isLoading: false,
    error: null,
    ...overrides
  });

  it('affiche un message d\'erreur lorsque AuthContext fournit une erreur', () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    mockedUseAuth.mockReturnValue(
      buildAuthContext({
        error: 'Incorrect email or password'
      })
    );

    render(<Login />);

    expect(screen.getByText('Incorrect email or password')).toBeInTheDocument();
  });

  it('soumet le formulaire et redirige après une connexion réussie', async () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    const loginMock = jest.fn().mockResolvedValue(true);
    mockedUseAuth.mockReturnValue(
      buildAuthContext({
        login: loginMock
      })
    );

    window.history.pushState({}, '', '/login');

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Email/i), 'player@example.com');
    await user.type(screen.getByLabelText(/Mot de passe/i), 'Secret123');
    await user.click(screen.getByRole('button', { name: 'Se connecter' }));

    expect(loginMock).toHaveBeenCalledWith('player@example.com', 'Secret123');
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  it('affiche le texte de chargement et désactive le bouton', () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    mockedUseAuth.mockReturnValue(
      buildAuthContext({
        isLoading: true
      })
    );

    render(<Login />);

    const button = screen.getByRole('button', { name: 'Connexion...' });
    expect(button).toBeDisabled();
  });
});
