export type Sesh = {
  sesh: number;
  music: number;
  substances: number;
  cat3: number;
  hangover: number | null; // null = old 4-category era (no Hangover)
  cat5: number;
  total: number;
  maxScore: number;
  instagram: string;
};

export const SESH_DATA: Sesh[] = [
  { sesh: 1, music: 3, substances: 0, cat3: 1, hangover: 1, cat5: 1, total: 6, maxScore: 25, instagram: "https://www.instagram.com/reel/Dbjbp3ftTOY/" },
  { sesh: 2, music: 2, substances: 2, cat3: 3, hangover: 2, cat5: 0, total: 9, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DblkD45tSob/" },
  { sesh: 3, music: 3, substances: 5, cat3: 2, hangover: 4, cat5: 3, total: 17, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DboJEh5Nu7W/" },
  { sesh: 4, music: 2, substances: 2, cat3: 4, hangover: 1, cat5: 3, total: 12, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DbquVN1trzw/" },
  { sesh: 5, music: 5, substances: 0, cat3: 3, hangover: 1, cat5: 4, total: 13, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DbspGc1N6Md/" },
  { sesh: 6, music: 1, substances: 2, cat3: 3, hangover: 4, cat5: 2, total: 12, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Dbvuzk8N5ZT/" },
  { sesh: 7, music: 2, substances: 1, cat3: 4, hangover: 1, cat5: 0, total: 8, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DbyMuHatdZu/" },
  { sesh: 8, music: 4, substances: 4, cat3: 3, hangover: 3, cat5: 3, total: 17, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db0zm74N_g4/" },
  { sesh: 9, music: 2, substances: 0, cat3: 5, hangover: 0, cat5: 3, total: 10, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db3YTCet6ub/" },
  { sesh: 10, music: 3, substances: 1, cat3: 2, hangover: 1, cat5: 5, total: 12, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db56HLztQrY/" },
  { sesh: 11, music: 2, substances: 0, cat3: 1, hangover: 0, cat5: 3, total: 6, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db8fIeGN4ZF/" },
  { sesh: 12, music: 3, substances: 2, cat3: 1, hangover: 0, cat5: 2, total: 8, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db_HC_ZtDeQ/" },
  { sesh: 13, music: 2, substances: 2, cat3: 3, hangover: 4, cat5: 4, total: 15, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DcBwpPVt_GD/" },
  { sesh: 14, music: 3, substances: 1, cat3: 3, hangover: null, cat5: 4, total: 11, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcEGMtLt4-q/" },
  { sesh: 15, music: 3, substances: 4, cat3: 2, hangover: null, cat5: 5, total: 14, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcGzJ8At56y/" },
  { sesh: 16, music: 2, substances: 4, cat3: 3, hangover: null, cat5: 1, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcJk3-oNF_V/" },
  { sesh: 17, music: 0, substances: 3, cat3: 2, hangover: null, cat5: 5, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcMP1wftFjK/" },
  { sesh: 18, music: 4, substances: 4, cat3: 4, hangover: null, cat5: 2, total: 14, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcO0rFatAr4/" },
  { sesh: 19, music: 3, substances: 3, cat3: 0, hangover: null, cat5: 0, total: 6, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcRVU9EtRj2/" },
  { sesh: 20, music: 4, substances: 2, cat3: 3, hangover: null, cat5: 3, total: 12, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcUAC2kNhM_/" },
  { sesh: 21, music: 1, substances: 5, cat3: 0, hangover: null, cat5: 3, total: 9, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcWZQR7N-cB/" },
  { sesh: 22, music: 1, substances: 3, cat3: 1, hangover: null, cat5: 2, total: 7, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcY4E8jNZGn/" },
  { sesh: 23, music: 3, substances: 3, cat3: 1, hangover: null, cat5: 5, total: 12, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcbfYkzt817/" },
  { sesh: 24, music: 0, substances: 2, cat3: 2, hangover: null, cat5: 3, total: 7, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DceBdG4MhH0/" },
  { sesh: 25, music: 2, substances: 4, cat3: 1, hangover: null, cat5: 2, total: 9, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcgwUSBtv3E/" },
  { sesh: 26, music: 2, substances: 4, cat3: 2, hangover: null, cat5: 4, total: 12, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcjMCOQtho0/" },
  { sesh: 27, music: 5, substances: 3, cat3: 3, hangover: null, cat5: 4, total: 15, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DclwQ4SNY5M/" },
  { sesh: 28, music: 3, substances: 5, cat3: 4, hangover: null, cat5: 3, total: 15, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcoX6TetjSb/" },
  { sesh: 29, music: 0, substances: 2, cat3: 2, hangover: null, cat5: 4, total: 8, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcrJ810NokB/" },
  { sesh: 30, music: 1, substances: 4, cat3: 0, hangover: null, cat5: 1, total: 6, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dcthr-atINg/" },
  { sesh: 31, music: 4, substances: 4, cat3: 0, hangover: null, cat5: 2, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcwHmfPtPjr/" },
  { sesh: 32, music: 4, substances: 2, cat3: 4, hangover: null, cat5: 5, total: 15, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dcy4P76thtq/" },
  { sesh: 33, music: 2, substances: 3, cat3: 2, hangover: null, cat5: 4, total: 11, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc1Jt_BtyJf/" },
  { sesh: 34, music: 5, substances: 5, cat3: 4, hangover: null, cat5: 5, total: 19, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc3w5NxtLKy/" },
  { sesh: 35, music: 3, substances: 0, cat3: 0, hangover: null, cat5: 1, total: 4, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc6TOsctnU1/" },
  { sesh: 36, music: 4, substances: 2, cat3: 1, hangover: null, cat5: 3, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc82lSgNdJO/" },
  { sesh: 37, music: 5, substances: 0, cat3: 2, hangover: null, cat5: 1, total: 8, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc_mE9xt1WR/" },
  { sesh: 38, music: 0, substances: 4, cat3: 2, hangover: null, cat5: 0, total: 6, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DdCGVy9tvz0/" },
  { sesh: 39, music: 3, substances: 0, cat3: 2, hangover: null, cat5: 0, total: 5, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DdEpadmNYJz/" },
  { sesh: 40, music: 3, substances: 3, cat3: 3, hangover: 1, cat5: 4, total: 14, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdHT00mtFhH/" },
  { sesh: 41, music: 4, substances: 3, cat3: 3, hangover: 0, cat5: 5, total: 15, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdJ2-hsNwh9/" },
  { sesh: 42, music: 1, substances: 4, cat3: 5, hangover: 3, cat5: 4, total: 17, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdMf0z7t-W7/" },
  { sesh: 43, music: 3, substances: 2, cat3: 2, hangover: 4, cat5: 4, total: 15, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdPADFpNs-b/" },
  { sesh: 44, music: 1, substances: 0, cat3: 3, hangover: 0, cat5: 0, total: 4, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdRlxg_NqVX/" },
  { sesh: 45, music: 3, substances: 2, cat3: 4, hangover: 2, cat5: 5, total: 16, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdUGKh5tvet/" },
];

export const RANKED = [...SESH_DATA].sort((a, b) => b.total - a.total || a.sesh - b.sesh);

export const CHUNK_SIZE = 10;
export const CHUNKS: Sesh[][] = [];
for (let i = 0; i < RANKED.length; i += CHUNK_SIZE) {
  CHUNKS.push(RANKED.slice(i, i + CHUNK_SIZE));
}

/** Same 10-at-a-time chunking, but in sesh order (1–45) rather than ranked order. */
export const ORDERED_CHUNKS: Sesh[][] = [];
for (let i = 0; i < SESH_DATA.length; i += CHUNK_SIZE) {
  ORDERED_CHUNKS.push(SESH_DATA.slice(i, i + CHUNK_SIZE));
}

/** Whether a sesh number falls in the old 4-category (out of 20) scoring era. */
export function isOldEra(sesh: number): boolean {
  return sesh >= 14 && sesh <= 39;
}

/** Category labels for a given sesh, in a fixed order. "hangover" key is omitted (null) for the old era. */
export function categoryLabels(sesh: number): { key: "music" | "substances" | "cat3" | "hangover" | "cat5"; label: string }[] {
  if (isOldEra(sesh)) {
    return [
      { key: "music", label: "Music" },
      { key: "substances", label: "Substances" },
      { key: "cat3", label: "Atmosphere/Location" },
      { key: "cat5", label: "Characters/Talent" },
    ];
  }
  return [
    { key: "music", label: "Music" },
    { key: "substances", label: "Substances" },
    { key: "cat3", label: "Smell" },
    { key: "hangover", label: "Hangover" },
    { key: "cat5", label: "Vibes" },
  ];
}

export function categoryBreakdown(entry: Sesh): { label: string; value: number }[] {
  return categoryLabels(entry.sesh).map(({ key, label }) => ({
    label,
    value: (entry[key] as number | null) ?? 0,
  }));
}

export function maxScoreForSesh(sesh: number): number {
  return isOldEra(sesh) ? 20 : 25;
}

/** Sums a community score row's category values (hangover is null in the old era, counted as 0). */
export function totalOfScores(row: {
  music: number;
  substances: number;
  cat3: number;
  hangover: number | null;
  cat5: number;
}): number {
  return row.music + row.substances + row.cat3 + (row.hangover ?? 0) + row.cat5;
}
