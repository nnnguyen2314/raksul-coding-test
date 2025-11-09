"use client";
import React from "react";
import {PAPER_SIZES} from "../misc/constants";
import {PaperSize} from "../misc/types";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export function PaperSizeSelect({value, onChange}: { value: PaperSize; onChange: (v: PaperSize) => void }) {
    return (
        <FormControl size="small" sx={{minWidth: 160}}>
            <InputLabel id="paper-size-label">Select paper size</InputLabel>
            <Select
                labelId="paper-size-label"
                aria-label="Select paper size"
                label="Select paper size"
                value={value}
                onChange={(e) => onChange(e.target.value as PaperSize)}
            >
                {PAPER_SIZES.map((s) => (
                    <MenuItem key={s} value={s}>
                        {s}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
