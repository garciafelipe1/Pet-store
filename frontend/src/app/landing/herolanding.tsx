"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";

// Importa solo lo necesario
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroLanding() {
  const images = [
    {
      src: "https://www.mcqueensflowers.com/cdn/shop/files/McQueens_29.06.2022_BT12605_1_2200x.jpg?v=1753092120",
      alt: "Arreglo floral",
    },
    {
      src: "https://www.mcqueensflowers.com/cdn/shop/files/McQueens_29.06.2022_BT12605_1_2200x.jpg?v=1753092120",
      alt: "Pájaros en jaula",
    },
  ];

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[EffectFade, Pagination]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        allowTouchMove={false}
        className="mySwiper h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                quality={90}
                priority={index === 0}
                draggable="true"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center text-center text-white p-6">
          <h1 className="mt-8 text-2xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125]">
            Tienda de Mascotas
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl">
            Especialistas en productos y cuidado para mascotas. Calidad,
            confianza y atención personalizada para el bienestar de tu
            compañero.
          </p>
        </div>
      </Swiper>
    </main>
  );
}
