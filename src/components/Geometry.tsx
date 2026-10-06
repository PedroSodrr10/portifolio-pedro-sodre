export function Geometry() {
  return (
    <svg viewBox="0 0 560 530" fill="none" aria-hidden="true">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" stroke="#263337" strokeWidth=".5" />
        </pattern>
      </defs>
      <path fill="url(#grid)" d="M40 40h480v430H40z" />
      <g stroke="#fcee09">
        <path
          d="M10 160V38L32 16h147m157 0h174l28 28v126M10 382v104l23 24h158m166 0h181V365"
          opacity=".65"
        />
        <path d="M10 77V38l22-22h48M475 510h63v-52" strokeWidth="4" />
        <path d="M199 16h112M199 510h132" strokeWidth="2" />
      </g>
      <g stroke="#00d9f5" strokeWidth=".85" opacity=".7">
        {Array.from({ length: 15 }, (_, i) => {
          const a = (i * Math.PI) / 15;
          const x = 145 * Math.cos(a);
          const y = 52 * Math.sin(a);
          return (
            <ellipse
              key={i}
              cx="280"
              cy="266"
              rx={Math.abs(x) + 9}
              ry={145 - y / 3}
              transform={`rotate(-28 280 266)`}
            />
          );
        })}
        {Array.from({ length: 11 }, (_, i) => (
          <ellipse
            key={i}
            cx="280"
            cy={155 + i * 22}
            rx={Math.sqrt(Math.max(0, 1 - ((i - 5) / 6) ** 2)) * 142}
            ry={24}
            transform="rotate(-28 280 266)"
          />
        ))}
        <path
          d="m81 402 194-49 205 65-194 68Z M81 402v14l205 85 194-68v-15M286 486v15"
          opacity=".45"
        />
      </g>
      <path d="m52 278 26-26h41M435 276h47l25-25" stroke="#fcee09" />
      <path d="M268 256h24m-12-12v24" stroke="#fcee09" />
      <g fill="#fcee09">
        <rect x="45" y="47" width="38" height="5" />
        <rect x="88" y="47" width="8" height="5" />
        <path d="m462 471 9-9h9l-9 9zm17 0 9-9h9l-9 9zm17 0 9-9h9l-9 9z" />
      </g>
      <g fill="#b5b9b8" fontFamily="monospace" fontSize="9" letterSpacing="2">
        <text x="46" y="76">
          DESIGN + DESENVOLVIMENTO
        </text>
        <text x="45" y="481">
          PEDRO SODRÉ / WEB
        </text>
      </g>
    </svg>
  );
}
