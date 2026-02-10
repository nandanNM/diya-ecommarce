import { delay } from "@/lib/utils";
import { getProductBySlugMock } from "@/lib/product-api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "../_components/ProductDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Product from "@/components/common/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  console.log("slug", slug);
  const product = await getProductBySlugMock(slug);
  console.log("product", product);

  if (!product) notFound();

  const mainImage = product.media?.items?.[0]?.image;

  return {
    title: product.name,
    description: "Get this product on Local Shop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { slug } = params;
  await delay(100);

  const product = await getProductBySlugMock(slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <hr className="border-gray-200" />
      <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <RelatedProducts currentSlug={slug} />
      </Suspense>
    </main>
  );
}

async function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const { getAllProductsMock } = await import("@/lib/product-api");
  // Assuming getAllProductsMock is available or defaulting to import ALL_PRODUCTS directly if not exported
  const { ALL_PRODUCTS } = await import("@/data/products");
  
  const relatedProducts = ALL_PRODUCTS
    .filter((p) => p.slug !== currentSlug)
    // Simple shuffle
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
