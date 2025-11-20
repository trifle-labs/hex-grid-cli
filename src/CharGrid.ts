/**
 * 2D representation of a char grid of fixed size. Useful for eg. creating ASCII art.
 * (Top,Left) has coordinates (0,0).
 */
export class CharGrid {
  private readonly width: number;
  private readonly height: number;
  private readonly grid: string[][];
  private static readonly LINE_BREAK = '\n';

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => Array(width).fill(' '));
    this.prefillGrid();
  }

  /**
   * Prefill grid with spaces.
   */
  private prefillGrid(): void {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.addChar(j, i, ' ');
      }
    }
  }

  /**
   * Add a string to the grid.
   *
   * @param x Starting x coordinate.
   * @param y Starting y coordinate.
   * @param input String put input. String will not wrap, but throws IndexOutOfBounds if to long.
   */
  addString(x: number, y: number, input: string | null): void {
    if (!input || input === '') return;
    for (let i = 0; i < input.length; i++) {
      this.addChar(x + i, y, input[i]);
    }
  }

  /**
   * Add a char to the grid.
   *
   * @param x Starting x coordinate.
   * @param y Starting y coordinate.
   * @param input Char to insert. Throws IndexOutOfBounds if outside grid.
   */
  addChar(x: number, y: number, input: string): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      const maxWidth = this.width - 1;
      const maxHeight = this.height - 1;
      throw new Error(`(${x},${y}) is outside (${maxWidth},${maxHeight})`);
    }
    this.grid[y][x] = input;
  }

  /**
   * Returns a char from the grid
   */
  getChar(x: number, y: number): string {
    return this.grid[y][x];
  }

  /**
   * Returns the char grid as a string, ready for output.
   *
   * @param trimToBoundingBox If true, the grid is trimmed to it's contents bounding box. If not grid is printed as is.
   */
  print(trimToBoundingBox: boolean): string {
    let leftBound = trimToBoundingBox ? this.width - 1 : 0;
    let rightBound = trimToBoundingBox ? 0 : this.width - 1;
    let topBound = trimToBoundingBox ? this.height - 1 : 0;
    let bottomBound = trimToBoundingBox ? 0 : this.height - 1;

    // Find bounding box
    if (trimToBoundingBox) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          const c = this.grid[i][j];
          if (c !== ' ') {
            leftBound = Math.min(leftBound, j);
            rightBound = Math.max(rightBound, j);
            topBound = Math.min(topBound, i);
            bottomBound = Math.max(bottomBound, i);
          }
        }
      }
    }

    // Print grid
    const lines: string[] = [];
    for (let i = topBound; i <= bottomBound; i++) {
      let line = '';
      for (let j = leftBound; j <= rightBound; j++) {
        line += this.grid[i][j];
      }
      lines.push(line);
    }
    return lines.join(CharGrid.LINE_BREAK) + CharGrid.LINE_BREAK;
  }
}
