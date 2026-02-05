
export interface ScraperConfig {
  minDelay: number;
  maxDelay: number;
  useRotation: boolean;
  fields: {
    name: boolean;
    headline: boolean;
    location: boolean;
    about: boolean;
  };
  headless: boolean;
}

export enum FileType {
  PYTHON = 'script.py',
  README = 'README.md'
}
