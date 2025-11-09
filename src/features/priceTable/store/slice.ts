"use client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaperSize} from "../misc/types";

export type SelectedKey = { row: number; col: number } | null;

export type PriceTableState = {
    paperSize: PaperSize;
    selected: SelectedKey;
    hover: { row: number; col: number } | null;
    expanded: boolean;
};

const initialState: PriceTableState = {
    paperSize: "A4",
    selected: null,
    hover: null,
    expanded: false,
};

const slice = createSlice({
    name: "priceTable",
    initialState,
    reducers: {
        setPaperSize(state, action: PayloadAction<PaperSize>) {
            state.paperSize = action.payload;
            state.selected = null; // reset selection when changing size
            state.expanded = false; // reset expanded
        },
        setSelected(state, action: PayloadAction<SelectedKey>) {
            state.selected = action.payload;
        },
        setHover(state, action: PayloadAction<{ row: number; col: number } | null>) {
            state.hover = action.payload;
        },
        setExpanded(state, action: PayloadAction<boolean>) {
            state.expanded = action.payload;
        },
    },
});

export const {setPaperSize, setSelected, setHover, setExpanded} = slice.actions;
export default slice.reducer;
