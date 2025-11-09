import reducer, { setPaperSize, setSelected, setExpanded } from "@/features/priceTable/store/slice";

describe("priceTable slice", () => {
  it("changes paper size and resets selection/expanded", () => {
    const s1 = reducer(undefined, setSelected({ row: 1, col: 2 }));
    const s2 = reducer(s1, setExpanded(true));
    const s3 = reducer(s2, setPaperSize("A5"));
    expect(s3.paperSize).toBe("A5");
    expect(s3.selected).toBeNull();
    expect(s3.expanded).toBe(false);
  });
});