export type BookI = {
  id: number;
  title: string;
  author?: string;
};

//* Info Only!
type HexColor = `#${string}`;
// type RGBType = `rgb(${number}, ${number}, ${number})`;

type ColorFormats = "rgb" | "hex";
type ActionTypes = `update-${ColorFormats}`;

const isHexColor = (str: string): str is HexColor => {
  return str.startsWith("#");
};

function clampToByte(value: number): number {
  return Math.min(Math.max(value, 0), 255);
}

type RGBType = `rgb(${number}, ${number}, ${number})`;

export function createRGB(r: number, g: number, b: number): RGBType {
  const rr = clampToByte(r);
  const gg = clampToByte(g);
  const bb = clampToByte(b);
  return `rgb(${rr}, ${gg}, ${bb})` as RGBType;
}
