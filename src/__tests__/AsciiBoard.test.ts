import { AsciiBoard } from '../AsciiBoard';
import { SmallFlatAsciiHexPrinter } from '../printers/SmallFlatAsciiHexPrinter';
import { SmallPointyAsciiHexPrinter } from '../printers/SmallPointyAsciiHexPrinter';
import { LargeFlatAsciiHexPrinter } from '../printers/LargeFlatAsciiHexPrinter';
import { LargePointyAsciiHexPrinter } from '../printers/LargePointyAsciiHexPrinter';

describe('AsciiBoard - Small Flat Hexes', () => {
  const USE_BOX = true;
  let printer: SmallFlatAsciiHexPrinter;

  beforeEach(() => {
    printer = new SmallFlatAsciiHexPrinter();
  });

  it('should create board with single piece', () => {
    const board = new AsciiBoard(0, 0, 0, 0, printer);
    board.addHex('HEX', '-W-', '#', 0, 0);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toBeDefined();
    expect(result).toContain('HEX');
    expect(result).toContain('-W-');
  });

  it('should create board with two pieces horizontally', () => {
    const board = new AsciiBoard(0, 1, 0, 0, printer);
    board.addHex('HX1', '-W-', '#', 0, 0);
    board.addHex('HX2', '-B-', '+', 1, 0);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
    expect(result).toContain('-W-');
    expect(result).toContain('-B-');
  });

  it('should create board with two pieces vertically', () => {
    const board = new AsciiBoard(0, 0, 0, 1, printer);
    board.addHex('HX1', '-W-', '#', 0, 0);
    board.addHex('HX2', '-B-', '+', 0, 1);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
  });

  it('should create board with circle pattern', () => {
    const board = new AsciiBoard(0, 2, 0, 2, printer);
    board.addHex('HX1', '-B-', '#', 1, 1);
    board.addHex('HX2', '-W-', '+', 1, 0);
    board.addHex('HX3', '-W-', '-', 2, 0);
    board.addHex('HX4', '-W-', '+', 2, 1);
    board.addHex('HX5', '-W-', '•', 1, 2);
    board.addHex('HX6', '-W-', '-', 0, 2);
    board.addHex('HX7', '-W-', '•', 0, 1);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX7');
  });

  it('should create board with line pattern', () => {
    const board = new AsciiBoard(0, 2, 0, 0, printer);
    board.addHex('HX1', '-B-', '#', 0, 0);
    board.addHex('HX2', '-W-', '+', 1, 0);
    board.addHex('HX3', '-W-', '+', 2, 0);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
    expect(result).toContain('HX3');
  });

  it('should create board with F-shape pattern', () => {
    const board = new AsciiBoard(0, 2, 0, 1, printer);
    board.addHex('HX1', '-A-', '#', 0, 0);
    board.addHex('HX2', '-B-', '+', 1, 0);
    board.addHex('HX3', '-C-', '-', 2, 0);
    board.addHex('HX4', '-D-', '•', 2, 1);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('-A-');
    expect(result).toContain('HX4');
    expect(result).toContain('-D-');
  });

  it('should handle space between hexes vertically', () => {
    const board = new AsciiBoard(0, 2, 0, 0, printer);
    board.addHex('HX1', '-B-', '#', 0, 0);
    board.addHex('HX2', '-W-', '+', 2, 0);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
  });

  it('should handle space between hexes horizontally', () => {
    const board = new AsciiBoard(0, 0, 0, 2, printer);
    board.addHex('HX1', '-B-', '#', 0, 0);
    board.addHex('HX2', '-W-', '+', 0, 2);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
  });
});

describe('AsciiBoard - Small Pointy Hexes', () => {
  const USE_BOX = true;
  let printer: SmallPointyAsciiHexPrinter;

  beforeEach(() => {
    printer = new SmallPointyAsciiHexPrinter();
  });

  it('should create board with single piece', () => {
    const board = new AsciiBoard(0, 0, 0, 0, printer);
    board.addHex('HEX', '-W-', '#', 0, 0);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HEX');
    expect(result).toContain('-W-');
  });

  it('should create board with line pattern', () => {
    const board = new AsciiBoard(0, 2, 0, 0, printer);
    board.addHex('HX1', '-B-', '#', 0, 0);
    board.addHex('HX2', '-W-', '+', 1, 0);
    board.addHex('HX3', '-W-', '-', 2, 0);
    const result = board.prettyPrint(USE_BOX);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
    expect(result).toContain('HX3');
  });
});

describe('AsciiBoard - Large Flat Hexes', () => {
  it('should create board with single large flat hex', () => {
    const printer = new LargeFlatAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer);
    board.addHex('HEX001', '-WARLOC-', '#', 0, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HEX001');
    expect(result).toContain('-WARLOC');
  });
});

describe('AsciiBoard - Large Pointy Hexes', () => {
  it('should create board with single large pointy hex', () => {
    const printer = new LargePointyAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer);
    board.addHex('HEX001', '-WARLOC-', '#', 0, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HEX001');
    expect(result).toContain('-WARLOC');
  });
});

describe('AsciiBoard - Without Box', () => {
  it('should print without box wrapper', () => {
    const printer = new SmallFlatAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer);
    board.addHex('HEX', '-W-', '#', 0, 0);
    const result = board.prettyPrint(false);
    expect(result).toContain('HEX');
    expect(result).not.toContain('| =');
  });
});

describe('AsciiBoard - Minimal Visual Style', () => {
  it('should render small flat hex with minimal style', () => {
    const printer = new SmallFlatAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer, 'minimal');
    board.addHex('HEX', '-W-', '#', 0, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HEX');
    expect(result).not.toContain('#');
    expect(result).not.toContain('-W-');
    expect(result).toContain('/     \\');
    expect(result).toContain('\\ _ _ /');
  });

  it('should render small pointy hex with minimal style', () => {
    const printer = new SmallPointyAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer, 'minimal');
    board.addHex('HEX', '-W-', '#', 0, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HEX');
    expect(result).not.toContain('#');
    expect(result).not.toContain('-W-');
    expect(result).toContain('/     \\');
    expect(result).toContain('\\     /');
  });

  it('should render large flat hex with minimal style', () => {
    const printer = new LargeFlatAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer, 'minimal');
    board.addHex('HEX001', '-WARLOC-', '#', 0, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HEX001');
    expect(result).not.toContain('#');
    expect(result).not.toContain('-WARLOC');
    expect(result).toContain('/       \\');
    expect(result).toContain('\\ _ _ _ /');
  });

  it('should render large pointy hex with minimal style', () => {
    const printer = new LargePointyAsciiHexPrinter();
    const board = new AsciiBoard(0, 0, 0, 0, printer, 'minimal');
    board.addHex('HEX001', '-WARLOC-', '#', 0, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HEX001');
    expect(result).not.toContain('#');
    expect(result).not.toContain('-WARLOC');
    expect(result).toContain('/     \\');
    expect(result).toContain('\\     /');
  });

  it('should render multiple hexes with minimal style', () => {
    const printer = new SmallFlatAsciiHexPrinter();
    const board = new AsciiBoard(0, 2, 0, 0, printer, 'minimal');
    board.addHex('HX1', '-B-', '#', 0, 0);
    board.addHex('HX2', '-W-', '+', 1, 0);
    board.addHex('HX3', '-W-', '-', 2, 0);
    const result = board.prettyPrint(true);
    expect(result).toContain('HX1');
    expect(result).toContain('HX2');
    expect(result).toContain('HX3');
    expect(result).not.toContain('#');
    expect(result).not.toContain('+');
    expect(result).not.toContain('-B-');
    expect(result).not.toContain('-W-');
  });
});
