import classNames from "classnames";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { STYLES } from "@/utils";

export const Styles = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <div>
      <p className="text-white font-semibold text-base mb-4">Select a style</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 relative z-[1]">
        {STYLES.slice(viewAll ? 0 : 0, viewAll ? STYLES.length : 9).map(
          (style) => (
            <div
              key={style.label}
              className={classNames(
                "w-full cursor-pointer transition-all duration-200 opacity-40 hover:opacity-100 rounded-xl bg-cover bg-center relative px-2 py-8 bg-gray-700 text-center font-bold text-white text-xl z-[1] overflow-hidden",
                {
                  "!opacity-100 ring-[4px] ring-white/50":
                    style.value === value,
                }
              )}
              style={{
                backgroundImage: `url(${style.image})`,
              }}
              onClick={() => onChange(style.value)}
            >
              {style.label}
              <div className="bg-black/50 -z-[1] w-full h-full absolute top-0 left-0"></div>
            </div>
          )
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
