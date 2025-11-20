import { HexOrientation } from '../HexOrientation';
import { AsciiHexPrinter, VisualStyle } from './AsciiHexPrinter';

export class LargePointyAsciiHexPrinter extends AsciiHexPrinter {
  private readonly width = 14;
  private readonly height = 9;
  private readonly sideWidth = 6; // Size from center to left/right border
  private readonly sideHeight = 3; // Size from top to left/right border
  private readonly bordersLength = 2; // Size of the combined left/right borders

  private static readonly TEMPLATE =
    '     /#\\     \n' +  // 0 - 13
    '   /# # #\\   \n' +
    ' /# # # # #\\ \n' +
    '|# XXXXXXX #|\n' +
    '|# YYYYYYY #|\n' +
    '|# # # # # #|\n' +
    ' \\# # # # #/ \n' +
    '   \\# # #/   \n' +
    '     \\#/     \n';

  private static readonly MINIMAL_TEMPLATE =
    '     / \\     \n' +  // 0 - 13
    '   /     \\   \n' +
    ' /         \\ \n' +
    '|  XXXXXXX  |\n' +
    '|           |\n' +
    '|           |\n' +
    ' \\         / \n' +
    '   \\     /   \n' +
    '     \\ /     \n';

  getHex(textLine1: string, textLine2: string, fillerChar: string, visualStyle: VisualStyle = 'default'): string {
    if (visualStyle === 'minimal') {
      let hex = LargePointyAsciiHexPrinter.MINIMAL_TEMPLATE;
      const line1 = this.restrictToLength(textLine1, 7);
      hex = hex.replace('XXXXXXX', line1);
      return hex;
    } else {
      let hex = LargePointyAsciiHexPrinter.TEMPLATE;
      const line1 = this.restrictToLength(textLine1, 7);
      const line2 = this.restrictToLength(textLine2, 7);
      hex = hex.replace('XXXXXXX', line1);
      hex = hex.replace('YYYYYYY', line2);
      return hex.replace(/#/g, fillerChar);
    }
  }

  mapHexCoordsToCharCoords(q: number, r: number): number[] {
    const result: number[] = [0, 0];
    result[0] = (this.width - this.bordersLength) * q + (r % 2) * (this.height - this.sideHeight);
    result[1] = (this.height - this.sideHeight) * r;
    return result;
  }

  getMapSizeInChars(hexWidth: number, hexHeight: number): number[] {
    const widthInChars = hexWidth * this.width + this.sideWidth;
    const heightInChars = hexHeight * (this.height - this.sideHeight) + this.sideHeight;
    return [widthInChars, heightInChars];
  }

  get hexOrientation(): HexOrientation {
    return HexOrientation.POINTY;
  }
}
