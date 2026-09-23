export default function SSEStreamingDiagram() {
  return (
    <svg
      className="dg"
      viewBox="0 0 520 200"
      role="img"
      aria-label="Server-sent events streaming diagram"
    >
      <text x="258" y="52" textAnchor="middle">
        text/event-stream
      </text>
      <path className="base" d="M140 110 H380" />
      <path className="flow" d="M140 110 H380" />
      <g stroke="#2a3a55" strokeWidth="1">
        <line x1="180" y1="103" x2="180" y2="117" />
        <line x1="220" y1="103" x2="220" y2="117" />
        <line x1="260" y1="103" x2="260" y2="117" />
        <line x1="300" y1="103" x2="300" y2="117" />
        <line x1="340" y1="103" x2="340" y2="117" />
      </g>
      <circle className="pkt" r="3">
        <animateMotion dur="2.4s" begin="0s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <circle className="pkt dim" r="2.4">
        <animateMotion dur="2.4s" begin="0.34s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <circle className="pkt" r="3">
        <animateMotion dur="2.4s" begin="0.68s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <circle className="pkt dim" r="2.4">
        <animateMotion dur="2.4s" begin="1.02s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <circle className="pkt" r="3">
        <animateMotion dur="2.4s" begin="1.36s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <circle className="pkt dim" r="2.4">
        <animateMotion dur="2.4s" begin="1.7s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <circle className="pkt" r="3">
        <animateMotion dur="2.4s" begin="2.04s" repeatCount="indefinite">
          <mpath href="#sse-p" />
        </animateMotion>
      </circle>
      <path id="sse-p" className="ghostpath" d="M140 110 H380" />
      <rect x="40" y="88" width="100" height="44" rx="10" className="node ff" />
      <text x="90" y="114" textAnchor="middle">
        Upstream
      </text>
      <rect x="380" y="88" width="100" height="44" rx="10" className="node" />
      <text x="430" y="114" textAnchor="middle">
        Client
      </text>
    </svg>
  );
}
