export default function CircuitBreakerDiagram() {
  return (
    <svg className="dg" viewBox="0 0 520 300" role="img" aria-label="Circuit breaker diagram">
      <circle className="lamp" cx="258" cy="46" r="7" />
      <text className="cb-st cb-closed" x="274" y="50">
        closed
      </text>
      <text className="cb-st cb-open" x="274" y="50">
        open
      </text>
      <text className="cb-st cb-half" x="274" y="50">
        half-open
      </text>
      <path className="base" d="M142 150 H224" />
      <path className="base" d="M292 150 C336 150 348 74 396 74" />
      <path className="base" d="M292 150 C336 150 348 226 396 226" />
      <path className="flow cb-a" d="M142 150 H224 M292 150 C336 150 348 74 396 74" />
      <path className="flow cb-b" d="M292 150 C336 150 348 226 396 226" />
      <rect x="40" y="120" width="102" height="60" rx="12" className="node ff" />
      <text x="91" y="154" textAnchor="middle">
        Firefly
      </text>
      <polygon points="258,116 292,150 258,184 224,150" className="node" />
      <text x="258" y="212" textAnchor="middle">
        breaker
      </text>
      <rect x="396" y="52" width="94" height="42" rx="10" className="node" />
      <text x="443" y="77" textAnchor="middle">
        upstream A
      </text>
      <rect x="396" y="204" width="94" height="42" rx="10" className="node" />
      <text x="443" y="229" textAnchor="middle">
        fallback B
      </text>
    </svg>
  );
}
