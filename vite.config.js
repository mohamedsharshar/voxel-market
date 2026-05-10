import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: proxy API calls to Laravel.
// Override in your shell: set VITE_API_PROXY_TARGET=http://127.0.0.1:8000
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: apiProxyTarget,
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
