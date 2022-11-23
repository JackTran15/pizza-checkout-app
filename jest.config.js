/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = async () => {
    return {
        preset: 'ts-jest',
        testEnvironment: 'node',
        collectCoverageFrom: [
            '**/*/*.ts',
            '!**/*/index.ts',
            '!**/*/model.ts',
            '!**/node_modules/**',
            '!**/vendor/**',
        ],
        coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: false }]],
        coverageThreshold: {
            global: {
                branches: 90,
                functions: 90,
                lines: 90,
                statements: -10,
            },
        },
        // bail: true,
        // timerLimit: 100000,
    }
}