# hex-grid-cli

ASCII Hexagonal Grid Pretty Printer - A TypeScript library for printing hexagonal grids in the CLI.

This is a TypeScript port of the [asciihexgrid](https://github.com/cmelchior/asciihexgrid) Kotlin library.

## Features

- 🎨 ASCII art rendering of hexagonal grids
- 🔄 Support for both flat and pointy hex orientations
- 📏 Small and large hex sizes
- 📝 Two lines of text per hex
- 🎯 Custom filler characters
- 📐 Trapezoidal/axial coordinate system

## Installation

```bash
npm install hex-grid-cli
```

## Usage

### Basic Example

```typescript
import { AsciiBoard, SmallFlatAsciiHexPrinter } from 'hex-grid-cli';

const printer = new SmallFlatAsciiHexPrinter();
const board = new AsciiBoard(0, 2, 0, 1, printer);
board.addHex('HX1', '-A-', '#', 0, 0);
board.addHex('HX2', '-B-', '+', 1, 0);
board.addHex('HX3', '-C-', '-', 2, 0);
board.addHex('HX4', '-D-', '•', 2, 1);
console.log(board.prettyPrint(true));
```

Output:
```
| = = = = = = = = = = = = |
|    _ _                  |
|  /# # #\                |
| /# HX1 #\ _ _           |
| \# -A- #/+ + +\         |
|  \#_#_#/+ HX2 +\ _ _    |
|        \+ -B- +/- - -\  |
|         \+_+_+/- HX3 -\ |
|               \- -C- -/ |
|                \-_-_-/  |
|                /• • •\  |
|               /• HX4 •\ |
|               \• -D- •/ |
|                \•_•_•/  |
|                         |
| = = = = = = = = = = = = |
```

### Available Printers

The library provides four hex printer types:

```typescript
import {
  SmallFlatAsciiHexPrinter,
  SmallPointyAsciiHexPrinter,
  LargeFlatAsciiHexPrinter,
  LargePointyAsciiHexPrinter
} from 'hex-grid-cli';
```

### Coordinate System

The hex grids use a trapezoidal/axial coordinate system. The axes look different depending on flat or pointy orientation.

#### Flat orientation:

```
          _ _
        /     \
   _ _ /(0,-1) \ _ _
 /     \  -R   /     \
/(-1,0) \ _ _ /(1,-1) \
\  -Q   /     \       /
 \ _ _ / (0,0) \ _ _ /
 /     \       /     \
/(-1,1) \ _ _ / (1,0) \
\       /     \  +Q   /
 \ _ _ / (0,1) \ _ _ /
       \  +R   /
        \ _ _ /
```

#### Pointy orientation:

```
       / \     / \
     /     \ /     \
    | -1,-1 |  1,-1 |
    |   -R  |       |
   / \     / \     / \
 /     \ /     \ /     \
| -1,0  |  0,0  |  1,0  |
|  -Q   |       |   +Q  |
 \     / \     / \     /
   \ /     \ /     \ /
    | -1,1  |  0,1  |
    |       |   +R  |
     \     / \     /
       \ /     \ /
```

**Note:** Negative coordinates are currently not supported. (0,0) is the top-left corner.

### Examples

#### Small Flat Hexes

```typescript
const printer = new SmallFlatAsciiHexPrinter();
const board = new AsciiBoard(0, 2, 0, 0, printer);
board.addHex('HX1', '-B-', '•', 0, 0);
board.addHex('HX2', '-W-', '-', 1, 0);
board.addHex('HX3', '-W-', '-', 2, 0);
console.log(board.prettyPrint(true));
```

Output:
```
   _ _
 /• • •\
/• HX1 •\ _ _
\• -B- •/- - -\
 \•_•_•/- HX2 -\ _ _
       \- -W- -/- - -\
        \-_-_-/- HX3 -\
              \- -W- -/
               \-_-_-/
```

#### Small Pointy Hexes

```typescript
const printer = new SmallPointyAsciiHexPrinter();
const board = new AsciiBoard(0, 2, 0, 0, printer);
board.addHex('HX1', '-B-', '•', 0, 0);
board.addHex('HX2', '-W-', '-', 1, 0);
board.addHex('HX3', '-W-', '-', 2, 0);
console.log(board.prettyPrint(true));
```

Output:
```
   /•\     /-\     /-\
 /• • •\ /- - -\ /- - -\
|• HX1 •|- HX2 -|- HX3 -|
|• -B- •|- -W- -|- -W- -|
 \• • •/ \- - -/ \- - -/
   \•/     \-/     \-/
```

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Run Examples

```bash
npm run build && node dist/examples.js
```

## API Reference

### AsciiBoard

Constructor: `new AsciiBoard(minQ: number, maxQ: number, minR: number, maxR: number, printer: AsciiHexPrinter)`

- `minQ`, `maxQ`: Minimum and maximum Q coordinates
- `minR`, `maxR`: Minimum and maximum R coordinates  
- `printer`: An instance of an `AsciiHexPrinter` implementation

Methods:
- `addHex(textLine1: string, textLine2: string, fillerChar: string, hexQ: number, hexR: number): void`
  - Add a hex at the specified coordinates
- `prettyPrint(wrapInBox: boolean): string`
  - Render the board as a string, optionally wrapped in a box

### AsciiHexPrinter

Base abstract class for hex printers. Available implementations:
- `SmallFlatAsciiHexPrinter` - Small flat hexes
- `SmallPointyAsciiHexPrinter` - Small pointy hexes
- `LargeFlatAsciiHexPrinter` - Large flat hexes
- `LargePointyAsciiHexPrinter` - Large pointy hexes

## Credit

This is a TypeScript port of the original [asciihexgrid](https://github.com/cmelchior/asciihexgrid) Kotlin library by Christian Melchior.

For an excellent guide on hexagonal grids, see [Red Blob Games](http://www.redblobgames.com/grids/hexagons/).

## License

ISC

