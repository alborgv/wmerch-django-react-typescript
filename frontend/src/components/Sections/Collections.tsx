import React from "react";

import { useEffect, useState } from "react";
import { useMerchContext } from "../../context/MerchContext";

import ProductCard from "../Card/ProductCard";
import { motion } from "framer-motion";

const Collections: React.FC = () => {

    const { getAllMerch } = useMerchContext();

    const [dataMerch, setMerch] = useState<any[]>([]);

    useEffect(() => {

        const fetchMerch = async () => {
            const res = await getAllMerch();
            setMerch(res)
        }
        fetchMerch();
    }, [getAllMerch])

    return (
        <div className="bg-black text-white py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-semibold font-robotoCondensed italic">CATÁLOGO</h1>
                <h2 className="text-xl mt-2 font-robotoCondensed">DISPONIBLES A LA VENTA</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 px-12 md:px-none gap-12 max-w-full mt-12">

                    {dataMerch.map((item) => (
                        <motion.div
                            initial={{ y: 60, opacity: 0.2 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={`${Number(item.price).toLocaleString("en-US")}`}
                                image={item.images?.[0]?.image || ""}
                                width="64"
                                height="98"
                                size="lg"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;