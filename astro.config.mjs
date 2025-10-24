import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// 👇 Importa el adaptador de Vercel
import vercel from "@astrojs/vercel/server";

export default defineConfig({
  output: "server", // 👈 Necesario porque ahora usas Supabase (SSR)
  adapter: vercel(), // 👈 Indica a Astro que use Vercel como runtime
  integrations: [tailwind(), react()],
});
