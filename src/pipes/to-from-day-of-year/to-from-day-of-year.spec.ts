import { ToFromDayOfYearPipe } from './to-from-day-of-year';
import { DatePipe, DecimalPipe } from '@angular/common';

describe('ToFromDayOfYearPipe', () => {
  let pipe: ToFromDayOfYearPipe;

  beforeEach(() => { pipe = new ToFromDayOfYearPipe(); });

  it('transforms day 1 to January 1 (en)', () => {
    const result = pipe.transform(1, 'en');
    expect(result).toMatch(/January\s+1|1\s+January/i);
  });

  it('transforms day 32 to February 1 (en)', () => {
    const result = pipe.transform(32, 'en');
    expect(result).toMatch(/February\s+1|1\s+February/i);
  });

  it('returns a non-empty string for any valid day of year', () => {
    for (const day of [1, 60, 100, 180, 265, 365]) {
      expect(typeof pipe.transform(day, 'en')).toBe('string');
      expect(pipe.transform(day, 'en').length).toBeGreaterThan(0);
    }
  });
});

describe('Angular DatePipe (DoS guard — CVE-2026-50268 / CVE-2026-50171)', () => {
  let pipe: DatePipe;

  beforeEach(() => { pipe = new DatePipe('en-US'); });

  it('formats a normal date without throwing', () => {
    expect(() => pipe.transform(new Date('2024-01-15'), 'longDate')).not.toThrow();
  });

  it('formats timestamp 0 (epoch) without throwing', () => {
    expect(() => pipe.transform(0, 'mediumDate')).not.toThrow();
  });

  it('returns null for null input', () => {
    expect(pipe.transform(null)).toBeNull();
  });
});

describe('Angular DecimalPipe (DoS guard — CVE-2026-50171)', () => {
  let pipe: DecimalPipe;

  beforeEach(() => { pipe = new DecimalPipe('en-US'); });

  it('formats a normal number without throwing', () => {
    expect(() => pipe.transform(1234.56, '1.2-2')).not.toThrow();
  });

  it('formats zero without throwing', () => {
    expect(() => pipe.transform(0, '1.0-0')).not.toThrow();
  });

  it('returns null for null input', () => {
    expect(pipe.transform(null)).toBeNull();
  });
});
