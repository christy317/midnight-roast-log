export type Batch = {
  id: string;
  number: number;
  date: string; // ISO yyyy-mm-dd
  name: string;
  scores: { skin: number; glaze: number; fatMeat: number; overall: number };
  notes: string;
  variationOf?: number | null;
  photo?: string | null; // data URL
};

const KEY = "roast.batches.v1";

export const formatBatchNo = (n: number) => `#${String(n).padStart(3, "0")}`;

export const loadBatches = (): Batch[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Batch[];
  } catch {
    return [];
  }
};

export const saveBatches = (batches: Batch[]) => {
  localStorage.setItem(KEY, JSON.stringify(batches));
};

export const nextBatchNumber = (batches: Batch[]) =>
  batches.reduce((m, b) => Math.max(m, b.number), 0) + 1;

export const bestBatch = (batches: Batch[]): Batch | null => {
  if (!batches.length) return null;
  return [...batches].sort((a, b) => b.scores.overall - a.scores.overall)[0];
};

export const dateRange = (batches: Batch[]): string => {
  if (!batches.length) return "—";
  const dates = batches.map((b) => b.date).sort();
  const fmt = (d: string) => {
    const [y, m, day] = d.split("-");
    return `${day}.${m}.${y.slice(2)}`;
  };
  if (dates[0] === dates[dates.length - 1]) return fmt(dates[0]);
  return `${fmt(dates[0])} → ${fmt(dates[dates.length - 1])}`;
};
