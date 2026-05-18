// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/tests'],
    moduleDirectories: ['node_modules', 'javascript'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/javascript/$1',
        '^@components/(.*)$': '<rootDir>/javascript/components/$1',
        '^@services/(.*)$': '<rootDir>/javascript/services/$1',
        '^@utils/(.*)$': '<rootDir>/javascript/utils/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    collectCoverageFrom: [
        'javascript/components/**/*.js',
        'javascript/services/**/*.js',
        'javascript/utils/**/*.js',
    ],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 70,
            functions: 80,
            lines: 80
        }
    },
    verbose: true
};