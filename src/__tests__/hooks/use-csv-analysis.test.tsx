import { renderHook, act } from '@testing-library/react';
import { describe, test, vi, expect, beforeEach } from 'vitest';

import { useCsvAnalysis } from '../../hooks/use-csv-analysis';

const mockFile = new File(['fake csv content'], 'data.csv', { type: 'text/csv' });

describe('hook/useCsvAnalysis', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: vi
              .fn()
              .mockResolvedValueOnce({
                value: new TextEncoder().encode(
                  JSON.stringify({
                    total_spend_galactic: 123,
                    rows_affected: 1,
                  }) + '\n'
                ),
                done: false,
              })
              .mockResolvedValueOnce({ done: true }),
          }),
        },
      })
    ) as unknown as typeof fetch;
  });

  test('корректно вызывает onData и onComplete', async () => {
    const onData = vi.fn();
    const onError = vi.fn();
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useCsvAnalysis({ onData, onError, onComplete })
    );

    await act(async () => {
      await result.current.analyzeCsv(mockFile);
    });

    expect(onData).toHaveBeenCalled();
    expect(onComplete).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });
});
