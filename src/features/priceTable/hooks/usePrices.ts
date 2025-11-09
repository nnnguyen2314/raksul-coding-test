"use client";
import {useQuery} from "@tanstack/react-query";
import {fetchPrices} from "@/shared/api/client";
import {PricesMatrix} from "../misc/types";

export function usePrices(paperSize: string) {
    const q = useQuery({
        queryKey: ["prices", paperSize.toLowerCase()],
        queryFn: () => fetchPrices(paperSize),
        select: (data) => data.prices as PricesMatrix,
        staleTime: 1000 * 60,
    });
    return q;
}
