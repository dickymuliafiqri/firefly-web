export default function WarpRotateDiagram() {
  return (
    <svg
      className="dg"
      viewBox="0 0 520 300"
      role="img"
      aria-label="Built-in Cloudflare WARP with auto-rotate diagram"
    >
      {/* Top rotation track: old session drains while new session takes traffic */}
      <path className="base" d="M155 60 C240 10 320 10 365 60" />
      <path className="flow kf-f1" d="M155 60 C240 10 320 10 365 60" />
      <path className="base" d="M365 74 C320 114 240 114 155 74" />
      <path className="flow kf-f2" d="M365 74 C320 114 240 114 155 74" />

      <text className="st red" x="170" y="24">
        429 &middot; trigger rotate
      </text>
      <text className="st grn" x="330" y="126">
        new IP &middot; drain old
      </text>

      {/* Rotation session nodes */}
      <rect x="40" y="42" width="110" height="44" rx="10" className="node" />
      <text x="95" y="62" textAnchor="middle">
        session A
      </text>
      <text x="95" y="78" textAnchor="middle" fill="#607b96" fontSize="10">
        draining
      </text>

      <rect x="370" y="42" width="110" height="44" rx="10" className="node ff" />
      <text x="425" y="62" textAnchor="middle">
        session B
      </text>
      <text x="425" y="78" textAnchor="middle" fill="#bef264" fontSize="10">
        active IP
      </text>

      {/* Egress tunnel flow */}
      <path className="base" d="M140 196 H200" />
      <path className="flow" d="M140 196 H200" />
      <path className="base" d="M312 196 H380" />
      <path className="flow" d="M312 196 H380" />

      {/* Ghost path for animated packet */}
      <path id="warp-p" className="ghostpath" d="M140 196 H380" />
      <circle className="pkt" r="3">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath href="#warp-p" />
        </animateMotion>
      </circle>

      <text x="256" y="152" textAnchor="middle" fill="#8494b3" fontSize="11">
        userspace WireGuard &middot; netstack
      </text>

      {/* Data plane nodes */}
      <rect x="40" y="174" width="100" height="44" rx="10" className="node" />
      <text x="90" y="200" textAnchor="middle">
        Client
      </text>

      <rect x="200" y="166" width="112" height="60" rx="12" className="node ff" />
      <text x="256" y="196" textAnchor="middle">
        Firefly
      </text>
      <text x="256" y="214" textAnchor="middle" fill="#8494b3" fontSize="11">
        WARP egress
      </text>

      <rect x="380" y="174" width="100" height="44" rx="10" className="node" />
      <text x="430" y="200" textAnchor="middle">
        WARP Edge
      </text>
    </svg>
  );
}
