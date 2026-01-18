import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../app/signup/page';
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

describe('Signup page', () => {
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

  it('affiche une erreur locale quand les mots de passe sont différents', async () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    const signupMock = jest.fn().mockResolvedValue(true);
    mockedUseAuth.mockReturnValue(
      buildAuthContext({ signup: signupMock })
    );

    render(<Signup />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Nom complet/i), 'Player One');
    await user.type(screen.getByLabelText(/Email/i), 'player@example.com');
    await user.type(screen.getByLabelText(/^Mot de passe$/i), 'Secret123');
    await user.type(screen.getByLabelText(/Confirmer le mot de passe/i), 'Secret999');
    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    expect(signupMock).not.toHaveBeenCalled();
  });

  it('affiche l\'erreur API fournie par AuthContext', () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    mockedUseAuth.mockReturnValue(
      buildAuthContext({
        error: 'Email already registered'
      })
    );

    render(<Signup />);

    expect(screen.getByText('Email already registered')).toBeInTheDocument();
  });

  it('soumet le formulaire et redirige vers returnUrl après succès', async () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    const signupMock = jest.fn().mockResolvedValue(true);
    mockedUseAuth.mockReturnValue(
      buildAuthContext({ signup: signupMock })
    );

    window.history.pushState({}, '', '/signup?returnUrl=/events');

    render(<Signup />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Nom complet/i), 'Player One');
    await user.type(screen.getByLabelText(/Email/i), 'player@example.com');
    await user.type(screen.getByLabelText(/^Mot de passe$/i), 'Secret123');
    await user.type(screen.getByLabelText(/Confirmer le mot de passe/i), 'Secret123');
    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(signupMock).toHaveBeenCalledWith('Player One', 'player@example.com', 'Secret123');
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/events');
    });
  });

  it('affiche l\'état de chargement quand une inscription est en cours', () => {
    const push = jest.fn();
    mockedUseRouter.mockReturnValue({ push } as unknown as ReturnType<typeof useRouter>);

    mockedUseAuth.mockReturnValue(
      buildAuthContext({ isLoading: true })
    );

    render(<Signup />);

    const button = screen.getByRole('button', { name: 'Création du compte...' });
    expect(button).toBeDisabled();
  });
});
