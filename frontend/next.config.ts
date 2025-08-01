

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aquí es donde añades las opciones de configuración de Next.js
  images: {
    // Aquí defines qué dominios están permitidos para las imágenes de next/image
    domains: [
      "ik.imagekit.io",
      "imgs.search.brave.com",
      "thumbs.dreamstime.com",
      "example.com", // <-- ¡Añade este dominio aquí!
      // Si tus imágenes están alojadas en otros dominios (ej. un CDN o tu propio backend),
      // deberías añadir esos dominios también.
      // Por ejemplo, si sirves imágenes desde tu backend en localhost:3000 en desarrollo:
      // 'localhost',
    ],
  },
  // Puedes añadir otras configuraciones aquí si las necesitas en el futuro
  /* config options here */
};

export default nextConfig;