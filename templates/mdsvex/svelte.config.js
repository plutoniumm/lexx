import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

export default {
  extensions: [ '.svelte', '.mdx', '.md' ],
  preprocess: [
    vitePreprocess(),
    mdsvex( {
      extensions: [ '.mdx', '.md' ],
      smartypants: {},
    } ),
  ],
}
