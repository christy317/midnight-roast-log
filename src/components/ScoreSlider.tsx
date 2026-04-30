type Props = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

export const ScoreSlider = ({ label, value, onChange }: Props) => (
  <div>
    <div className="flex items-baseline justify-between mb-2">
      <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <span className="font-display text-2xl text-primary leading-none">
        {value.toFixed(1)}
      </span>
    </div>
    <input
      type="range"
      min={0}
      max={10}
      step={0.1}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="amber-slider"
    />
  </div>
);
