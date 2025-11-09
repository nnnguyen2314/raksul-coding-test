import { formatNumber } from "@/shared/utils/numbers";

describe("formatYen", () => {
  it("formats small numbers", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(12)).toBe("12");
    expect(formatNumber(999)).toBe("999");
  });
  it("adds commas every 3 digits", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(9999)).toBe("9,999");
    expect(formatNumber(123456789)).toBe("123,456,789");
  });
  it("rejects negative numbers", () => {
    expect(() => formatNumber(-1)).toThrow();
  });
});
