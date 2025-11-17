
const TruckLoader = () => {
  return (
    <div className="inline-flex items-center justify-center">
      <style>{`
        @keyframes truckDrive {
          0% {
            transform: translateX(-8px);
          }
          50% {
            transform: translateX(8px);
          }
          100% {
            transform: translateX(-8px);
          }
        }


        .truck-container {
          animation: truckDrive 1s ease-in-out infinite;
        }

        .wheel {
          transform-origin: center;
          animation: wheelRotate 0.5s linear infinite;
        }

        .road-line {
          animation: roadMove 0.6s linear infinite;
        }
      `}</style>

      <svg
        width="40"
        height="20"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="truck-container"
      >
        {/* Road lines for movement effect */}
        <g>
          <rect x="0" y="65" width="15" height="2" fill="white" opacity="0.8" />
          <rect x="25" y="65" width="15" height="2" fill="white" opacity="0.8" />
          <rect x="50" y="65" width="15" height="2" fill="white" opacity="0.8" />
          <rect x="75" y="65" width="15" height="2" fill="white" opacity="0.8" />
          <rect x="100" y="65" width="15" height="2" fill="white" opacity="0.8" />
        </g>

        {/* Truck body */}
        <g>
          {/* Cargo container */}
          <rect x="20" y="30" width="50" height="25" fill="white" />
          
          {/* Cargo details - packages */}
          <rect x="24" y="34" width="12" height="12" fill="white" opacity="0.7" />
          <rect x="38" y="34" width="12" height="12" fill="white" opacity="0.8" />
          <rect x="52" y="34" width="12" height="12" fill="white" opacity="0.7" />
          
          {/* Cabin */}
          <path
            d="M 70 35 L 70 55 L 95 55 L 95 42 L 85 35 Z"
            fill="white"
          />
          
          {/* Window */}
          <path
            d="M 75 38 L 75 48 L 88 48 L 83 38 Z"
            fill="white"
            opacity="0.5"
          />
          
          {/* Front grill */}
          <rect x="93" y="45" width="2" height="8" fill="white" />
          
          {/* Wheels */}
          <g className="wheel">
            <circle cx="35" cy="58" r="6" fill="white" />
            <circle cx="35" cy="58" r="3" fill="white" opacity="0.6" />
            <circle cx="35" cy="58" r="1.5" fill="white" opacity="0.8" />
          </g>
          
          <g className="wheel">
            <circle cx="80" cy="58" r="6" fill="white" />
            <circle cx="80" cy="58" r="3" fill="white" opacity="0.6" />
            <circle cx="80" cy="58" r="1.5" fill="white" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TruckLoader;