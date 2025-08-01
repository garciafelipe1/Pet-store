"use client";

import { Logo } from "@/components/logo";
import { Menu, X, ShoppingCart } from "lucide-react";
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
  // Usa las funciones y el estado del contexto
  const { getTotalItems, isCartSheetOpen, openCartSheet, closeCartSheet } =
    useCart();

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState === true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
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
            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
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
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-accent-foreground flex items-center gap-2"
                      onClick={() => {
                        openCartSheet(); // Usa la función del contexto
                        setMenuState(false);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Carrito ({getTotalItems()})</span>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={openCartSheet} // Usa la función del contexto
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Pasa el estado y la función de cierre del contexto al componente de la sheet */}
      <ShoppingCartSheet
        isOpen={isCartSheetOpen}
        onClose={closeCartSheet}
      />
    </header>
  );
};