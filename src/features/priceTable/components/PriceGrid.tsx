"use client";
import React from "react";
import {PricesMatrix} from "../misc/types";
import {formatNumber} from "@/shared/utils/numbers";
import {Box, ButtonBase, Typography} from "@mui/material";

export type PriceGridProps = {
    data: PricesMatrix | undefined;
    visibleRows: number;
    selected: { row: number; col: number } | null;
    hover: { row: number; col: number } | null;
    onHover: (pos: { row: number; col: number } | null) => void;
    onSelect: (pos: { row: number; col: number }) => void;
};

export function PriceGrid({data, visibleRows, selected, hover, onHover, onSelect}: PriceGridProps) {
    const rows = data || [];
    const toShow = rows.slice(0, visibleRows);

    return (
        <Box sx={{width: "100%"}}>
            <Typography variant="body2" sx={{mb: 1}}>Price table</Typography>
            {/* Scroll wrapper to keep grid responsive on small screens */}
            <Box sx={{width: "100%", overflowX: "auto"}}>
                <Box component="div" sx={{display: "inline-block", border: 1, borderColor: "divider", maxWidth: "100%"}}
                     role="grid" aria-label="Price table">
                    {toShow.map((row, rIdx) => (
                        <Box role="row" sx={{display: "flex"}} key={rIdx}>
                            {row.map((cell, cIdx) => {
                                const isSelected = selected && selected.row === rIdx && selected.col === cIdx;
                                const isHover = hover && hover.row === rIdx && hover.col === cIdx;
                                const inHoverRow = hover && hover.row === rIdx;
                                const inHoverCol = hover && hover.col === cIdx;
                                const bg = isHover ? "action.hover" : (inHoverRow || inHoverCol) ? "action.selected" : "background.paper";
                                return (
                                    <ButtonBase
                                        key={cIdx}
                                        role="gridcell"
                                        aria-label={`Q${cell.quantity} / ${cell.business_day}d: ${cell.price}`}
                                        onMouseEnter={() => onHover({row: rIdx, col: cIdx})}
                                        onMouseLeave={() => onHover(null)}
                                        onClick={() => onSelect({row: rIdx, col: cIdx})}
                                        sx={{
                                            height: 44,
                                            width: {xs: 64, sm: 80},
                                            borderRight: isSelected ? 0 : 1,
                                            borderBottom: isSelected ? 0 : 1,
                                            borderColor: "divider",
                                            bgcolor: isSelected ? "#000" : bg,
                                            color: isSelected ? "#fff" : "inherit",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 14,
                                            outline: "none",
                                        }}
                                    >
                                        {formatNumber(cell.price)}
                                    </ButtonBase>
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
