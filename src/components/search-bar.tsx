"use client";

import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import AddToCartButton from "@/features/cart/add-to-cart-button";
import PriceView from "./price-view";
import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/data/products";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(() => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const filtered = ALL_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={setShowSearch}>
      <DialogTrigger
        onClick={() => setShowSearch(true)}
        className="flex items-center hover:cursor-pointer"
        asChild
      >
        <Button
                variant="ghost"
                size="icon"
                className="flex rounded-full p-0 text-foreground transition-transform hover:scale-110"
              >
                <Search className="h-5.5 w-5.5 stroke-[1.2]" />
              </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-3">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product here..."
              className="flex-1 rounded-md py-5 font-semibold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 transition-colors duration-200 cursor-pointer"
              />
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 bg-primary/10 w-10 h-full flex items-center justify-center rounded-tr-md hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full overflow-y-auto border border-primary/20 rounded-md bg-transparent">
          <div className="">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.p
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center px-6 gap-1 py-10 text-center text-green-600 font-semibold justify-center"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching in progress...
                </motion.p>
              ) : products?.length ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {products.map((product: Product, index: number) => (
                    <motion.div
                      key={product?._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="bg-transparent overflow-hidden border-b border-primary/10 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <div className="flex items-center p-1">
                        <Link
                          href={`/products/${product?.slug}`}
                          onClick={() => setShowSearch(false)}
                          className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 border border-primary/20 rounded-md overflow-hidden group relative"
                        >
                          {product?.media?.items?.[0]?.image?.url && (
                            <Image
                              fill
                              src={product.media.items[0].image.url}
                              alt={product.name}
                              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                              onClick={(e) => e.preventDefault()}
                            />
                          )}
                        </Link>
                        <div className="px-4 py-2 flex-grow">
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/products/${product?.slug}`}
                              onClick={() => setShowSearch(false)}
                            >
                              <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1 hover:text-primary transition-colors duration-200">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-1">
                                {product.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                              </p>
                            </Link>
                            <PriceView
                              price={product.priceData?.price}
                              discountedPrice={product.priceData?.discountedPrice}
                              className="md:text-lg"
                            />
                          </div>

                          <div className="w-full sm:w-60 mt-1">
                            <AddToCartButton
                              product={product}
                              selectedOptions={{}}
                              quantity={1}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-10 font-semibold tracking-wide"
                >
                  {search ? (
                    <p>
                      Nothing match with the keyword{" "}
                      <span className="underline text-red-600">{search}</span>.
                      Please try something else.
                    </p>
                  ) : (
                    <p className="text-green-600 flex items-center justify-center gap-1">
                      <Search className="w-5 h-5" />
                      Search and explore your products.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
