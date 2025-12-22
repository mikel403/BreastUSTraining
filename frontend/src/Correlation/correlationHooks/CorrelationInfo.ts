export interface Correlation {
  shape: number;
  margin: number;
  orientation: number;
  echogenicity: number;
  posterior: number;
  halo: number;
  calcification: number;
  suggestivity: number;
  birads: number;
}

export interface PhysicianCorrelation {
  physician: string;
  correlation: Correlation;
  numcorrelation: Correlation;
}




