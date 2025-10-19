import { Home, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-5 flex justify-center">
          <div className="relative">
            <Frown
              className="relative w-40 h-40 sm:w-40 sm:h-40 text-blue-600"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div className="space-y-4 mb-12 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              <span className="text-blue-600 text-4xl">404</span> Page Not Found
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, let's get you back to safety!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            Go Home
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 opacity-40">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <div className="w-2 h-2 rounded-full bg-blue-300"></div>
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-blue-300"></div>
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
        </div>
      </div>
    </div>
  );
}
