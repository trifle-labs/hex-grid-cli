import { HexOrientation } from '../HexOrientation';

export type VisualStyle = 'default' | 'minimal';

export abstract class AsciiHexPrinter {
  /**
   * Returns the hex
   */
  abstract getHex(textLine1: string, textLine2: string, fillerChar: string, visualStyle?: VisualStyle): string;

  /**
   * Viewing the board as a grid of hexes. Each hex has a bounding box. Map top-left of bounding box given by hex
   * coordinates to same area viewed as char grid.
   *
   * @returns A number[2] with (x,y) char coordinates. (top,left) is (0,0)
   */
  abstract mapHexCoordsToCharCoords(q: number, r: number): number[];

  /**
   * Returns the bounding box in chars for a map of the given size
   *
   * @param hexWidth  Size of board in hexes horizontally.
   * @param hexHeight Size of board in hexes vertically.
   * @return A number[2]: number[0] gives the width in chars and number[1] gives the height.
   */
  abstract getMapSizeInChars(hexWidth: number, hexHeight: number): number[];

  /**
   * Returns the orientation of hexes from the given HexPrinter
   */
  abstract get hexOrientation(): HexOrientation;

  /**
   * Makes sure that a string has the given length, using " " (whitespace) if input string is shorter.
   */
  protected restrictToLength(str: string | null, length: number): string {
    let result = '  ';
    if (str !== null) {
      if (str.length > length) {
        result = str.toUpperCase().substring(0, length);
      } else if (str.length < length) {
        result = this.pad(str.toUpperCase(), length - str.length);
      } else {
        result = str;
      }
    }
    return result;
  }

  /**
   * Pads whitespace to both sides, effectively centering the text.
   * Padding starts on the left side.
   * @param str the string to pad.
   * @param size size of the final string.
   * @return padded String
   */
  private pad(str: string, size: number): string {
    let s = str;
    let n = size;
    while (n > 0) {
      if (n % 2 === 0) {
        s = ' ' + s;
      } else {
        s = s + ' ';
      }
      n--;
    }
    return s;
  }
}
