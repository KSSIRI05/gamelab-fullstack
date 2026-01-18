import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import React from 'react';

// Simplify next/image for tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: { alt: string }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return React.createElement('img', { ...props, alt });
  }
}));

// Mock next/font/google exports
jest.mock('next/font/google', () => ({
  Orbitron: jest.fn(() => ({ className: 'orbitron' })),
  Rajdhani: jest.fn(() => ({ className: 'rajdhani' }))
}));
