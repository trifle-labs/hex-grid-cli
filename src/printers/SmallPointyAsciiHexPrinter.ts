import { HexOrientation } from '../HexOrientation';
import { AsciiHexPrinter } from './AsciiHexPrinter';

export class SmallPointyAsciiHexPrinter extends AsciiHexPrinter {
  private readonly width = 10;
  private readonly height = 6;
  private readonly sideLength = 4;
  private readonly sideHeight = 2;
  private readonly bordersLength = 2;

  private static readonly TEMPLATE =
    '   /#\\   \n' +  // 0 - 10
    ' /# # #\\ \n' +  // 10 - 20
    '|# XXX #|\n' +  // 20 - 30
    '|# YYY #|\n' +  // 30 - 40
    ' \\# # #/ \n' +  // 40 - 50
    '   \\#/   \n';   // 50 - 60

  getHex(textLine1: string, textLine2: string, fillerChar: string): string {
    let hex = SmallPointyAsciiHexPrinter.TEMPLATE;
    const line1 = this.restrictToLength(textLine1, 3);
    const line2 = this.restrictToLength(textLine2, 3);
    hex = hex.replace('XXX', line1);
    hex = hex.replace('YYY', line2);
    return hex.replace(/#/g, fillerChar);
  }

  mapHexCoordsToCharCoords(q: number, r: number): number[] {
    const result: number[] = [0, 0];
    result[0] = (this.width - this.bordersLength) * q + (r % 2) * (this.height - this.sideHeight);
    result[1] = (this.height - this.sideHeight) * r;
    return result;
  }

  getMapSizeInChars(hexWidth: number, hexHeight: number): number[] {
    const widthInChars = hexWidth * this.width + this.sideLength;
    const heightInChars = hexHeight * (this.height - 2) + 2;
    return [widthInChars, heightInChars];
  }

  get hexOrientation(): HexOrientation {
    return HexOrientation.POINTY;
  }
}
