#!/usr/bin/env node

import { AsciiBoard } from './AsciiBoard';
import { SmallFlatAsciiHexPrinter } from './printers/SmallFlatAsciiHexPrinter';
import { SmallPointyAsciiHexPrinter } from './printers/SmallPointyAsciiHexPrinter';
import { LargeFlatAsciiHexPrinter } from './printers/LargeFlatAsciiHexPrinter';
import { LargePointyAsciiHexPrinter } from './printers/LargePointyAsciiHexPrinter';

/**
 * Example demonstrating the usage of the hex-grid-cli library
 */
function main() {
  console.log('\n=== Small Flat Hexes Example ===\n');
  const smallFlatPrinter = new SmallFlatAsciiHexPrinter();
  const board1 = new AsciiBoard(0, 2, 0, 1, smallFlatPrinter);
  board1.addHex('HX1', '-A-', '#', 0, 0);
  board1.addHex('HX2', '-B-', '+', 1, 0);
  board1.addHex('HX3', '-C-', '-', 2, 0);
  board1.addHex('HX4', '-D-', '•', 2, 1);
  console.log(board1.prettyPrint(true));

  console.log('\n=== Small Pointy Hexes Example ===\n');
  const smallPointyPrinter = new SmallPointyAsciiHexPrinter();
  const board2 = new AsciiBoard(0, 2, 0, 0, smallPointyPrinter);
  board2.addHex('HX1', '-B-', '•', 0, 0);
  board2.addHex('HX2', '-W-', '-', 1, 0);
  board2.addHex('HX3', '-W-', '-', 2, 0);
  console.log(board2.prettyPrint(true));

  console.log('\n=== Large Flat Hexes Example ===\n');
  const largeFlatPrinter = new LargeFlatAsciiHexPrinter();
  const board3 = new AsciiBoard(0, 1, 0, 0, largeFlatPrinter);
  board3.addHex('HEX001', '-ALPHA-', '•', 0, 0);
  board3.addHex('HEX002', '-BETA--', '-', 1, 0);
  console.log(board3.prettyPrint(true));

  console.log('\n=== Large Pointy Hexes Example ===\n');
  const largePointyPrinter = new LargePointyAsciiHexPrinter();
  const board4 = new AsciiBoard(0, 1, 0, 0, largePointyPrinter);
  board4.addHex('HEX001', '-ALPHA-', '•', 0, 0);
  board4.addHex('HEX002', '-BETA--', '-', 1, 0);
  console.log(board4.prettyPrint(true));

  console.log('\n=== Circle Pattern Example ===\n');
  const board5 = new AsciiBoard(0, 2, 0, 2, smallFlatPrinter);
  board5.addHex('HX1', '-B-', '#', 1, 1);
  board5.addHex('HX2', '-W-', '+', 1, 0);
  board5.addHex('HX3', '-W-', '-', 2, 0);
  board5.addHex('HX4', '-W-', '+', 2, 1);
  board5.addHex('HX5', '-W-', '•', 1, 2);
  board5.addHex('HX6', '-W-', '-', 0, 2);
  board5.addHex('HX7', '-W-', '•', 0, 1);
  console.log(board5.prettyPrint(true));
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}

export { main };
