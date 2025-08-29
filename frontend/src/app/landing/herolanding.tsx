"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Importamos módulos clave para el deslizamiento y la navegación
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

// Importaciones de Swiper
import "swiper/css";
import "swiper/css/navigation"; // Necesario para las flechas de navegación
import "swiper/css/pagination";
// No necesitamos "swiper/css/effect-fade" si usamos deslizamiento

// Array de imágenes que mantuviste
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1543466835-1f95a0247413?q=80&w=2940&auto=format&fit=crop",
    alt: "Perro feliz jugando con una pelota",
    title: "Juguetes y Accesorios para tu Mejor Amigo",
    subtitle: "Encuentra la diversión perfecta para cada raza.",
  },
  {
    src: "https://images.unsplash.com/photo-1598133506461-71ae75d4a1fe?q=80&w=2952&auto=format&fit=crop",
    alt: "Gato durmiendo cómodamente en una cama",
    title: "Camas y Comodidad para un Descanso Inigualable",
    subtitle: "Tu mascota merece el mejor lugar para soñar.",
  },
  {
    src: "https://images.unsplash.com/photo-1563248384-3c65c69d854e?q=80&w=2940&auto=format&fit=crop",
    alt: "Perro comiendo",
    title: "Alimentos Premium para una Vida Saludable",
    subtitle: "Nutrición especializada para el bienestar de tu mascota.",
  },
];

export default function HeroLanding() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Agregamos Navigation en los módulos
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true} // Habilitamos las flechas de navegación
        pagination={{ clickable: true }}
        // Eliminamos "effect" y "fadeEffect" para usar el deslizamiento por defecto
        className="h-full w-full"
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                quality={90}
                priority={index === 0}
                className="w-full h-full"
              />
              <div
                className="absolute inset-0 bg-black opacity-40"
                aria-hidden="true"
              ></div>
            </div>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                {image.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg md:text-xl">
                {image.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}