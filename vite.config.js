import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        // Minificación del js y css basada en la variable de entorno APP_ENV
        minify: process.env.APP_ENV === 'production' ? 'esbuild' : false,
        cssMinify: process.env.APP_ENV === 'production',
    },
    plugins: [
        laravel({
            // Archivos de entrada
            input: ['resources/css/app.css', 'resources/js/app.jsx', 'resources/js/app.js'],
            // Habilita la recarga en caliente
            refresh: true,
        }),
        react(),
    ],
});
