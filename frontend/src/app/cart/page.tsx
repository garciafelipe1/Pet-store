// frontend/src/app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext"; // Tu hook de carrito existente
import Image from "next/image";
import Link from "next/link"; // Para el botón de "Explorar Productos"

// Importar los componentes de Shadcn/UI que usa la nueva interfaz
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importar los iconos de Lucide React
import {
  Trash2,
  Plus,
  Minus,
  Package,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import { useState } from "react"; // Necesitamos useState para el método de envío

// Define la interfaz de ShippingMethod (no está en tu contexto de carrito)
interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

export default function CartPage() {
  // Desestructura las propiedades de tu CartContext
  const {
    cart, // Este será tu 'items'
    updateQuantity, // Usaremos esta directamente
    removeFromCart, // Usaremos esta directamente
    getTotalItems, // Para el conteo de ítems
    getTotalPrice, // Para el subtotal
    clearCart, // Para vaciar el carrito
    isCartLoaded, // Para manejar la hidratación
  } = useCart();

  // Estado para el método de envío (no está en el CartContext)
  const [shippingMethod, setShippingMethod] = useState<string>("standard");

  // Métodos de envío definidos localmente para la UI
  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      estimatedDays: "3-5 days",
      description: "Free shipping on orders over $200",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      estimatedDays: "1-2 days",
      description: "Priority delivery with tracking",
    },
  ];

  // Cálculo de subtotal usando getTotalPrice de tu useCart
  const subtotal = getTotalPrice();
  // Cálculo de envío basado en el método seleccionado
  const shipping =
    shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  // Cálculo del total
  const total = subtotal + shipping;

  // Manejar el estado de carga/hidratación
  if (!isCartLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Cargando Carrito...</CardTitle>
            <CardDescription>
              Por favor espera mientras cargamos tu carrito de compras.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Puedes agregar un spinner o un indicador de carga aquí */}
            <div className="animate-pulse rounded-md bg-gray-200 h-10 w-full mb-4"></div>
            <div className="animate-pulse rounded-md bg-gray-200 h-8 w-3/4 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6 py-24">
      {" "}
      {/* Ajustado padding top para el navbar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Cart Section */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {/* Si el carrito está vacío, mostrar mensaje amigable */}
          {cart.length === 0 ? (
            <Card className="text-center p-8">
              <CardTitle className="mb-4">Tu carrito está vacío.</CardTitle>
              <CardDescription className="mb-6">
                Parece que aún no has añadido ningún producto.
              </CardDescription>
              <Link href="/products" passHref>
                <Button>Explorar Productos</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item._id} className="overflow-hidden p-0">
                  {" "}
                  {/* Usamos item._id */}
                  <CardContent className="p-0">
                    <div className="flex h-full flex-col md:flex-row">
                      {/* Product Image */}
                      <div className="relative h-auto w-full md:w-32">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover md:w-32"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs md:w-32">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 p-6 pb-3">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-muted-foreground text-sm">
                              {/* Estos campos no existen en tu CartItem, puedes quitarlos o añadir un placeholder */}
                              Color: N/A • Tamaño: N/A
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item._id)} // Usa removeFromCart de tu hook
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              } // Usa updateQuantity
                              disabled={item.quantity <= 1} // Deshabilita si la cantidad es 1
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              } // Usa updateQuantity
                              // Puedes añadir disabled={item.quantity >= item.stock} si el stock está en CartItem
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {/* item.originalPrice no existe en tu CartItem, puedes quitar esta sección */}
                            {/* {item.originalPrice && (
                              <div className="text-muted-foreground text-sm line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </div>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
              <CardDescription>
                Revisa los detalles de tu pedido e información de envío.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Method */}
              <div className="space-y-2">
                <Label>Método de Envío</Label>
                <Select
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                >
                  <SelectTrigger className="w-full max-w-none data-[size=default]:h-auto">
                    <SelectValue placeholder="Selecciona método de envío" />
                  </SelectTrigger>
                  <SelectContent className="!h-auto">
                    {shippingMethods.map((method) => (
                      <SelectItem
                        key={method.id}
                        value={method.id}
                        className="!h-auto"
                      >
                        <div className="flex flex-col justify-between text-start">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {method.estimatedDays}
                          </div>
                          <div className="font-medium">
                            ${method.price.toFixed(2)}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <Label>Código Promocional</Label>
                <div className="flex gap-2">
                  <Input placeholder="Introduce código promocional" />
                  <Button variant="outline">Aplicar</Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="text-primary h-4 w-4" />
                  <span>Devoluciones gratuitas en 30 días</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="text-primary h-4 w-4" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="text-primary h-4 w-4" />
                  <span>Envío rápido</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceder al Pago
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
