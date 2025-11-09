export function formatNumber(n: number): string {
    if (!Number.isFinite(n) || n < 0) throw new Error("formatYen expects a non-negative finite number");
    const s = Math.floor(n).toString();
    let out = "";
    let count = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        out = s[i] + out;
        count++;
        if (count === 3 && i !== 0) {
            out = "," + out;
            count = 0;
        }
    }
    return out;
}
