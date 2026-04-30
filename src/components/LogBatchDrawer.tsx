import { useEffect, useState } from "react";
import { Batch, formatBatchNo, nextBatchNumber } from "@/lib/batches";
import { ScoreSlider } from "./ScoreSlider";
import { X, Upload } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  batches: Batch[];
  onSave: (b: Batch) => void;
};

const todayISO = () => new Date().toISOString().slice(0, 10);

export const LogBatchDrawer = ({ open, onClose, batches, onSave }: Props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(todayISO());
  const [skin, setSkin] = useState(7);
  const [glaze, setGlaze] = useState(7);
  const [fatMeat, setFatMeat] = useState(7);
  const [overall, setOverall] = useState(7);
  const [notes, setNotes] = useState("");
  const [variationOf, setVariationOf] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setDate(todayISO());
      setSkin(7); setGlaze(7); setFatMeat(7); setOverall(7);
      setNotes("");
      setVariationOf("");
      setPhoto(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const batch: Batch = {
      id: crypto.randomUUID(),
      number: nextBatchNumber(batches),
      date,
      name: name.trim(),
      scores: { skin, glaze, fatMeat, overall },
      notes: notes.trim(),
      variationOf: variationOf ? parseInt(variationOf, 10) : null,
      photo,
    };
    onSave(batch);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-card border border-border rounded-t-2xl sm:rounded-2xl m-0 sm:m-4 animate-scale-in">
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-border bg-card">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              New entry
            </div>
            <h2 className="font-display text-3xl text-foreground leading-tight">
              Log Batch {formatBatchNo(nextBatchNumber(batches))}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-card-hover text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maltose Experiment"
                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <ScoreSlider label="Skin" value={skin} onChange={setSkin} />
            <ScoreSlider label="Glaze" value={glaze} onChange={setGlaze} />
            <ScoreSlider label="Fat : Meat" value={fatMeat} onChange={setFatMeat} />
            <ScoreSlider label="Overall" value={overall} onChange={setOverall} />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Skin shattered like glass. Maltose pass at 30min was clutch..."
              className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
                Variation of
              </label>
              <select
                value={variationOf}
                onChange={(e) => setVariationOf(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">— none —</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.number}>
                    {formatBatchNo(b.number)} · {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">
                Photo
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-background border border-border rounded-xl px-3 py-2.5 hover:border-primary/60 transition">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground truncate">
                  {photo ? "Photo attached" : "Upload (optional)"}
                </span>
                <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </label>
            </div>
          </div>

          {photo && (
            <img src={photo} alt="" className="w-full max-h-48 object-cover rounded-xl border border-border" />
          )}
        </div>

        <div className="sticky bottom-0 p-5 border-t border-border bg-card">
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full font-display tracking-widest text-2xl bg-primary text-primary-foreground rounded-xl py-4 hover:bg-primary-glow transition disabled:opacity-40 disabled:cursor-not-allowed amber-glow"
          >
            Save Batch
          </button>
        </div>
      </div>
    </div>
  );
};
