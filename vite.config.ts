import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

const path = require('path');

const removeAttributes = (options: { attributes: string[] }): Plugin => ({
  apply: 'build',
  name: 'remove-attributes',
  transform(code) {
    let codeStr = code;
    options.attributes.forEach((attribute) => {
      const attributeMatcher = new RegExp(
        `(,\\s*\\"${attribute}\\" *: *\\".*\\"|(?=\\s*\\}))|(\\s*\\"${attribute}\\" *: *\\".*\\"(,|(?=\\s*\\})))`,
        'g',
      );

      codeStr = code.replace(attributeMatcher, '');
    });

    return {
      code: codeStr,
    };
  },
});

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: 'build',
  },

  server: {
    port: 3000,
  },

  plugins: [
    removeAttributes({ attributes: ['data-testid'] }),
    react(),
    pluginRewriteAll(),
  ],
});