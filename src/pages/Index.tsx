import { useEffect, useMemo, useState } from "react";
import { Plus, Flame } from "lucide-react";
import { Batch, bestBatch, dateRange, loadBatches, saveBatches } from "@/lib/batches";
import { BatchCard } from "@/components/BatchCard";
import { LogBatchDrawer } from "@/components/LogBatchDrawer";

const Index = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBatches(loadBatches());
  }, []);

  const best = useMemo(() => bestBatch(batches), [batches]);
  const sorted = useMemo(
    () => [...batches].sort((a, b) => b.number - a.number),
    [batches]
  );

  const handleSave = (b: Batch) => {
    const next = [...batches, b];
    setBatches(next);
    saveBatches(next);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-4xl py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="h-7 w-7 text-primary" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Kevin's Log · v1
            </span>
          </div>
          <h1 className="font-display text-7xl sm:text-8xl text-foreground leading-none">
            ROAST<span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md">
            A pork batch ledger for the late-night cook. Score it, note it, fork it.
          </p>

          {/* Stat line */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Stat label="Total batches" value={String(batches.length).padStart(3, "0")} />
            <Divider />
            <Stat
              label="Best score"
              value={best ? best.scores.overall.toFixed(1) : "—"}
              accent
            />
            <Divider />
            <Stat label="Range" value={dateRange(batches)} />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 font-display tracking-widest text-2xl bg-primary text-primary-foreground rounded-xl px-6 py-3.5 hover:bg-primary-glow transition amber-glow"
          >
            <Plus className="h-6 w-6" strokeWidth={3} />
            Log New Batch
          </button>
        </div>
      </header>

      {/* List */}
      <main className="container max-w-4xl py-8 sm:py-10">
        {sorted.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl">
            <p className="font-display text-3xl text-muted-foreground">
              No batches yet
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Hit “LOG NEW BATCH” to start the ledger.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((b) => (
              <BatchCard
                key={b.id}
                batch={b}
                isBest={best?.id === b.id}
                parentName={
                  b.variationOf
                    ? batches.find((x) => x.number === b.variationOf)?.name
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </main>

      <footer className="container max-w-4xl pb-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Local data · No accounts · Cook on
        </p>
      </footer>

      <LogBatchDrawer
        open={open}
        onClose={() => setOpen(false)}
        batches={batches}
        onSave={handleSave}
      />
    </div>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
      {label}
    </div>
    <div className={`font-display text-2xl leading-none ${accent ? "text-primary" : "text-foreground"}`}>
      {value}
    </div>
  </div>
);

const Divider = () => <span className="hidden sm:block h-8 w-px bg-border" />;

export default Index;
