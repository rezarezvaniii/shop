import { useEffect, useState, useRef, useCallback } from "react";
import { IProduct as Product_Type } from "../types/product";
import { getList as DS_Product_getList } from "../services/DataSourece/Product";
import ProductCard from "../components/product/ProductCard";

const ProductList = () => {
  const [productList, setProductList] = useState<Product_Type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const getProductList = async (skip: number) => {
    try {
      const result = await DS_Product_getList(skip);
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
      console.log(error.getErrorText);
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
              <ProductCard
                product={product}
                key={product.id}
                lastProductRef={lastProductRef}
              />
            );
          } else {
            return <ProductCard product={product} key={product.id} />;
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
      {/* {!hasMore && <p>تمام محصولات نمایش داده شدند.</p>} */}
    </div>
  );
};

export default ProductList;
