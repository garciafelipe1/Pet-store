

import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/addCartButtom"; // Importa el componente del botón

// Interface para el producto (asegúrate de que coincida con tu API)
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: string;
}

// Interface para los parámetros de la página de Next.js
interface ProductPageProps {
  params: {
    productId: string;
  };
}

// Función para obtener los datos de un solo producto
async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const product = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching single product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-24 px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex justify-center items-start">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg shadow-md"
            />
          ) : (
            <div className="w-[600px] h-[600px] bg-secondary flex items-center justify-center rounded-md text-gray-500 text-lg">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-sm">Categoría: {product.category}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
