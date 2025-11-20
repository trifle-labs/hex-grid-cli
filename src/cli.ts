#!/usr/bin/env node

/**
 * CLI wrapper for hex-grid-cli
 * Provides command-line interface for generating hex grids
 */

import { AsciiBoard } from './AsciiBoard';
import { SmallFlatAsciiHexPrinter } from './printers/SmallFlatAsciiHexPrinter';
import { SmallPointyAsciiHexPrinter } from './printers/SmallPointyAsciiHexPrinter';
import { LargeFlatAsciiHexPrinter } from './printers/LargeFlatAsciiHexPrinter';
import { LargePointyAsciiHexPrinter } from './printers/LargePointyAsciiHexPrinter';
import { AsciiHexPrinter } from './printers/AsciiHexPrinter';

function printUsage() {
  console.log(`
Usage: hex-grid-cli [options]

Options:
  --help, -h          Show this help message
  --type, -t          Hex type: small-flat, small-pointy, large-flat, large-pointy (default: small-flat)
  --demo              Run demo with example patterns

Examples:
  hex-grid-cli --demo
  hex-grid-cli --type small-pointy --demo
  hex-grid-cli --type large-flat --demo

For programmatic usage, import the library in your TypeScript/JavaScript code:
  import { AsciiBoard, SmallFlatAsciiHexPrinter } from 'hex-grid-cli';
`);
}

function getPrinter(type: string): AsciiHexPrinter {
  switch (type) {
    case 'small-flat':
      return new SmallFlatAsciiHexPrinter();
    case 'small-pointy':
      return new SmallPointyAsciiHexPrinter();
    case 'large-flat':
      return new LargeFlatAsciiHexPrinter();
    case 'large-pointy':
      return new LargePointyAsciiHexPrinter();
    default:
      throw new Error(`Unknown hex type: ${type}`);
  }
}

function runDemo(type: string) {
  const printer = getPrinter(type);
  
  console.log(`\n=== Demo: ${type} ===\n`);
  
  if (type.includes('pointy')) {
    // Pointy demo
    const board = new AsciiBoard(0, 2, 0, 0, printer);
    board.addHex('HX1', '-B-', '•', 0, 0);
    board.addHex('HX2', '-W-', '-', 1, 0);
    board.addHex('HX3', '-W-', '-', 2, 0);
    console.log(board.prettyPrint(true));
  } else {
    // Flat demo
    const board = new AsciiBoard(0, 2, 0, 1, printer);
    board.addHex('HX1', '-A-', '#', 0, 0);
    board.addHex('HX2', '-B-', '+', 1, 0);
    board.addHex('HX3', '-C-', '-', 2, 0);
    board.addHex('HX4', '-D-', '•', 2, 1);
    console.log(board.prettyPrint(true));
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }
  
  let hexType = 'small-flat';
  let demo = false;
  
  for (let i = 0; i < args.length; i++) {
    if ((args[i] === '--type' || args[i] === '-t') && i + 1 < args.length) {
      hexType = args[i + 1];
      i++;
    } else if (args[i] === '--demo') {
      demo = true;
    }
  }
  
  if (demo) {
    try {
      runDemo(hexType);
    } catch (error) {
      console.error('Error:', (error as Error).message);
      process.exit(1);
    }
  } else {
    printUsage();
  }
}

if (require.main === module) {
  main();
}
