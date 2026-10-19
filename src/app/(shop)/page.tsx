import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/src/actions";
import { Pagination, ProductGrid, Title } from "@/src/components";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })


  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>
    </>
  );
}
