/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(mp4|webm|svg|png|jpg|jpeg|gif)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/backend/']
};
