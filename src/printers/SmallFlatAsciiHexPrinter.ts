import { HexOrientation } from '../HexOrientation';
import { AsciiHexPrinter } from './AsciiHexPrinter';

export class SmallFlatAsciiHexPrinter extends AsciiHexPrinter {
  private readonly width = 9;
  private readonly height = 5;
  private readonly sideLength = 2;

  private static readonly TEMPLATE = 
    '   _ _   \n' +  // 0 - 9
    ' /# # #\\ \n' +  // 9 - 18
    '/# XXX #\\\n' +  // 18 - 27
    '\\# YYY #/\n' +  // 27 - 36
    ' \\#_#_#/ ';     // 36 - 45

  getHex(textLine1: string, textLine2: string, fillerChar: string): string {
    let hex = SmallFlatAsciiHexPrinter.TEMPLATE;
    const line1 = this.restrictToLength(textLine1, 3);
    const line2 = this.restrictToLength(textLine2, 3);
    hex = hex.replace('XXX', line1);
    hex = hex.replace('YYY', line2);
    return hex.replace(/#/g, fillerChar);
  }

  mapHexCoordsToCharCoords(q: number, r: number): number[] {
    const result: number[] = [0, 0];
    result[0] = 7 * q; // q * (width - side)
    result[1] = 2 * q + 4 * r; // height/2 * q + (height - 1) * r
    return result;
  }

  getMapSizeInChars(hexWidth: number, hexHeight: number): number[] {
    const widthInChars = hexWidth * (this.width - this.sideLength) + this.sideLength;
    const heightInChars = Math.floor((hexWidth - 1) * this.height / 2) + hexHeight * this.height;
    return [widthInChars, heightInChars];
  }

  get hexOrientation(): HexOrientation {
    return HexOrientation.FLAT;
  }
}
