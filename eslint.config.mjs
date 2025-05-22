import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'no-explicit-any': 'off',
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],

        extends: [tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]);
