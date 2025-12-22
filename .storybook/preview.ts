import type { Preview } from '@storybook/nextjs';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    tags: ['autodocs'],
  },
};

export default preview;
