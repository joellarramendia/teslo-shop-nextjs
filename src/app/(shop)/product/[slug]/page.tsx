export const revalidate = 604800 //7 dias


import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { titleFont } from "@/src/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/src/components";
import { getProducBySlug } from "@/src/actions";

interface Props {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug

  const product = await getProducBySlug(slug)
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`]
    }
  }
}


export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = await params
  const product = await getProducBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlidesShow */}
      <div className=" col-span-1 md:col-span-2">
        {/* Mobile SlidesShow */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />

        {/* Desktop SlidesShow */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      {/* Detalles */}
      <div className=" col-span-1 px-5">

        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className=" text-lg mb-5">${product.price}</p>

        {/* Selector de tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/* Button */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Descripcion */}
        <h3 className=" font-bold text-sm">Descripción</h3>
        <p className=" font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
}