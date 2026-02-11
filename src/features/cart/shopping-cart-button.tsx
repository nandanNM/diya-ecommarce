import WhatsAppCartCheckoutButton from "@/features/cart/whatsapp-checkout-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import IKImage from "@/components/common/ik-image";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { ShoppingCartIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";

interface ShoppingCartButtonProps {
  initialData?: any | null;
  className?: string;
}

export default function ShoppingCartButton({
  initialData,
  className,
}: ShoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { items, getTotalPrice } = useCartStore();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = getTotalPrice();

  return (
    <>
      <div className="relative">
        <Button
          variant="ghost"
          className={cn("rounded-full", className)}
          size="icon"
          onClick={() => setSheetOpen(true)}
        >
          <ShoppingCartIcon />
          <span className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="flex flex-col p-6 sm:max-w-lg">
          <SheetHeader className="p-1">
            <SheetTitle>
              Your cart{" "}
              <span className="text-base">
                ({totalQuantity}
                {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex grow flex-col space-y-5 overflow-y-auto pt-1">
            <ul className="space-y-5">
              {items.map((item) => (
                <ShoppingCartItem
                  key={item.product._id}
                  item={item}
                  onProductLinkClicked={() => setSheetOpen(false)}
                />
              ))}
            </ul>
            {!items.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <Link
                    href="/#collection"
                    className="text-primary hover:underline"
                    onClick={() => setSheetOpen(false)}
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal amount:</span>
                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Delivery Charge:</span>
                <span>{totalQuantity === 1 ? formatCurrency(60) : "Free"}</span>
              </div>

              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total:</span>
                <span>
                  {formatCurrency(subtotal + (totalQuantity === 1 ? 60 : 0))}
                </span>
              </div>

              {totalQuantity === 1 && (
                <p className="mt-1 text-center text-xs font-medium text-green-600">
                  Add 1 more item for FREE delivery!
                </p>
              )}
            </div>
            <div className="w-full">
              <WhatsAppCartCheckoutButton
                cartItems={items}
                subtotal={subtotal}
                disabled={!items.length}
                className="w-full rounded"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: CartItem;
  onProductLinkClicked: () => void;
}
function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const { addItem, removeItem, deleteCartProduct } = useCartStore();

  const product = item.product;
  const productId = product._id;
  const slug = product.slug;

  const quantityLimitReached =
    !!product.stock?.quantity && item.quantity >= product.stock.quantity;

  const price =
    product.priceData?.discountedPrice || product.priceData?.price || 0;

  return (
    <li className="flex items-center gap-3">
      <div className="relative size-fit flex-none">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <IKImage
            src={
              product.media?.mainMedia?.image?.url ||
              product.media?.items?.[0]?.image?.url ||
              ""
            }
            width={110}
            height={110}
            alt={product.name}
            className="flex-none bg-secondary"
          />
        </Link>
        <button
          className="absolute -top-1 -right-1 rounded-full border bg-background p-0.5"
          onClick={() => deleteCartProduct(productId)}
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <p className="font-bold">{product.name}</p>
        </Link>
        {/* Description logic if needed, but Product type doesn't have descriptionLines like LineItem had */}
        <div className="flex items-center gap-2">
          {item.quantity} x {formatCurrency(price)}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={item.quantity === 1}
            onClick={() => removeItem(productId)}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={quantityLimitReached}
            onClick={() => addItem(product)}
          >
            +
          </Button>
          {quantityLimitReached && <span>Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
