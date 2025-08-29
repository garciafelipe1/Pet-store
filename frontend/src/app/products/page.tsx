"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="font-sans min-h-screen p-8 sm:p-16 pt-24 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Sidebar con filtros de Shadcn/ui */}
        <aside className="hidden md:block col-span-1 border-r pr-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <span role="img" aria-label="patas">🐾</span> Filtros
            </h2>
            <Button variant="link" className="text-sm text-gray-500 p-0 h-auto">
              Limpiar Filtros
            </Button>
          </div>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="offers">
              <AccordionTrigger className="text-base font-medium">Ofertas</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 mt-2">
                  <label htmlFor="offer-60" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="offer-60" /> <span>40% - 60%</span>
                  </label>
                  <label htmlFor="offer-40" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="offer-40" /> <span>30% - 40%</span>
                  </label>
                  <label htmlFor="offer-30" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="offer-30" /> <span>20% - 30%</span>
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categories">
              <AccordionTrigger className="text-base font-medium">Categorías</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 mt-2">
                  <label htmlFor="cat-food" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="cat-food" /> <span>Alimento</span>
                  </label>
                  <label htmlFor="cat-toys" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="cat-toys" /> <span>Juguetes</span>
                  </label>
                  <label htmlFor="cat-accessories" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="cat-accessories" /> <span>Accesorios</span>
                  </label>
                  <label htmlFor="cat-hygiene" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="cat-hygiene" /> <span>Higiene</span>
                  </label>
                  <label htmlFor="cat-clothes" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="cat-clothes" /> <span>Ropa</span>
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pets">
              <AccordionTrigger className="text-base font-medium">Mascotas</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 mt-2">
                  <label htmlFor="pet-dogs" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="pet-dogs" /> <span>Perros</span>
                  </label>
                  <label htmlFor="pet-cats" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="pet-cats" /> <span>Gatos</span>
                  </label>
                  <label htmlFor="pet-birds" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="pet-birds" /> <span>Aves</span>
                  </label>
                  <label htmlFor="pet-others" className="flex items-center space-x-2 text-sm text-gray-700">
                    <Checkbox id="pet-others" /> <span>Otros</span>
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Productos */}
        <section className="col-span-3">
          <h1 className="text-2xl font-semibold mb-8">
            {products.length} Productos disponibles 
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : products.length === 0 ? (
              <p>No hay productos para mostrar.</p>
            ) : (
              products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group block"
                >
                  {/* Imagen */}
                  <div className="relative w-full h-[250px] bg-gray-50 rounded-lg shadow-sm">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-4">
                    <p className="text-sm text-green-600 font-medium">Nuevo</p>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-gray-600 text-sm">
                      {product.category || "Producto para mascota"}
                    </p>
                    <p className="text-black font-semibold mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}