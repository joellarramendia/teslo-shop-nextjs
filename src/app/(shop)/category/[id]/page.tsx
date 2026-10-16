import { notFound } from "next/navigation";

import { initialData } from "@/src/seed/seed";
import { ProductGrid, Title } from "@/src/components";
import { Category } from "@/src/interfaces";

const seedProducts = initialData.products

interface Props {
  params: Promise<{ id: Category }>;
}

export default async function ({ params }: Props) {

  const { id } = await params
  const products = seedProducts.filter(product => product.gender === id)

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  } 

  // if (id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title title={`Articulos ${labels[id]}`} subTitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
}