import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePluginFonts({
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
