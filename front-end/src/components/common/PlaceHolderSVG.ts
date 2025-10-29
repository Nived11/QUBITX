const placeholderSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 200 200">
  <defs>
    <!-- Animated blue gradient -->
    <linearGradient id="floatBlue" gradientTransform="rotate(45)">
      <stop offset="0%" stop-color="#3b82f6">
        <animate attributeName="stop-color" values="#3b82f6;#60a5fa;#3b82f6" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#60a5fa">
        <animate attributeName="stop-color" values="#60a5fa;#93c5fd;#60a5fa" dur="4s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
  </defs>

  <!-- White background (no border) -->
  <rect width="100%" height="100%" rx="14" ry="14" fill="white" />

  <!-- Broken image icon -->
  <g stroke="#2563eb" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- Frame -->
    <rect x="50" y="55" width="100" height="80" rx="8" ry="8" fill="#f9fafb" />

    <!-- Crack / broken line -->
    <path d="M55 125 L85 90 L105 110 L125 80 L145 115" />

    <!-- Mountain-like filler -->
    <path d="M55 120 L80 95 L100 115 L125 85 L145 115 Z" opacity="0.2" fill="#60a5fa" />

    <!-- Sun circle (pulsing) -->
    <circle cx="75" cy="80" r="6" fill="#3b82f6">
      <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- Floating blue shimmer underlay -->
  <g opacity="0.25">
    <path fill="url(#floatBlue)" d="M0 160 Q50 140 100 160 T200 160 V200 H0Z">
      <animateTransform attributeName="transform" type="translate" values="0 0; -40 0; 0 0" dur="5s" repeatCount="indefinite" />
    </path>
  </g>
</svg>
`;

export default placeholderSVG;
