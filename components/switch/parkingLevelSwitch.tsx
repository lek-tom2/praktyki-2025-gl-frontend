type LevelSwitchProps = {
  value: "PL2" | "PL3";
  onChange: React.Dispatch<React.SetStateAction<"PL2" | "PL3">>;
};

const LevelSwitch = ({ value, onChange }: LevelSwitchProps) => {
  const baseBtnClasses =
    "flex items-center justify-center w-1/2 h-10 rounded-4xl transition-colors text-white font-medium";
  return (
    <div className="flex items-center bg-primary p-1 rounded-4xl w-full gap-1 h-12 ">
      <button
        className={`${baseBtnClasses} ${
          value === "PL2" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => onChange("PL2")}
      >
        PL-2
      </button>
      <button
        className={`${baseBtnClasses} ${
          value === "PL3" ? "bg-accent" : "bg-transparent"
        }`}
        onClick={() => onChange("PL3")}
      >
        PL-3
      </button>
    </div>
  );
};
export default LevelSwitch;
