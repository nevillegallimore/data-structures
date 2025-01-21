import { configDefaults, defineConfig } from 'vitest/config';

const configuration = defineConfig({
    test: {
        coverage: {
            exclude: [
                ...(configDefaults.coverage.exclude || []),
                'lib/index.ts',
                'lib/types.ts',
                'lib/utils.ts',
            ],
        },
        exclude: ['node_modules/**', 'dist/**'],
        include: ['lib/**/*.spec.ts'],
        reporters: [
            ['default', { summary: false }],
        ],
        watch: false,
    },
});

export default configuration;
