import { useState } from "react";
import { Batch, formatBatchNo } from "@/lib/batches";
import { ScoreDial } from "./ScoreDial";
import { ChevronDown } from "lucide-react";

type Props = {
  batch: Batch;
  isBest: boolean;
  parentName?: string;
};

export const BatchCard = ({ batch, isBest, parentName }: Props) => {
  const [open, setOpen] = useState(false);
  const dateLabel = batch.date.split("-").reverse().join(".");

  return (
    <article
      onClick={() => setOpen((o) => !o)}
      className={`group cursor-pointer rounded-2xl border bg-card p-5 transition-all duration-200 hover:bg-card-hover hover:border-primary/40 ${
        isBest ? "border-primary/60 amber-glow" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/15 border border-primary/30 px-3 py-2 text-center min-w-[72px]">
            <div className="font-display text-xl text-primary leading-none">
              {formatBatchNo(batch.number)}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground tracking-wider">
              {dateLabel}
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl text-foreground leading-tight">
              {batch.name}
            </h3>
            {batch.variationOf && parentName && (
              <p className="text-xs text-muted-foreground mt-0.5">
                ↳ variation of {formatBatchNo(batch.variationOf)} {parentName}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isBest && (
            <span className="pill bg-primary text-primary-foreground font-display tracking-widest text-[11px]">
              ★ Best Batch
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3">
        <ScoreDial label="Skin" value={batch.scores.skin} />
        <ScoreDial label="Glaze" value={batch.scores.glaze} />
        <ScoreDial label="Fat:Meat" value={batch.scores.fatMeat} />
        <ScoreDial label="Overall" value={batch.scores.overall} />
      </div>

      {batch.notes && !open && (
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {batch.notes}
        </p>
      )}

      {open && (
        <div className="mt-5 pt-5 border-t border-border animate-fade-in space-y-4">
          {batch.photo && (
            <img
              src={batch.photo}
              alt={batch.name}
              className="w-full max-h-72 object-cover rounded-xl border border-border"
            />
          )}
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
              Notes
            </div>
            <p className="text-sm text-foreground/90 whitespace-pre-wrap">
              {batch.notes || "— no notes —"}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};
