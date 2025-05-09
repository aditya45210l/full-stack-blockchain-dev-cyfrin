import { describe, it, expect } from 'vitest';
import { calculateTotal } from './Calculate';

describe('calculateTotal', () => {
  it('should sum comma-separated values', () => {
    expect(calculateTotal('10,20,30')).toBe(60)
  })

  it('should sum newline-separated values', () => {
    expect(calculateTotal('5\n15\n25')).toBe(45)
  })

  it('should handle mixed commas and newlines', () => {
    expect(calculateTotal('1,2\n3,4\n5')).toBe(15)
  })

  it('should trim whitespace and parse correctly', () => {
    expect(calculateTotal(' 10 , 20 \n 30 ')).toBe(60)
  })

  it('should return 0 if any value is not a number', () => {
    expect(calculateTotal('10,abc,20')).toBe(30)
    expect(calculateTotal('10\n \n20\nfoo')).toBe(30)
  })

  it('should skip empty strings and still calculate correctly', () => {
    expect(calculateTotal('10,,20,\n30\n')).toBe(60)
  })

  it('should handle single value inputs', () => {
    expect(calculateTotal('42')).toBe(42)
  })

  it('should return 0 for completely empty input', () => {
    expect(calculateTotal('')).toBe(0)
  })

  it('should return 0 for whitespace-only input', () => {
    expect(calculateTotal('   \n ,  ')).toBe(0)
  })

  it('should handle decimal numbers', () => {
    expect(calculateTotal('1.5,2.5\n3.0')).toBe(7.0)
  })
  it('should handle space numbers', () => {
    expect(calculateTotal('10 20 30 40')).toBe(100)
  })
})
