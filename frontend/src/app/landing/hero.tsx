"use client";

import { Logo } from "@/components/logo";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ShoppingCartSheet } from "../cart/ShoppingCartSheet";
import { useCart } from "@/context/CartContext";

const menuItems = [
  { name: "Nosotros", href: "/aboutus" },
  { name: "Productos", href: "/products" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const { getTotalItems, isCartSheetOpen, openCartSheet, closeCartSheet } =
    useCart();
  const totalItems = getTotalItems();

  const toggleMenu = () => setMenuState(!menuState);

  const handleOpenCart = () => {
    openCartSheet();
    setMenuState(false); // Cierra el menú móvil al abrir el carrito
  };

  return (
    <header>
      <nav className="bg-background fixed z-20 w-full border-b">
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo y menú de escritorio */}
            <div className="flex items-center gap-12">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
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
              {/* Botón de hamburguesa para móvil */}
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

              {/* Botones para escritorio y móvil */}
              <div className="flex items-center gap-2">
                {/* Botón de perfil */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  // onClick={() => { /* Manejar el clic del perfil */ }}
                >
                  <User className="h-5 w-5" />
                </Button>
                {/* Botón del carrito */}
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
              </div>
            </div>

            {/* Menú móvil (se posiciona de forma absoluta) */}
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
                <li>
                  {/* Botones para móvil */}
                  <div className="flex items-center gap-2">
                    {/* Botón de perfil para móvil */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      // onClick={() => { /* Manejar el clic del perfil */ }}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                    {/* Botón del carrito para móvil */}
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
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ShoppingCartSheet isOpen={isCartSheetOpen} onClose={closeCartSheet} />
    </header>
  );
};
