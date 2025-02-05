import { useEffect, useState, useRef, useCallback } from "react";
import { IProduct as Product_Type } from "../types/product";

const ProductList = () => {
  const [productList, setProductList] = useState<Product_Type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const getProductList = async (skip: number) => {
    const url = `https://dummyjson.com/products/?limit=16&skip=${skip}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.products.length === 0) {
        setHasMore(false);
      } else {
        setProductList((prevProducts) => {
          const newProducts = result.products.filter(
            (newProduct: Product_Type) =>
              !prevProducts.some(
                (prevProduct) => prevProduct.id === newProduct.id
              )
          );
          return [...prevProducts, ...newProducts];
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const lastProductRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prevSkip) => prevSkip + 16);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    getProductList(skip);
  }, [skip]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex w-full border-b-2 py-2 items-center rounded-b-lg px-2 justify-between border-gray-500/70 shadow-md shadow-[#f01436]/50">
        <ul>فهرست محصولات</ul>
        <button className="px-4 pb-2 rounded-full text-white bg-[#f01436]">
          ورود
        </button>
      </header>

      <h2>محصولات</h2>

      <div className="flex w-full mt-8 flex-wrap px-2">
        {productList.map((product, index) => {
          if (productList.length === index + 1) {
            return (
              <div
                ref={lastProductRef}
                key={product.id}
                className="w-[25%] max-[800px]:w-1/2 max-[580px]:w-full max-[1250px]:w-[33.3333%] max-[550px]:w-full flex justify-between hover:scale-[1.01] hover:bg-white hover:z-20 flex-col pb-2 relative border-[0.2px] hover:shadow-[0_3px_10px_-5px_rgba(0,0,0,0.8)] border-gray-400/[0.5]"
              >
                <div className="w-full p-5 h-[300px] flex justify-center">
                  <img
                    height={300}
                    className="h-[300px]"
                    src={product.images[0]}
                    alt=""
                  />
                </div>
                <p className="font-bold text-base px-2 mt-4">{product.title}</p>

                <div className="flex justify-between flex-col gap-2 px-2 mt-5">
                  <div className="flex justify-between w-full">
                    <p className="text-[#f01436]">
                      {product.price.toLocaleString()} ریال
                    </p>
                    <p className="flex items-center justify-center rounded-full px-2 font-bold text-white bg-[#D32F2F]">
                      {product.discountPercentage.toLocaleString()}٪
                    </p>
                  </div>
                  <p className="font-medium line-through text-[#c0c2c5]">
                    {product.price.toLocaleString()} ریال
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={product.id}
                className="w-[25%] max-[800px]:w-1/2 max-[580px]:w-full max-[1250px]:w-[33.3333%] max-[550px]:w-full flex justify-between hover:scale-[1.01] hover:bg-white hover:z-20 flex-col pb-2 relative border-[0.2px] hover:shadow-[0_3px_10px_-5px_rgba(0,0,0,0.8)] border-gray-400/[0.5]"
              >
                <div className="w-full p-5 h-[300px] flex justify-center">
                  <img
                    height={300}
                    className="h-[300px]"
                    src={product.images[0]}
                    alt=""
                  />
                </div>
                <p className="font-bold text-base px-2 mt-8">{product.title}</p>
                <div className="flex justify-between flex-col gap-2 px-2 mt-5">
                  <div className="flex justify-between w-full">
                    <p className="text-[#f01436]">
                      {product.price.toLocaleString()} ریال
                    </p>
                    <p className="flex items-center justify-center rounded-full px-2 font-bold text-white bg-[#D32F2F]">
                      {product.discountPercentage.toLocaleString()}٪
                    </p>
                  </div>
                  <p className="font-medium line-through text-[#c0c2c5]">
                    {product.price.toLocaleString()} ریال
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {loading && productList.length !== 0 && (
        <div className="flex w-full py-4 justify-center items-center">
          <span className="loader relative"></span>
        </div>
      )}
      {loading && productList.length === 0 && (
        <span className="loader fixed bottom-1/2 translate-x-1/2 -translate-y-1/2 end-1/2"></span>
      )}
      {!hasMore && <p>تمام محصولات نمایش داده شدند.</p>}
    </div>
  );
};

export default ProductList;
