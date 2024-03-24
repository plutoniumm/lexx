<script></script>

<svg
  viewBox="0 0 100 100"
  width="100"
  height="100"
  font-family="Helvetica"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="x" x1="0" y1="0" x2="100%" y2="100%">
      <stop offset="0" stop-color="#b2F"></stop>
      <stop offset="1" stop-color="#44f"></stop>
    </linearGradient>
    <filter id="neo">
      <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.1" flood-color="#44f">
      </feDropShadow>
      <feDropShadow dx="-0.5" dy="-0.5" stdDeviation="0.1" flood-color="#b2F">
      </feDropShadow>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#2228">
      </feDropShadow>
    </filter>
  </defs>
  <rect
    filter="url(#neo)"
    fill="url(#x)"
    x="1"
    y="1"
    width="98"
    height="98"
    rx="10"
  >
  </rect>
  <path
    fill="#fff"
    filter="url(#shadow)"
    transform="scale(0.15) translate(72.5,85)"
    d="M380 125l-9-1s-96-7-134 119c-34 110-111 105-115 105h-5a102 102 0 015-204c35 0 67 18 86 47l16-11a122 122 0 10-100 188c17 0 97-6 132-119 33-110 111-105 115-105h7a102 102 0 11-94 157l-16 11a122 122 0 10112-187z"
  >
  </path>
</svg>
