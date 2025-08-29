import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Es mejor usar remotePatterns, ya que `domains` está obsoleto.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        // ¡Este es el nuevo dominio que necesitas agregar!
        protocol: 'https',
        hostname: 'www.mcqueensflowers.com',
        // Opcional: si quieres ser más específico, puedes añadir el pathname
        // pathname: '/cdn/shop/files/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimgproxy.com',
      }
      ,
      { 
        protocol: 'https',
        hostname:'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;