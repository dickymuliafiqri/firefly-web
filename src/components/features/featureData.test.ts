import { describe, expect, it } from "vitest";
import { providers } from "../../data/providers";
import { featureTabs } from "./featureData";

describe("Landing page data contracts", () => {
  it("defines exactly 6 feature tabs with diagrams", () => {
    expect(featureTabs).toHaveLength(6);
    const expectedIds = ["panel-lb", "panel-kf", "panel-cb", "panel-sse", "panel-mt", "panel-warp"];
    expect(featureTabs.map((t) => t.id)).toEqual(expectedIds);
  });

  it("defines supported AI providers with valid SVG paths", () => {
    expect(providers.length).toBeGreaterThanOrEqual(8);
    for (const p of providers) {
      expect(p.name).toBeTruthy();
      expect(p.path).toMatch(/^M[0-9.-]/i);
    }
  });
});
