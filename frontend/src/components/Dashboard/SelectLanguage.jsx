import { languages } from "@/data/languages";
import Language from "./Language";
import { MagicCard } from "../ui/magic-card";
import { House, Plus } from "lucide-react";

const SelectLanguage = () => {
  return (
    <div className="relative rounded-md mx-auto w-11/12 sm:w-full flex justify-center items-center">
      {/* Circles positioned behind the SelectLanguage box */}
      <div className="absolute w-[10em] h-[10em] rounded-full shadow-[0_0_50px_#d84869] bg-gradient-to-bl from-[#d84869] to-[#f46641] animate-circle1 -left-[10%] -top-[15%] opacity-50 blur-xl z-0"></div>
      <div className="absolute w-[15em] h-[15em] rounded-full shadow-[0_0_50px_#5648d8] bg-gradient-to-bl from-[#5648d8] to-[#8641f4] animate-circle2 -right-[10%] -bottom-[20%] opacity-50 blur-xl z-0"></div>

      {/* Select Language box */}
      <div className="relative z-10  min-w-fit max-w-[620px] min-h-fit p-2 sm:p-6 bg-white/5 backdrop-blur-lg shadow-lg border border-white/30 rounded-md text-gray-200">
        <p className="text-lg text-center lg:text-start">Select a language</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3 mt-4 mb-8">
          {languages.map((language, index) => (
            <Language key={index} logo={language.logo} name={language.name} />
          ))}
        </div>
        <div className="p-[1px] relative w-full inline-block">
          <div className="absolute inset-0 rounded-md animate-border-hover pointer-events-none"></div>
          <MagicCard
            className="flex flex-col items-center px-4 py-3 dark:bg-black/20 dark:hover:bg-black/100 border-[1px] border-slate-500 hover:border-none rounded-md cursor-pointer transition-all duration-300"
            gradientColor={"#363636"}
          >
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-x-2 sm:gap-x-4">
                <House size={34} color="#3178C6" />
                <div>
                  <p className="text-purple-300 text-sm sm:text-base sm:font-semibold">JOIN ROOM</p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Join an existing room with the RoomID
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Plus size={28} color="#fff" />
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguage;
