export const Prompt = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <p className="text-white font-semibold text-base mb-3">Prompt</p>
      <input
        type="text"
        value={value}
        placeholder="80s pop track with bassy drums and synth"
        className="w-full p-2 mt-2 border border-white/10 bg-black/10 transition-all duration-200 focus:border-amber-200/20 focus:bg-amber-950/10 text-white rounded-xl px-5 py-5 text-lg outline-none"
        onInput={handleChange}
      />
    </div>
  );
};
