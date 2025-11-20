import { CharGrid } from '../CharGrid';

describe('CharGrid', () => {
  it('should create a grid with the specified dimensions', () => {
    const grid = new CharGrid(10, 5);
    expect(grid).toBeDefined();
  });

  it('should prefill grid with spaces', () => {
    const grid = new CharGrid(3, 3);
    expect(grid.getChar(0, 0)).toBe(' ');
    expect(grid.getChar(2, 2)).toBe(' ');
  });

  it('should add char to grid', () => {
    const grid = new CharGrid(5, 5);
    grid.addChar(2, 2, 'X');
    expect(grid.getChar(2, 2)).toBe('X');
  });

  it('should throw error when adding char outside bounds', () => {
    const grid = new CharGrid(5, 5);
    expect(() => grid.addChar(10, 10, 'X')).toThrow();
    expect(() => grid.addChar(-1, 0, 'X')).toThrow();
  });

  it('should add string to grid', () => {
    const grid = new CharGrid(10, 5);
    grid.addString(0, 0, 'Hello');
    expect(grid.getChar(0, 0)).toBe('H');
    expect(grid.getChar(1, 0)).toBe('e');
    expect(grid.getChar(4, 0)).toBe('o');
  });

  it('should handle null or empty string in addString', () => {
    const grid = new CharGrid(10, 5);
    grid.addString(0, 0, null);
    grid.addString(0, 1, '');
    expect(grid.getChar(0, 0)).toBe(' ');
    expect(grid.getChar(0, 1)).toBe(' ');
  });

  it('should print grid without trimming', () => {
    const grid = new CharGrid(3, 2);
    grid.addChar(1, 1, 'X');
    const result = grid.print(false);
    const lines = result.split('\n');
    expect(lines.length).toBe(3); // 2 lines + final newline
    expect(lines[0]).toBe('   ');
    expect(lines[1]).toBe(' X ');
  });

  it('should print grid with trimming to bounding box', () => {
    const grid = new CharGrid(10, 10);
    grid.addChar(2, 2, 'A');
    grid.addChar(4, 3, 'B');
    const result = grid.print(true);
    const lines = result.split('\n').filter(l => l.length > 0);
    expect(lines.length).toBe(2); // Only rows 2-3
    expect(lines[0].length).toBe(3); // Only cols 2-4
  });
});
