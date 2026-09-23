export default function LoadBalancingDiagram() {
  return (
    <svg
      className="dg"
      viewBox="0 0 520 320"
      role="img"
      aria-label="Client to Firefly to providers flow diagram"
    >
      <path className="base" d="M84 160 H200" />
      <path className="base" d="M292 160 C340 160 350 46 396 46" />
      <path className="base" d="M292 160 C340 160 350 113 396 113" />
      <path className="base" d="M292 160 C340 160 350 214 396 214" />
      <path className="base" d="M292 160 C340 160 350 282 396 282" />
      <path className="flow" d="M84 160 H200" />
      <path className="flow f2" d="M292 160 C340 160 350 46 396 46" />
      <path className="flow f3" d="M292 160 C340 160 350 113 396 113" />
      <path className="flow f4" d="M292 160 C340 160 350 214 396 214" />
      <path className="flow f5" d="M292 160 C340 160 350 282 396 282" />
      <circle className="pkt" r="3">
        <animateMotion dur="2.2s" repeatCount="indefinite">
          <mpath href="#lb-in" />
        </animateMotion>
      </circle>
      <circle className="pkt dim" r="2.4">
        <animateMotion dur="3.1s" begin="0.7s" repeatCount="indefinite">
          <mpath href="#lb-out1" />
        </animateMotion>
      </circle>
      <circle className="pkt" r="2.4">
        <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite">
          <mpath href="#lb-out2" />
        </animateMotion>
      </circle>
      <circle className="pkt dim" r="2.4">
        <animateMotion dur="3.4s" begin="0.2s" repeatCount="indefinite">
          <mpath href="#lb-out4" />
        </animateMotion>
      </circle>
      <path id="lb-in" className="ghostpath" d="M84 160 H200" />
      <path id="lb-out1" className="ghostpath" d="M292 160 C340 160 350 46 396 46" />
      <path id="lb-out2" className="ghostpath" d="M292 160 C340 160 350 113 396 113" />
      <path id="lb-out4" className="ghostpath" d="M292 160 C340 160 350 282 396 282" />
      <circle cx="60" cy="160" r="22" className="node" />
      <text x="60" y="200" textAnchor="middle">
        Client
      </text>
      <rect x="200" y="122" width="92" height="76" rx="12" className="node ff" />
      <text x="246" y="164" textAnchor="middle">
        Firefly
      </text>
      <rect x="396" y="24" width="94" height="42" rx="10" className="node" />
      <text x="443" y="49" textAnchor="middle">
        OpenAI
      </text>
      <rect x="396" y="92" width="94" height="42" rx="10" className="node" />
      <text x="443" y="117" textAnchor="middle">
        Google
      </text>
      <rect x="396" y="193" width="94" height="42" rx="10" className="node" />
      <text x="443" y="218" textAnchor="middle">
        Anthropic
      </text>
      <rect x="396" y="261" width="94" height="42" rx="10" className="node" />
      <text x="443" y="286" textAnchor="middle">
        Mistral
      </text>
    </svg>
  );
}
