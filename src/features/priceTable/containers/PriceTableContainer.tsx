"use client";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/shared/store";
import {usePrices} from "../hooks/usePrices";
import {setExpanded, setHover, setPaperSize, setSelected} from "../store/slice";
import {PaperSize} from "../misc/types";
import {INITIAL_VISIBLE_ROWS} from "../misc/constants";
import {PaperSizeSelect} from "../components/PaperSizeSelect";
import {PriceGrid} from "../components/PriceGrid";
import {OrderBar} from "../components/OrderBar";
import {Button, Stack, CircularProgress, Box} from "@mui/material";

import styles from './PriceTableContainer.module.css';

export function PriceTableContainer() {
    const dispatch = useAppDispatch();
    const {paperSize, selected, hover, expanded} = useAppSelector((s) => s.priceTable);
    const {data, isLoading, isError} = usePrices(paperSize);

    // Local pending state: user changes select first, and applies via button
    const [pendingPaperSize, setPendingPaperSize] = React.useState<PaperSize>(paperSize as PaperSize);
    React.useEffect(() => {
        // keep local state in sync if global paper size changes elsewhere
        setPendingPaperSize(paperSize as PaperSize);
    }, [paperSize]);

    const visibleRows = expanded ? data?.length ?? INITIAL_VISIBLE_ROWS : INITIAL_VISIBLE_ROWS;

    const selectedPrice = React.useMemo(() => {
        if (!data || !selected) return null;
        const cell = data[selected.row]?.[selected.col];
        return cell?.price ?? null;
    }, [data, selected]);

    const handleApply = () => {
        if (pendingPaperSize !== paperSize) {
            dispatch(setPaperSize(pendingPaperSize));
        }
    };

    return (
        <div className={styles.root + " w-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8"}>
            <div className="border p-4 bg-zinc-100">
                <Stack
                    direction={{xs: "column", sm: "row"}}
                    spacing={1.5}
                    alignItems={{xs: "stretch", sm: "center"}}
                    useFlexGap
                    sx={{flexWrap: "wrap"}}
                >
                    <PaperSizeSelect value={pendingPaperSize} onChange={(v) => setPendingPaperSize(v)}/>
                    <Button
                        size="small"
                        variant="contained"
                        aria-label="Apply paper size"
                        onClick={handleApply}
                        disabled={pendingPaperSize === paperSize}
                        sx={{minWidth: 96}}
                    >
                        Apply
                    </Button>
                </Stack>
            </div>
            <div className="border p-4 bg-zinc-100">
                {isError && <div>Error loading prices</div>}
                <Box sx={{ position: "relative" }}>
                    {/* Always render the grid so tests and users can see the layout immediately. */}
                    <PriceGrid
                        data={data}
                        visibleRows={visibleRows}
                        selected={selected}
                        hover={hover}
                        onHover={(pos) => dispatch(setHover(pos))}
                        onSelect={(pos) => dispatch(setSelected(pos))}
                    />
                    {/* Loading overlay (non-blocking) */}
                    {(isLoading) && (
                        <Box
                            role="status"
                            aria-live="polite"
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "rgba(255,255,255,0.6)",
                                pointerEvents: "none",
                            }}
                        >
                            <CircularProgress size={28} thickness={5} />
                        </Box>
                    )}
                </Box>
                {!expanded && (
                    <button className="mt-3 text-sm underline" onClick={() => dispatch(setExpanded(true))}>
                        See more
                    </button>
                )}
            </div>
            <div className="md:col-span-2">
                <OrderBar price={selectedPrice}/>
            </div>
        </div>
    );
}
