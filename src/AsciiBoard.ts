import { CharGrid } from './CharGrid';
import { HexOrientation } from './HexOrientation';
import { AsciiHexPrinter } from './printers/AsciiHexPrinter';

/**
 * Description of a Ascii hex map.
 * The hex grid uses a trapezoidal or axial coordinate system, like so:
 *
 *           _ _
 *         /     \
 *    _ _ /(0,-1) \ _ _
 *  /     \  -R   /     \
 * /(-1,0) \ _ _ /(1,-1) \
 * \  -Q   /     \       /
 *  \ _ _ / (0,0) \ _ _ /
 *  /     \       /     \
 * /(-1,1) \ _ _ / (1,0) \
 * \       /     \  +Q   /
 *  \ _ _ / (0,1) \ _ _ /
 *        \  +R   /
 *         \ _ _ /
 *
 * or so (depending on hex orientation):
 *
 *        / \     / \
 *      /     \ /     \
 *     | -1,-1 |  1,-1 |
 *     |   -R  |       |
 *    / \     / \     / \
 *  /     \ /     \ /     \
 * | -1,0  |  0,0  |  1,0  |
 * |  -Q   |       |   +Q  |
 *  \     / \     / \     /
 *    \ /     \ /     \ /
 *     | -1,1  |  0,1  |
 *     |       |   +R  |
 *      \     / \     /
 *        \ /     \ /
 *
 */

/**
 * Constructs the virtual hex board.
 *
 * @param minQ Minimum Q coordinate
 * @param maxQ Maximum Q coordinate
 * @param minR Minimum R coordinate
 * @param maxR Maximum R coordinate
 * @param printer Reference to the hex printer used
 */
export class AsciiBoard {
  private readonly width: number;
  private readonly height: number;
  private readonly printer: AsciiHexPrinter;
  private readonly grid: CharGrid;

  constructor(minQ: number, maxQ: number, minR: number, maxR: number, printer: AsciiHexPrinter) {
    this.width = maxQ - minQ + 1;
    this.height = maxR - minR + 1;
    this.printer = printer;
    this.grid = this.createGrid();
  }

  private createGrid(): CharGrid {
    // This potentially creates the grid ½ a hexagon to high or wide, as we do not know given the max coordinates
    // (0,0,1,1) if both (0,1) or (1,1) is filled. This is OK, as we can fix it when outputting the grid.
    const gridSize = this.printer.getMapSizeInChars(this.width, this.height);
    return new CharGrid(gridSize[0], gridSize[1]);
  }

  /**
   * @param textLine1 First line of text
   * @param textLine2 2nd line of text
   * @param fillerChar Character used as filler, may be ' '
   * @param hexQ Q coordinate for the hex in the hex grid.
   * @param hexR R coordinate for the hex in the hex grid.
   */
  addHex(textLine1: string, textLine2: string, fillerChar: string, hexQ: number, hexR: number): void {
    const hex = this.printer.getHex(textLine1, textLine2, fillerChar);
    const charCoordinates = this.printer.mapHexCoordsToCharCoords(hexQ, hexR);
    const lines = hex.split('\n').filter(line => line !== '');
    
    for (let i = 0; i < lines.length; i++) {
      const content = lines[i];
      for (let j = 0; j < content.length; j++) {
        const x = charCoordinates[0] + j;
        const y = charCoordinates[1] + i;

        // Only override empty spaces
        if (this.grid.getChar(x, y) === ' ') {
          this.grid.addChar(x, y, content[j]);
        }
      }
    }
  }

  /**
   * Prints the Hexagonal map as a string.
   *
   * @param wrapInBox If true, output is wrapped in a Ascii drawn box.
   */
  prettyPrint(wrapInBox: boolean): string {
    return this.printBoard(wrapInBox);
  }

  /**
   * Returns the Hexagonal map as a string. Any extra empty lines at the end are trimmed away,
   * but map still starts at (0,0), so eg. having a hex at (0,1) will produce whitespace at the top.
   *
   * @param wrapInBox If true, the hex map is wrapped in a ASCII bounding box.
   */
  private printBoard(wrapInBox: boolean): string {
    if (wrapInBox) {
      const sb: string[] = [];

      // Get content
      const lines = this.grid.print(true).split('\n').filter(line => line !== '');
      const contentLength = lines.length > 0 ? lines[0].length : 0;
      const verticalLine = this.getVerticalLine('=', contentLength);
      const spacerLine = this.getVerticalLine(' ', contentLength);

      // Build output
      sb.push(verticalLine);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        sb.push('| ');
        sb.push(line);
        sb.push(' |\n');
      }

      // Flat hexes have to little bottom space as they use the _ char
      // so add a extra filler line.
      if (this.printer.hexOrientation === HexOrientation.FLAT) {
        sb.push(spacerLine);
      }
      sb.push(verticalLine);
      return sb.join('');
    } else {
      return this.grid.print(true);
    }
  }

  private getVerticalLine(filler: string, contentLength: number): string {
    const verticalLine: string[] = ['| '];
    for (let i = 0; i < contentLength; i++) {
      if (i % 2 === 0) {
        verticalLine.push(filler);
      } else {
        verticalLine.push(' ');
      }
    }
    return verticalLine.join('') + ' |\n';
  }
}
