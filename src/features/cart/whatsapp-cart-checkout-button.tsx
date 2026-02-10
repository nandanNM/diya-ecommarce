import { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { SUPPORT_WHATSAPP } from "@/lib/constants";
import { CartItem } from "@/store/useCartStore";
import { cn, formatCurrency } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface WhatsAppCartCheckoutButtonProps extends ButtonProps {
  cartItems: CartItem[];
  subtotal: number;
}

export default function WhatsAppCartCheckoutButton({
  cartItems,
  subtotal,
  className,
  ...props
}: WhatsAppCartCheckoutButtonProps) {
  const handleWhatsAppCheckout = () => {
    const itemsDetails = cartItems
      .map((item) => {
        return `*${item.product.name}*
   - Qty: ${item.quantity}
   - Price: ${formatCurrency(item.product.priceData?.price)}`;
      })
      .join("\n");

    const message = `Hi, I want to confirm my order.

*Order Details:*
${itemsDetails}

*Total Amount:* ${formatCurrency(subtotal)}

Please confirm my order and share payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <LoadingButton
      onClick={handleWhatsAppCheckout}
      loading={false}
      variant="default"
      className={cn(
        "flex w-full gap-3 bg-[#25D366] py-6 text-white hover:bg-[#25D366]/90",
        className
      )}
      {...props}
    >
      <MessageCircle className="h-5 w-5 fill-current" />
      Checkout via WhatsApp
    </LoadingButton>
  );
}
