
"use client";


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Para la cantidad
import { useCart } from "@/context/CartContext"; // Tu CartContext
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react"; // Iconos para cerrar y el carrito
import { Minus, Plus } from "lucide-react"; // Iconos para sumar y restar cantidades
// Aquí se usa la prop `isOpen` y `onClose` para controlar si la sheet está abierta o cerrada
interface ShoppingCartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCartSheet: React.FC<ShoppingCartSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } =
    useCart();

  // Puedes añadir un estado para el campo de impuestos si tuvieras una lógica real de impuestos.
  // Por ahora, lo dejaremos fijo como en tu ejemplo de imagen.
  

  const subtotal = getTotalPrice();
 
  const orderTotal = subtotal ;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
            cart
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-lg font-semibold mb-2">Tu carrito está vacío</p>
            <p className="text-sm text-gray-500 mb-6">
              Añade algunos productos para empezar a comprar.
            </p>
            <Link href="/products" passHref>
              <Button onClick={onClose}>Explorar Productos</Button>
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2">
            {" "}
            {/* Agrega pr-2 para espacio si hay scrollbar */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-2 border rounded-md"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={64} // Tamaño más pequeño para el slide-over
                      height={64}
                      style={{ objectFit: "contain" }}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-xs">
                      No Image
                    </div>
                  )}
                  <div className="flex-grow">
                    <p className="font-medium text-sm">{item.name}</p>
                    {/* Estos campos no están en tu CartItem, podrías eliminarlos o adaptarlos */}
                    <p className="text-muted-foreground text-xs">
                      {/* Color: N/A | Size: N/A */}${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-2 w-2" />
                    </Button>
                    <span className="text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-1"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <X className="h-3 w-3" />{" "}
                      {/* Usamos X para eliminar un item */}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer del carrito */}
        <SheetFooter className="mt-auto pt-6 border-t">
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Order total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-4" asChild>
            {/* asChild para que el Link de Next.js renderice el botón */}
            <Link href="/cart" onClick={onClose}>
              Checkout
            </Link>
          </Button>
          <Button variant="outline" className="w-full mt-2" onClick={onClose}>
            Continuar Comprando
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
