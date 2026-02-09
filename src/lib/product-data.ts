import { Product, OptionType } from "@/lib/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "1",
    name: "Handcrafted Bamboo Lamp",
    slug: "1",
    description:
      "<p>Illuminate your home with this sustainable, handcrafted bamboo lamp. Perfect for adding a warm, natural touch to any room.</p>",
    media: {
      items: [
        {
          _id: "m1",
          image: {
            url: "https://images.unsplash.com/photo-1761839256602-0e28a5ab928d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Bamboo Lamp",
          },
        },
        {
          _id: "m2",
          image: {
            url: "https://static.wixstatic.com/media/67fd73_7975d405c750420d9de3ba48c213fd22~mv2.jpg/v1/fill/w_720,h_720,al_c,lg_1,q_85,enc_auto/67fd73_7975d405c750420d9de3ba48c213fd22~mv2.jpg",
            altText: "Bamboo Lamp Detail",
          },
        },
      ],
    },
    priceData: {
      price: 49.99,
      discountedPrice: 49.99,
      formatted: {
        price: "$49.99",
        discountedPrice: "$49.99",
      },
      currency: "USD",
    },
    productOptions: [
      {
        name: "Size",
        optionType: OptionType.drop_down,
        choices: [
          { description: "Small", value: "S", inStock: true },
          { description: "Medium", value: "M", inStock: true },
          { description: "Large", value: "L", inStock: true },
        ],
      },
      {
        name: "Color",
        optionType: OptionType.color,
        choices: [
          { description: "White", value: "#ffffff", inStock: true, },
          { description: "Terracotta", value: "#e2725b", inStock: true },
        ],
      },
    ],
    stock: {
      inStock: true,
      quantity: 15,
    },
  },
  {
    _id: "2",
    name: "Ceramic Flower Vase",
    slug: "ceramic-flower-vase",
    description:
      "<p>A beautiful minimalist ceramic vase, perfect for fresh flowers or dried arrangements.</p>",
    media: {
      items: [
        {
          _id: "m3",
          image: {
            url: "https://images.unsplash.com/photo-1581783342308-f792ca86d5da?q=80&w=1000",
            altText: "Ceramic Vase",
          },
        },
      ],
    },
    priceData: {
      price: 35.0,
      discountedPrice: 29.99,
      formatted: {
        price: "$35.00",
        discountedPrice: "$29.99",
      },
      currency: "USD",
    },
    productOptions: [
      {
        name: "Color",
        optionType: OptionType.color,
        choices: [
          { description: "White", value: "#ffffff", inStock: true },
          { description: "Terracotta", value: "#e2725b", inStock: true },
        ],
      },
    ],
    stock: {
      inStock: true,
      quantity: 5,
    },
  },
  {
    _id: "3",
    name: "Woven Jute Rug",
    slug: "woven-jute-rug",
    description:
      "<p>Add texture to your floor with this durable and eco-friendly jute rug.</p>",
    media: {
      items: [
        {
          _id: "m4",
          image: {
            url: "https://images.unsplash.com/photo-1595513824967-854737aa197e?q=80&w=1000",
            altText: "Jute Rug",
          },
        },
      ],
    },
    priceData: {
      price: 120.0,
      discountedPrice: 120.0,
      formatted: {
        price: "$120.00",
        discountedPrice: "$120.00",
      },
      currency: "USD",
    },
    stock: {
      inStock: false,
      quantity: 0,
    },
  },
  {
    _id: "4",
    name: "Test Product 56",
    slug: "56",
    description: "<p>This is a test product for slug 56.</p>",
    media: {
      items: [
        {
          _id: "m5",
          image: {
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
            altText: "Test Product",
          },
        },
      ],
    },
    priceData: {
      price: 99.99,
      discountedPrice: 89.99,
      formatted: {
        price: "$99.99",
        discountedPrice: "$89.99",
      },
      currency: "USD",
    },
    stock: {
      inStock: true,
      quantity: 10,
    },
  },
];
