import React from "react";

import ProductCard from "components/Card/ProductCard";
import { useMerchContext } from "context/MerchContext";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Interest: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { getAllMerch } = useMerchContext();

    const [dataMerch, setMerch] = useState<any[]>([]);

    const fetchMerch = async () => {
        const res = await getAllMerch();
        const filtered = res.filter((item: any) => item.id.toString() !== id?.toString()).slice(0, 2);
        setMerch(filtered)
    }
    
    useEffect(() => {
        fetchMerch();
    }, [id, getAllMerch])

    return (
        <div className="bg-black text-white">
            
            <h1 className="font-robotoCondensed text-3xl font-bold italic text-center mt-6">TE PUEDE INTERESAR</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 max-w-full px-4 md:px-48 py-8" onClick={() => window.location.reload()}>
                {dataMerch.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={`${Number(item.price).toLocaleString("en-US")}`}
                        image={item.images?.[0]?.image || ""}
                        width="22"
                        height="40"
                        size="xl"
                    />
                ))}
            </div>
            <div className="flex justify-center mt-6 mb-16">
                <Link to="/collections"
                    className="inline-flex text-center gap-2 border border-white rounded-full px-6 py-3 text-white font-semibold tracking-widest hover:bg-white hover:text-black transition-colors duration-200"
                >
                    <ArrowLeft size={18} />
                    VOLVER A TODOS LOS PRODUCTOS
                </Link>
            </div>
        </div >
    )
}

export default Interest;