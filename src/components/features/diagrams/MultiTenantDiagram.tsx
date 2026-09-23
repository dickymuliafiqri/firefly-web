export default function MultiTenantDiagram() {
  return (
    <svg
      className="dg"
      viewBox="0 0 520 300"
      role="img"
      aria-label="Multi-tenant admission diagram"
    >
      <path className="base" d="M150 64 H178 C200 64 192 128 210 130" />
      <path className="base" d="M150 150 H210" />
      <path className="base" d="M150 236 H178 C200 236 192 172 210 170" />
      <path className="flow mt-a" d="M150 64 H178 C200 64 192 128 210 130" />
      <path className="flow mt-b" d="M150 150 H210" />
      <path className="flow mt-c" d="M150 236 H178 C200 236 192 172 210 170" />
      <path className="base" d="M322 150 H400" />
      <path className="flow" d="M322 150 H400" />
      <text className="st red mt-blocked" x="150" y="266">
        429 &#183; quota
      </text>
      <rect x="46" y="42" width="104" height="44" rx="10" className="node" />
      <text x="98" y="68" textAnchor="middle">
        tenant A
      </text>
      <rect x="46" y="128" width="104" height="44" rx="10" className="node" />
      <text x="98" y="154" textAnchor="middle">
        tenant B
      </text>
      <rect x="46" y="214" width="104" height="44" rx="10" className="node" />
      <text x="98" y="240" textAnchor="middle">
        tenant C
      </text>
      <rect x="210" y="106" width="112" height="88" rx="12" className="node ff" />
      <text x="266" y="144" textAnchor="middle">
        admission
      </text>
      <text x="266" y="162" textAnchor="middle">
        gate
      </text>
      <rect x="400" y="128" width="94" height="44" rx="10" className="node" />
      <text x="447" y="154" textAnchor="middle">
        Firefly
      </text>
    </svg>
  );
}
