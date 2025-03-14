module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react-router-dom$': '<rootDir>/src/__mocks__/react-router-dom.js',
    '^framer-motion$': '<rootDir>/src/__mocks__/framer-motion.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    '<rootDir>/src/setupJest.js'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}; 