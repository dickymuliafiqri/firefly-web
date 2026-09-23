export default function KeyFailoverDiagram() {
  return (
    <svg className="dg" viewBox="0 0 520 300" role="img" aria-label="Key failover diagram">
      <path className="base" d="M142 150 C240 150 280 64 376 64" />
      <path className="base" d="M142 150 C240 150 280 154 376 154" />
      <path className="base" d="M142 150 C240 150 280 244 376 244" />
      <path className="flow kf-f1" d="M142 150 C240 150 280 64 376 64" />
      <path className="flow kf-f2" d="M142 150 C240 150 280 154 376 154" />
      <text className="st red" x="316" y="52">
        429 &#183; cooldown
      </text>
      <text className="st grn" x="302" y="142">
        takeover
      </text>
      <rect x="40" y="120" width="102" height="60" rx="12" className="node ff" />
      <text x="91" y="154" textAnchor="middle">
        Firefly
      </text>
      <rect x="376" y="40" width="100" height="48" rx="10" className="node kf-k1" />
      <text x="426" y="69" textAnchor="middle">
        key 1
      </text>
      <rect x="376" y="130" width="100" height="48" rx="10" className="node" />
      <text x="426" y="159" textAnchor="middle">
        key 2
      </text>
      <rect x="376" y="220" width="100" height="48" rx="10" className="node" />
      <text x="426" y="249" textAnchor="middle">
        key 3
      </text>
    </svg>
  );
}
