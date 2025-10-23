import { colors } from './src/constants/style/colors';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/components/**/*.{ts,tsx,js,jsx}', './app/**/*.{ts,tsx,js,jsx}'],

  theme: {
    extend: {
      tokens: {
        colors,
      },
    },
  },
});
