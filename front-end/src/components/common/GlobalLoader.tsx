import AppName from "./AppName";

export default function GlobalLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden fixed inset-0">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Main Q SVG */}
          <svg 
            width="128" 
            height="128" 
            viewBox="0 0 128 128" 
            className="absolute inset-0 transform scale-100"
          >
            {/* Q Path - reduced size */}
            <path
              d="M64 24 A32 32 0 1 1 64 88 A32 32 0 1 1 64 24 M76 76 Q82 82, 90 90"
              fill="none"
              stroke="url(#blueGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="280"
              strokeDashoffset="280"
              className="animate-[drawQ_3s_ease-in-out_infinite]"
              filter="url(#dropShadow)"
            />
            
            {/* Gradient and effects */}
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="10%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="30%" stopColor="#0d4bd1ff" />
                <stop offset="60%" stopColor="#2375f8ff" />
                <stop offset="100%" stopColor="#4282d1ff" />
              </linearGradient>
              
              <filter id="dropShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="0" dy="2" result="offset" />
                <feFlood floodColor="#1e40af" floodOpacity="0.3"/>
                <feComposite in2="offset" operator="in"/>
                <feMerge> 
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Other glow layers and rings can stay the same */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-dashed opacity-20 animate-spin-slow"></div>
          <div className="absolute inset-0 rounded-full border border-blue-300 opacity-40 animate-ping"></div>
        </div>
        
        {/* Qubitx branding */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-700 tracking-wide">
            <span className="text-blue-600">{AppName}</span>
          </h2>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawQ {
          0% { stroke-dashoffset: 280; }
          70% { stroke-dashoffset: 0; }
          85% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -280; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}