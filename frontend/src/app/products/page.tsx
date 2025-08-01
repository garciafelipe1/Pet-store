"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, openCartSheet } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            `Error HTTP: ${res.status} - ${errorData.message || res.statusText}`
          );
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    
    openCartSheet();
  };

  return (
    <>
      <main className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 pt-24">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Nuestros Productos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p className="text-red-500">
              Error al cargar los productos: {error}
            </p>
          ) : products.length === 0 ? (
            <p>No hay productos para mostrar.</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={150}
                    style={{ objectFit: "contain" }}
                    className="rounded-md mb-4 justify-center mx-auto"
                  />
                )}
                {!product.imageUrl && (
                  <div className="w-full h-[150px] bg-primary flex items-center justify-center rounded-md mb-4 text-primary">
                    No Image
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2 text-primary dark:text-secondary text-center">
                  {product.name}
                </h2>
                <p className="text-primary dark:text-secondary mb-2">
                  {product.description.substring(0, 100)}...
                </p>
                <p className="text-primary dark:text-secondary font-bold text-lg mb-1">
                  ${product.price.toFixed(2)}
                </p>

                <Button
                  className="mt-4 w-full bg-primary text-secondary hover:bg-secondary hover:text-primary/40 dark:bg-secondary dark:text-primary dark:hover:bg-primary dark:hover:text-secondary/80"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
                </Button>
                <Link href={`/products/${product._id}`} passHref>
                  <Button
                    variant="outline"
                    className="mt-4 w-full bg-primary text-secondary hover:bg-secondary hover:text-primary/40 dark:bg-secondary dark:text-primary dark:hover:bg-primary dark:hover:text-secondary/80"
                  >
                    Ver Detalles
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
