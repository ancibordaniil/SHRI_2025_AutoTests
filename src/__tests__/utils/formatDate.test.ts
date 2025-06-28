import { describe, test, expect } from 'vitest';

import { formatDate } from  '../../utils/formateDate';

describe('utils/formatDate', () => {
  test('правильный формат Date', () => {
    const timestamp = new Date('2023-08-01T00:00:00').getTime();
    expect(formatDate(timestamp)).toBe('01.08.2023');
  });

  test('работает с объектом Date', () => {
    expect(formatDate(new Date('2023-08-01'))).toBe('01.08.2023');
  });
});
