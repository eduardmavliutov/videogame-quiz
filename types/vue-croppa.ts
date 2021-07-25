export interface VueCroppa {
  generateDataUrl: () => string;
  refresh: () => void;
  img: {
    baseURI: string;
  };
  imageSet: boolean;
}