export interface CopySegment {
  kind: "text" | "code";
  value: string;
}

export interface FeatureTab {
  id: string;
  label: string;
  heading: string;
  body: CopySegment[];
  bullets: CopySegment[][];
}

const t = (value: string): CopySegment => ({ kind: "text", value });
const c = (value: string): CopySegment => ({ kind: "code", value });

export const featureTabs: FeatureTab[] = [
  {
    id: "panel-lb",
    label: "Load balancing",
    heading: "Virtual Combos",
    body: [
      t("Group many upstream models under one public name and let Firefly pick the lane. Choose "),
      c("least_inflight"),
      t(", "),
      c("round_robin"),
      t(", or a "),
      c("failover"),
      t(" chain, so the pool absorbs bursts and dead providers without clients ever noticing."),
    ],
    bullets: [
      [t("\u2013 per-request least-inflight routing")],
      [t("\u2013 automatic reroute when a lane fails")],
      [t("\u2013 one model name, many upstreams")],
    ],
  },
  {
    id: "panel-kf",
    label: "Key failover",
    heading: "KeyRing failover",
    body: [
      t("A key that hits "),
      c("429"),
      t(" cools down for exactly as long as the provider asks; a key that answers "),
      c("401"),
      t(" is revoked on the spot. Traffic slides to the next key in the ring, mid-stream."),
    ],
    bullets: [
      [t("\u2013 cooldown parsed from "), c("Retry-After")],
      [t("\u2013 instant failover to the next key")],
      [t("\u2013 never trips the host circuit breaker")],
    ],
  },
  {
    id: "panel-cb",
    label: "Circuit breaker",
    heading: "Circuit breaker",
    body: [
      t(
        "Five consecutive 5xx or transport failures open the breaker on an upstream host; client errors never trip it. While open, traffic rides the fallback; a half-open probe checks if the host has recovered.",
      ),
    ],
    bullets: [
      [t("\u2013 closed \u2192 open \u2192 half-open lifecycle")],
      [t("\u2013 fallback upstream while open")],
      [t("\u2013 active health probes in the background")],
    ],
  },
  {
    id: "panel-sse",
    label: "SSE streaming",
    heading: "SSE streaming relay",
    body: [
      t(
        "Tokens are flushed the instant they arrive. A watchdog closes sockets that go silent, and a client disconnect instantly stops upstream token generation, so you never pay for tokens nobody is reading.",
      ),
    ],
    bullets: [
      [t("\u2013 high-concurrency streams per node")],
      [t("\u2013 idle-timeout watchdog per stream")],
      [t("\u2013 disconnect abort stops upstream billing")],
    ],
  },
  {
    id: "panel-mt",
    label: "Multi-tenant",
    heading: "Multi-tenant admission",
    body: [
      t(
        "Each tenant key carries its own token-bucket rate limit, concurrency cap, quota and expiry. The admission gate admits, queues and refuses per tenant; one noisy tenant never starves the rest.",
      ),
    ],
    bullets: [
      [t("\u2013 token-bucket RPS per tenant")],
      [t("\u2013 quota & expiry enforced inline")],
      [t("\u2013 fair queueing at the gate")],
    ],
  },
  {
    id: "panel-warp",
    label: "Cloudflare WARP",
    heading: "Built-in WARP egress",
    body: [
      t(
        "Every upstream call can leave through an embedded Cloudflare WARP tunnel: userspace WireGuard over netstack, dynamic device registration with the Cloudflare edge, and SOCKS5 or HTTP egress routing.",
      ),
    ],
    bullets: [
      [t("\u2013 429-triggered auto-rotate to a fresh public IP")],
      [t("\u2013 throttled, single-flight rotation per config interval")],
      [t("\u2013 old session drains while the new one takes traffic")],
    ],
  },
];
