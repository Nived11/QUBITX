import logo from "../../../../assets/Qubit.webp";
import loginbg from "../../../../assets/loginbg.png";

interface AuthSidePanelProps {
  title: string;
  subtitle: string;
  image?: string;
}

const AuthSidePanel = ({
  title,
  subtitle,
  image = loginbg,
}: AuthSidePanelProps) => {
  return (
    <div className="lg:w-1/2 relative flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 lg:min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100  brightness-100 hue-rotate-[18deg]"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-24 z-20">
        <svg
          className="absolute right-0 h-full w-24"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 
                 C20 30, 40 40, 15 80
                 C-5 110, 25 160, 25 180
                 C-10 220, 32 250, 5 290
                 C-14 330, 35 390, 8 400
                 C-18 460, 45 470, 10 520
                 C-12 550, 32 600, 6 620
                 C-16 660, 38 690, 10 730
                 C-14 770, 35 870, 10 840
                 C-10 880, 30 900, 5 950
                 C-8 980, 20 995, 0 1000
                 L100 1000 L100 0 Z"
            fill="white"
            filter="drop-shadow(-2px 0 4px rgba(0,0,0,0.1))"
          />
        </svg>
      </div>

      <div className="text-center text-white z-10 max-w-md relative">
        <div className="mb-6 lg:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full mx-auto flex items-center justify-center shadow-xl border-1 border-blue-700">
            <img src={logo} alt="logo" className="invert brightness-0" />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-4 lg:mt-6">
            Qubitx
          </h2>
        </div>

        <div className="hidden lg:block">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">{title}</h3>
          <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSidePanel;
