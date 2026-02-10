export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  media?: {
    items: MediaItem[];
    mainMedia?: MediaItem;
  };
  priceData?: PriceData;
  productOptions?: ProductOption[];
  stock?: Stock;
  brand?: string;
  ribbon?: string;
  additionalInfoSections?: AdditionalInfoSection[];
  discount?: Discount;
}

export interface MediaItem {
  _id: string;
  image?: Image;
  video?: Video;
  thumbnail?: Image;
}

export interface Image {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface Video {
  files?: VideoFile[];
  stillFrameMediaId?: string;
}

export interface VideoFile {
  url: string;
  format?: string;
  altText?: string;
}

export interface PriceData {
  price: number;
  discountedPrice: number;
  formatted?: {
    price: string;
    discountedPrice: string;
  };
  currency: string;
}

export interface ProductOption {
  name: string;
  optionType: OptionType;
  choices?: ProductOptionChoice[];
}

export interface ProductOptionChoice {
  description: string;
  value: string;
  inStock: boolean;
  media?: {
    items: MediaItem[];
  };
}

export interface Stock {
  inStock: boolean;
  quantity?: number;
}

export interface AdditionalInfoSection {
  title: string;
  description: string;
}

export interface Discount {
  type: "PERCENT" | "AMOUNT";
  value: number;
}

export enum OptionType {
  color = "color",
  drop_down = "drop_down",
}

export interface Variant {
  _id: string;
  choices: Record<string, string>;
  stock?: Stock;
  priceData?: PriceData;
  variant?: {
    priceData?: PriceData;
  };
}

export interface LineItem {
  _id: string;
  productId: string;
  name: string; // simpler name for local use
  productName?: {
    original?: string;
    translated?: string;
  };
  image?: string; // simpler image for local use
  mediaItem?: {
    url: string;
    altText?: string;
  };
  quantity: number;
  price?: {
    amount: string;
    formattedConvertedAmount: string;
  };
  fullPrice?: {
    amount: string;
    formattedConvertedAmount: string;
  };
  descriptionLines?: Array<{
    name?: {
      original?: string;
      translated?: string;
    };
    colorInfo?: {
      original?: string;
      translated?: string;
    };
    plainText?: {
      original?: string;
      translated?: string;
    };
  }>;
  url?: string;
  availability?: {
    quantityAvailable?: number;
    status?: string;
  };
}

export interface Cart {
  _id: string;
  lineItems: LineItem[];
  subtotal?: {
    amount: string;
    formattedConvertedAmount: string;
  };
}
