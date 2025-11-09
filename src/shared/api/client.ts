import axios from "axios";

// Axios instance configured with base URL from env
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://us-central1-fe-ws-test.cloudfunctions.net";

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export type ApiPriceItem = {
    business_day: number;
    price: number;
    quantity: number;
};

export type PricesResponse = {
    paper_size: string;
    prices: ApiPriceItem[][];
};

export async function fetchPrices(paperSize: string): Promise<PricesResponse> {
    const res = await api.get<PricesResponse>("/prices", {
        params: {paper_size: paperSize},
    });
    return res.data;
}
