import type { Product } from "@/types/product";

/**
 * Find the best matching variant for a product, based on selected options.
 * Returns the variant id or null if no suitable variant is found.
 */
export function findVariantId(
  product: Product,
  selectedOptions: Record<string, string>
): string | null {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  const choiceKeys = Object.keys(selectedOptions);

  const matchedVariant =
    choiceKeys.length === 0
      ? product.variants[0]
      : (product.variants.find((variant) =>
          choiceKeys.every(
            (key) => variant.choices?.[key] === selectedOptions[key]
          )
        ) ?? product.variants[0]);

  return matchedVariant?._id ?? null;
}
