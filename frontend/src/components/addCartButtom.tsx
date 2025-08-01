"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mueve la interfaz del producto a un archivo compartido o mantén una copia aquí
// para que el componente funcione de forma independiente.
interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: string;
}

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.stock === 0}
      className="w-full sm:w-auto"
    >
      <Plus className="mr-2 h-4 w-4" />
      {product.stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
    </Button>
  );
};
