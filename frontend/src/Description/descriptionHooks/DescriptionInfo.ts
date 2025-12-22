interface Birads {
  "2": number | undefined;
  "3": number | undefined;
  "4A": number | undefined;
  "4B": number | undefined;
  "4C": number | undefined;
  "5": number | undefined;
  total: number | undefined;}

interface Shape {
  oval: number | undefined;
  round: number | undefined;
  // lobulated: number | undefined;
  irregular: number | undefined;
  total: number;
}
interface Margin {
  circumscribed: number | undefined;
  microlobulated: number | undefined;
  indistinct: number | undefined;
  angulated: number | undefined;
  spiculated: number | undefined;
  total: number;
}
interface Orientation {
  parallel: number | undefined;
  "no orientation": number | undefined;
  "not parallel": number | undefined;
  total: number;
}
interface Echogenicity {
  anechoic: number | undefined;
  hypoechoic: number | undefined;
  heterogeneous: number | undefined;
  hyperechoic: number | undefined;
  isoechoic: number | undefined;
  "complex cystic and solid": number | undefined;
  total: number;
}

interface Posterior {
  "no features": number | undefined;
  enhancement: number | undefined;
  shadowing: number | undefined;
  "combined pattern": number | undefined;
  total: number;
}

// interface Halo {
//   "no halo": number | undefined;
//   halo: number | undefined;
//   total: number;
// }

interface Calcification {
  "no calcifications": number | undefined;
  calcifications: number | undefined;
  total: number;
}

interface Suggestivity {
  "simple cyst": number | undefined;
  "clustered microcysts": number | undefined;
  "complicated cyst": number | undefined;
  "mass in skin": number | undefined;
  "mass on skin": number | undefined;
  "lymph node": number | undefined;
  "postsurgical fluid collection": number | undefined;
  "fat necrosis": number | undefined;
  total: number;
}

// interface Suggestivity {}


export interface Panel {
  shape: Shape;
  margin: Margin;
  orientation: Orientation;
  echogenicity: Echogenicity;
  posterior: Posterior;
  // halo: Halo;
  calcification: Calcification;
  suggestivity: Suggestivity;
  birads: Birads;
}

export interface BiradsPanel{
  shape: Birads;
  margin: Birads;
  orientation: Birads;
  echogenicity: Birads;
  posterior: Birads;
  // halo: Halo;
  calcification: Birads;
  suggestivity: Birads;
  birads: Birads;
}

export interface Statistics{
  statistics:Panel,
  statistics_birads:BiradsPanel,
  physicians:number,
}

export interface Description {
  id: string;
  shape: string | null;
  margin: string | null;
  orientation: string | null;
  echogenicity: string | null;
  posterior: string | null;
  // halo: string | null;
  calcification: string | null;
  suggestivity: string | null;
  birads: string | null;
}
