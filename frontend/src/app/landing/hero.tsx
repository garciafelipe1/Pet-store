"use client";

import { Menu, X, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useRef } from "react"; // 👈 Importamos useRef
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ShoppingCartSheet } from "../cart/ShoppingCartSheet";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const menuItems = [
  { name: "Nosotros", href: "/aboutus" },
  { name: "Productos", href: "/products" },
];

const ActionButtons = () => {
  const { getTotalItems, openCartSheet } = useCart();
  const totalItems = getTotalItems();
  const router = useRouter();

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={handleProfileClick}
      >
        <User className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={openCartSheet}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {totalItems}
          </span>
        )}
      </Button>
      <ModeToggle />
    </>
  );
};

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const { isCartSheetOpen, closeCartSheet } = useCart();
  const toggleMenu = () => setMenuState(!menuState);
  
  // 👈 Referencia para la barra de navegación
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 👈 La nueva lógica está aquí
    const navElement = navRef.current;
    if (!navElement) return;

    if (isCartSheetOpen) {
      // Calcula el ancho de la barra de desplazamiento
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Oculta el scroll y añade el padding para compensar
      document.body.style.overflow = "hidden";
      navElement.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restaura los estilos al cerrar el carrito
      document.body.style.overflow = "auto";
      navElement.style.paddingRight = "";
    }

    return () => {
      // Limpieza al desmontar
      document.body.style.overflow = "auto";
      if (navElement) {
        navElement.style.paddingRight = "";
      }
    };
  }, [isCartSheetOpen]);

  return (
    <header>
      {/* 👈 Añadimos la referencia aquí */}
      <nav ref={navRef} className="bg-background fixed z-20 w-full border-b">
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo y menú de escritorio */}
            <div className="flex items-center gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvOTEzNC85MTM0NTk0LnBuZw==&ts=1756442070&sig=78ed0fa94f827e93c110db83a474a76dd5d409385ae2e3dcb05b4c56a8c19d4a"
                  alt="Logo de la empresa"
                  width={40}
                  height={50}
                  className="h-auto w-auto"
                />
              </Link>
              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Botones de acción y menú de hamburguesa */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMenu}
                aria-label={menuState ? "Cerrar Menú" : "Abrir Menú"}
                aria-expanded={menuState}
                className="relative z-20 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className={`m-auto size-6 duration-200 ${
                    menuState ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 m-auto size-6 duration-200 ${
                    menuState ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              </button>

              <div className="hidden lg:flex items-center gap-2">
                <ActionButtons />
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                 <ActionButtons />
              </div>

            </div>

            {/* Menú móvil */}
            <div
              className={`${
                menuState ? "block" : "hidden"
              } bg-background absolute left-0 right-0 top-full z-10 w-full rounded-b-lg border-b p-6 shadow-lg lg:hidden`}
            >
              <ul className="space-y-6 text-base">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ShoppingCartSheet isOpen={isCartSheetOpen} onClose={closeCartSheet} />
    </header>
  );
};