import { type ComponentType, type KeyboardEvent, type ReactNode, useRef, useState } from "react";
import CircuitBreakerDiagram from "./diagrams/CircuitBreakerDiagram";
import KeyFailoverDiagram from "./diagrams/KeyFailoverDiagram";
import LoadBalancingDiagram from "./diagrams/LoadBalancingDiagram";
import MultiTenantDiagram from "./diagrams/MultiTenantDiagram";
import SSEStreamingDiagram from "./diagrams/SSEStreamingDiagram";
import WarpRotateDiagram from "./diagrams/WarpRotateDiagram";
import { type CopySegment, featureTabs } from "./featureData";

const diagrams: Record<string, ComponentType> = {
  "panel-lb": LoadBalancingDiagram,
  "panel-kf": KeyFailoverDiagram,
  "panel-cb": CircuitBreakerDiagram,
  "panel-sse": SSEStreamingDiagram,
  "panel-mt": MultiTenantDiagram,
  "panel-warp": WarpRotateDiagram,
};

function Segments({ segments }: { segments: CopySegment[] }): ReactNode {
  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "code" ? (
          <code
            key={i}
            className="font-mono text-[13px] text-biolum-aura bg-biolum-aura/10 px-1.5 py-0.5 rounded-[5px]"
          >
            {seg.value}
          </code>
        ) : (
          <span key={i}>{seg.value}</span>
        ),
      )}
    </>
  );
}

export default function FeatureTabs() {
  const first = featureTabs[0];
  if (!first) throw new Error("featureTabs must not be empty");
  const [activeId, setActiveId] = useState<string>(first.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const count = featureTabs.length;
    const next = ((index % count) + count) % count;
    const tab = featureTabs[next];
    const el = tabRefs.current[next];
    if (tab && el) {
      setActiveId(tab.id);
      el.focus();
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTab(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab(index - 1);
    }
  }

  return (
    <section
      id="features"
      className="max-w-[1080px] mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-[14vh] pb-8 md:pb-[6vh] scroll-mt-20 md:scroll-mt-8"
    >
      <h2 className="font-display font-medium text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-4">
        Built for the hard parts.
      </h2>
      <p className="max-w-[620px] text-muted leading-[1.7] text-[16px] mb-7 sm:mb-12">
        Every firefly carries its own lantern. Here is how Firefly keeps traffic flowing when
        providers flicker, keys run dry, or hosts go dark.
      </p>

      <div
        className="flex gap-1 flex-nowrap overflow-x-auto border-b border-white/10 mb-7 sm:mb-[42px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Featured features"
      >
        {featureTabs.map((tab, i) => {
          const isActive = tab.id === activeId;
          return (
            <button
              type="button"
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className={`relative appearance-none bg-transparent border-none cursor-pointer font-sans text-[14.5px] font-medium px-[18px] py-[13px] whitespace-nowrap transition-colors ${
                isActive ? "text-ink" : "text-faint hover:text-muted"
              }`}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={tab.id}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {tab.label}
              <span
                aria-hidden="true"
                className={`absolute left-[18px] right-[18px] bottom-[-1px] h-[2px] bg-biolum-aura transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {featureTabs.map((tab) => {
        const Diagram = diagrams[tab.id];
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            className={`grid gap-8 md:gap-14 items-center md:grid-cols-[minmax(280px,5fr)_minmax(320px,6fr)] ${
              isActive ? "animate-panelfade" : "hidden"
            }`}
            role="tabpanel"
            id={tab.id}
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isActive}
          >
            <div>
              <h3 className="font-display font-medium text-[22px] md:text-[26px] mb-3 md:mb-4">
                {tab.heading}
              </h3>
              <p className="text-muted leading-[1.75] text-[15.5px] mb-[22px]">
                <Segments segments={tab.body} />
              </p>
              <ul className="list-none">
                {tab.bullets.map((bullet, bi) => (
                  <li key={bi} className="text-muted text-[14.5px] leading-[2.1]">
                    <Segments segments={bullet} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {Diagram ? <Diagram /> : null}
            </div>
          </div>
        );
      })}
    </section>
  );
}
