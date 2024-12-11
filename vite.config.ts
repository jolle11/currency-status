import react from '@vitejs/plugin-react';
import Fonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		Fonts({
			google: {
				families: [
					{
						name: 'Merriweather',
						styles: 'wght@400;700',
						defer: true,
					},
				],
			},
		}),
	],
});
