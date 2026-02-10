import { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { SUPPORT_WHATSAPP } from "@/lib/constants";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface WhatsAppCheckoutButtonProps extends ButtonProps {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function WhatsAppCheckoutButton({
  product,
  quantity,
  selectedOptions,
  className,
  ...props
}: WhatsAppCheckoutButtonProps) {
  const handleWhatsAppCheckout = () => {
    const optionsString = Object.entries(selectedOptions)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    const message = `Hi, I want to buy *${product.name}*
    
*Details:*
Quantity: ${quantity}
Price: ₹${product.priceData?.price}
${optionsString ? `Options: ${optionsString}` : ""}

Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <LoadingButton
      onClick={handleWhatsAppCheckout}
      loading={false}
      variant="default" 
      className={cn("flex gap-3 py-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white", className)}
      {...props}
    >
      <MessageCircle className="h-5 w-5 fill-current" />
      Buy via WhatsApp
    </LoadingButton>
  );
}
