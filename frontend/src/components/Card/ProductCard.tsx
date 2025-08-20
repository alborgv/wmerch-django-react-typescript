import React from "react";

import { Link } from "react-router-dom";

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, width, height, size }) => {
    
    return (
        <div
            className={`rounded-xl p-4 bg-[#151515] text-white shadow-md hover:cursor-pointer hover:border hover:border-neutral-800 flex flex-col justify-between`}
        >
            <Link to={`/collections/${id}`}>
                <img src={image} alt={name} className="w-full h-auto rounded-md mb-3 object-cover" />
                <h3 className={`text-${size || "sm"} font-light`}>{name}</h3>
                <p className={`text-neutral-400 text-${size || "sm"}`}>${price}</p>
            </Link>
        </div>
    );
};

export default ProductCard;