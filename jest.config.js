module.exports = {
	roots: ['<rootDir>/src'],
	testMatch: ['**/*.spec.(ts|tsx)'],
	moduleNameMapper: {
		'\\.css$': 'identity-obj-proxy',
    '@/tests/(.*)$': '<rootDir>/tests/$1',
    '@/(.*)$': '<rootDir>/src/$1',
	},
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/config/setupFilesAfterEnv.ts'],
  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
            dynamicImport: false,
          },
          transform: {
            react: {
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              useBuiltins: false,
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
};
