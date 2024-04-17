import classNames from "classnames";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { MOODS } from "@/utils";

export const Moods = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <div>
      <p className="text-white font-semibold text-base mb-4">Select a mood</p>
      <div className="grid grid-cols-4 gap-2 relative z-[1]">
        {MOODS.slice(viewAll ? 0 : 0, viewAll ? MOODS.length : 12).map(
          (style) => {
            return (
              <div
                key={style.label}
                className={classNames(
                  `w-full cursor-pointer transition-all duration-200 opacity-70 hover:opacity-100 rounded-xl bg-gradient-to-br bg-stone-900 border border-white/5 relative px-6 py-3.5 text-left flex items-center justify-between font-semibold text-white text-lg z-[1] overflow-hidden`,
                  {
                    "!opacity-100 brightness-125": style.value === value,
                  }
                )}
                onClick={() => onChange(style.value)}
              >
                {style.label}
                <p className="text-3xl">{style.emoji}</p>
                <div className="bg-black/30 -z-[1] w-full h-full absolute top-0 left-0"></div>
              </div>
            );
          }
        )}
        <div
          className={classNames(
            "w-full h-[100px] bg-gradient-to-b from-transparent absolute -bottom-8 left-0 -z-[1] flex items-end justify-center",
            {
              "to-stone-950 !z-[1]": !viewAll,
            }
          )}
        >
          <p
            className="text-white/50 hover:text-white/90 text-sm font-medium mt-2 cursor-pointer hover:underline"
            onClick={() => setViewAll(!viewAll)}
          >
            View all
            <FiChevronDown
              className={classNames(
                "inline-block ml-1 transition-all duration-200",
                {
                  "transform rotate-180": viewAll,
                }
              )}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
