import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="p-4 flex justify-end">
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-8 h-8 
                   rounded-full overflow-hidden
                   bg-gray-200 dark:bg-gray-700
                   shadow-md hover:shadow-xl
                   transition-all duration-500 ease-in-out
                   transform hover:scale-110"
      >
        <Sun
          className={`absolute w-5 h-5 text-yellow-400 transition-all duration-500 ${
            darkMode
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-90"
          }`}
        />
        <Moon
          className={`absolute w-5 h-5 text-blue-500 transition-all duration-500 ${
            darkMode
              ? "opacity-0 scale-50 -rotate-90"
              : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <span
          className={`absolute inset-0 rounded-full blur-lg transition-all duration-700 ${
            darkMode
              ? "bg-yellow-400/30 scale-125"
              : "bg-blue-500/30 scale-125"
          }`}
        />
      </button>
    </header>
  );
}
