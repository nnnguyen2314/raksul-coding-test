"use client";
import {ReduxProvider} from "@/shared/providers/redux";
import {ReactQueryProvider} from "@/shared/providers/query";
import {PriceTableContainer} from "@/features/priceTable/containers/PriceTableContainer";
import {Typography} from "@mui/material";

export default function Home() {
    return (
        <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans">
            <main className="flex min-h-screen w-full max-w-5xl flex-col items-stretch py-12 px-6">
                <ReactQueryProvider>
                    <ReduxProvider>
                        <Typography variant="h5" component="h1" sx={{mb: 3, color: "#000", fontWeight: "bold"}}>
                            Raksul Paper Printing
                        </Typography>
                        <PriceTableContainer/>
                    </ReduxProvider>
                </ReactQueryProvider>
            </main>
        </div>
    );
}
