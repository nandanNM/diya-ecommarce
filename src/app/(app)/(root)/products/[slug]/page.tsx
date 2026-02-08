import { delay } from "@/lib/utils";
import { getProductBySlugMock } from "@/lib/product-api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "../_components/ProductDetails";

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
    </main>
  );
}
