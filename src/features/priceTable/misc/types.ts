export type PaperSize = "A4" | "A5" | "B4" | "B5";

export type PriceCell = {
    business_day: number;
    price: number;
    quantity: number;
};

export type PricesMatrix = PriceCell[][];
