import { BsDice3Fill } from "react-icons/bs";

export const Prompt = ({
  value,
  onChange,
  onRandomize,
}: {
  value: string;
  onChange: (value: string) => void;
  onRandomize: () => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <p className="text-white font-semibold text-base mb-5">Prompt</p>
      <div className="w-full border border-white/10 bg-black/10 focus-within:border-amber-200/20 focus-within:bg-amber-950/10 rounded-xl overflow-hidden flex items-center justify-between pr-5">
        <input
          type="text"
          value={value}
          placeholder="80s pop track with bassy drums and synth"
          className="w-full p-2 transition-all duration-200 bg-transparent text-white px-5 py-5 text-lg outline-none border-none flex-1"
          onInput={handleChange}
        />
        <BsDice3Fill
          className="text-white text-2xl transition-all duration-all hover:-rotate-90 cursor-pointer"
          onClick={onRandomize}
        />
      </div>
    </div>
  );
};
