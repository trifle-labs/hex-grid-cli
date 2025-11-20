import { HexOrientation } from '../HexOrientation';
import { AsciiHexPrinter } from './AsciiHexPrinter';

export class LargeFlatAsciiHexPrinter extends AsciiHexPrinter {
  private readonly width = 13;
  private readonly height = 7;
  private readonly sideLength = 3;
  private readonly sideHeight = 3;

  private static readonly TEMPLATE =
    '   _ _ _ _   \n' +  // 0 - 13
    '  / # # # \\  \n' +  // 12 - 24
    ' /# # # # #\\ \n' +  // 24 - 36
    '/# XXXXXXX #\\\n' +  // 36 - 48
    '\\# YYYYYYY #/\n' +  // 48 - 60
    ' \\# # # # #/ \n' +  // 60 - 72
    '  \\_#_#_#_/  \n';   // 72 - 84

  getHex(textLine1: string, textLine2: string, fillerChar: string): string {
    let hex = LargeFlatAsciiHexPrinter.TEMPLATE;
    const line1 = this.restrictToLength(textLine1, 7);
    const line2 = this.restrictToLength(textLine2, 7);
    hex = hex.replace('XXXXXXX', line1);
    hex = hex.replace('YYYYYYY', line2);
    return hex.replace(/#/g, fillerChar);
  }

  mapHexCoordsToCharCoords(q: number, r: number): number[] {
    const result: number[] = [0, 0];
    result[0] = (this.width - this.sideLength) * q;
    result[1] = this.sideHeight * q + (this.height - 1) * r;
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
