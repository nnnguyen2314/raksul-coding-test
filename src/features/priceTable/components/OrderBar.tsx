"use client";
import React from "react";
import {formatNumber} from "@/shared/utils/numbers";
import {Button, Paper, Stack, Typography} from "@mui/material";

export function OrderBar({price}: { price: number | null }) {
    return (
        <Paper elevation={0}
               sx={{width: "100%", p: 2, mt: 3, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="body1">Order price: {price != null ? `¥${formatNumber(price)}` : "—"}</Typography>
                <Button variant="outlined">Cart</Button>
            </Stack>
        </Paper>
    );
}
