import { describe, test, expect } from 'vitest';

import {
    transformAnalysisData,
    convertHighlightsToArray,
    isCsvFile,
    validateServerResponse,
    InvalidServerResponseError,
} from '../../utils/analysis';

import type { Highlights } from '@app-types/common';

const validHighlights: Highlights = {
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

describe('utils/analysis', () => {
    test('transformAnalysisData корректно парсит данные и возвращает нужный формат', () => {
        const mockRaw = {
            ...validHighlights,
        };
        const text = JSON.stringify(mockRaw) + '\n';
        const uint8 = new TextEncoder().encode(text);

        const { highlightsToStore } = transformAnalysisData(uint8);

        expect(highlightsToStore.length).toBeGreaterThan(0);
        expect(highlightsToStore[0]).toHaveProperty('title');
        expect(highlightsToStore[0]).toHaveProperty('description');
    });

    test('convertHighlightsToArray преобразует объект Highlights в массив', () => {
        const array = convertHighlightsToArray(validHighlights);
        expect(Array.isArray(array)).toBe(true);
        expect(array[0]).toHaveProperty('title');
        expect(array[0]).toHaveProperty('description');
    });

    test('isCsvFile корректно определяет CSV файл', () => {
        const file = new File([], 'file.csv');
        const notCsv = new File([], 'file.txt');

        expect(isCsvFile(file)).toBe(true);
        expect(isCsvFile(notCsv)).toBe(false);
    });

    test('validateServerResponse возвращает true для валидного объекта и false для мусора', () => {
        const valid = {
            total_spend_galactic: 123,
            big_spent_value: 999,
        };

        const invalid = {
            foo: 'bar',
        };

        expect(validateServerResponse(valid)).toBe(true);
        expect(validateServerResponse(invalid)).toBe(false);
    });

    test('transformAnalysisData выбрасывает InvalidServerResponseError при невалидном ответе', () => {
        const invalidData = JSON.stringify({ foo: 'bar' }) + '\n';
        const uint8 = new TextEncoder().encode(invalidData);

        expect(() => transformAnalysisData(uint8)).toThrow(InvalidServerResponseError);
    });
});
