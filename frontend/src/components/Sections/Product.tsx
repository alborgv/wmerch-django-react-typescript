import React from "react";

import { useEffect, useState } from "react";
import { useMerchContext } from "../../context/MerchContext";
import { Link, useParams } from "react-router-dom";

import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { ChevronLeft, ChevronRight } from "lucide-react";

const Product: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getMerch } = useMerchContext();

    const [dataMerch, setMerch] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchMerch = async () => {
            const res = await getMerch(id || "");
            console.log("RES:", res)
            setMerch(res)
        }
        fetchMerch();
    }, [id, getMerch])

    return (
        <div className="bg-black text-white py-12 px-4">
            <div className="max-w-4xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[65%_40%] gap-12 mt-12 items-start">
                    {dataMerch && (
                        <div className="order-1 md:order-none">
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {Array.isArray(dataMerch) && dataMerch?.flatMap((product) => product.images ?? []).map((img: ProductImage, index: number) => (
                                        <CarouselItem key={index} className="">
                                            <div className="rounded-md border border-neutral-600 bg-black">
                                                <Card>
                                                    <img
                                                        src={img.image}
                                                        alt={img.alt_text}
                                                        className="w-full h-auto object-contain rounded-md" />
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="hidden md:block">
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </div>
                            </Carousel>
                            <div className="flex items-center justify-center gap-8 mt-4 md:hidden text-neutral-400">
                                <ChevronLeft className="w-6 h-6" />
                                <span className="text-sm">Desliza para ver más</span>
                                <ChevronRight className="w-6 h-6" />
                            </div>

                            <div className="mt-6 md:hidden">
                                <Link
                                    to={`/checkout/${id}`}
                                    className="bg-white font-normal text-lg text-black flex max-w-full text-center justify-center rounded-full p-4 hover:border hover:border-white hover:text-white hover:bg-black">
                                    C O M P R A R &nbsp;  A H O R A
                                </Link>
                            </div>
                        </div>

                    )}
                    <div className="flex flex-col h-full text-left font-libre mt-8 md:mt-0">
                        <p className="text-lg extrelight">W Merch</p>
                        <h1 className="md:text-5xl text-4xl font-bold italic mt-2">{dataMerch?.[0]?.name}</h1>
                        <p className="mt-6 text-2xl font-semibold">{`$${Number(dataMerch?.[0]?.price).toLocaleString("en-US")}`}</p>
                        <p className="mt-4 text-lg font-light font-libre italic">Impuesto incluído.</p>
                        <div className="hidden md:block mt-auto mb-6">
                            <Link
                                to={`/checkout/${id}`}
                                className="bg-white font-normal text-lg text-black flex max-w-full text-center justify-center rounded-full p-4 hover:border hover:border-white hover:text-white hover:bg-black">
                                C O M P R A R &nbsp;  A H O R A
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;