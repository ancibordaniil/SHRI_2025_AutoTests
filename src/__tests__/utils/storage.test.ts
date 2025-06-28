import { describe, test, expect, beforeEach } from 'vitest';

import { STORAGE_KEY } from '../../utils/consts';
import {
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
} from '../../utils/storage';

import type { Highlights } from '@app-types/common';

const highlightsMock: Highlights = {
    total_spend_galactic: 5000,
    less_spent_at: 13,
    big_spent_at: 213,
    less_spent_value: 313,
    big_spent_value: 111,
    average_spend_galactic: 431,
    big_spent_civ: 'monsters',
    less_spent_civ: 'humans',
    rows_affected: 50,
};

const baseItem = {
  fileName: 'test.csv',
  highlights: highlightsMock,
};

describe('utils/storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('addToHistory добавляет элемент и сохраняет в localStorage', () => {
    const result = addToHistory(baseItem);
    const saved = getHistory();
    expect(saved[0].id).toBe(result.id);
    expect(saved[0].fileName).toBe('test.csv');
  });

  test('removeFromHistory удаляет элемент по id', () => {
    const { id } = addToHistory(baseItem);
    removeFromHistory(id);
    const saved = getHistory();
    expect(saved).toHaveLength(0);
  });

  test('clearHistory очищает localStorage', () => {
    addToHistory(baseItem);
    clearHistory();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
