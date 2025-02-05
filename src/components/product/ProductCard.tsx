import { IProduct as Product_Type } from "../../types/product";

interface ProductCardProps {
  product: Product_Type;
  lastProductRef?: React.Ref<HTMLDivElement>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lastProductRef,
}) => {
  return (
    <>
      <div
        key={product.id}
        ref={lastProductRef}
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
            <p className="text-[#f01436]">{product.price.toLocaleString()} $</p>
            <p className="flex items-center justify-center rounded-full px-2 font-bold text-white bg-[#D32F2F]">
              {product.discountPercentage.toLocaleString()}٪
            </p>
          </div>
          <p className="font-medium line-through text-[#c0c2c5]">
            {product.price.toLocaleString()} $
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
