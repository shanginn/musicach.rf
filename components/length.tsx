import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import { useClickAway, useUpdateEffect } from "react-use";
import { FiChevronDown } from "react-icons/fi";

import { LENGTHS } from "@/utils";

export const Length = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  const label = useMemo(() => {
    return LENGTHS.find((length) => length.value === value)?.label;
  }, [value]);

  useUpdateEffect(() => {
    setOpen(false);
  }, [value]);

  return (
    <div ref={ref} className="max-w-max">
      <p className="text-white font-semibold text-base mb-4">Duration</p>
      <div className="relative z-1">
        <p
          className="text-transparent bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-5xl font-extrabold cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          {label}s
          <FiChevronDown
            className={classNames(
              "inline-block text-white text-2xl ml-2 transition-all duration-200",
              {
                "transform rotate-180": open,
              }
            )}
          />
        </p>
        <ul
          className={classNames(
            "border-white/10 bg-black shadow-lg absolute top-14 p-3 left-0 w-full border border-gray-800 rounded-lg max-w-max z-20",
            {
              "opacity-0 pointer-events-none": !open,
            }
          )}
        >
          {LENGTHS.map((length) => (
            <li
              key={length.value}
              className="text-white text-base hover:from-blue-500/40 hover:to-pink-500/40 bg-gradient-to-r transition-all duration-200 p-2 rounded-md cursor-pointer"
              onClick={() => onChange(length.value)}
            >
              {length.label} seconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
