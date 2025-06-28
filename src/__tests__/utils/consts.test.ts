import * as consts from '@utils/consts';
import { describe, it, expect } from 'vitest';

describe('consts', () => {
  it('имеет STORAGE_KEY', () => {
    expect(consts.STORAGE_KEY).toBe('tableHistory');
  });

  it('имеет API_HOST', () => {
    expect(consts.API_HOST).toMatch(/http/);
  });

  it('содержит корректные заголовки', () => {
    expect(consts.HIGHLIGHT_TITLES.total_spend_galactic).toBe('Общие расходы');
    expect(Object.keys(consts.HIGHLIGHT_TITLES)).toContain('rows_affected');
  });
});
