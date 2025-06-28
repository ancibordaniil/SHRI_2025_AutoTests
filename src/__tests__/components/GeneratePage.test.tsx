import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';

import { GeneratePage } from '../../pages/Generate/GeneratePage';

beforeEach(() => {
  global.fetch = vi.fn();
  vi.stubGlobal('URL', {
    ...URL,
    createObjectURL: vi.fn(() => 'blob:http://localhost/fake-blob-url'),
    revokeObjectURL: vi.fn(),
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

const getMockFetch = () => global.fetch as unknown as ReturnType<typeof vi.fn>;

describe('GeneratePage', () => {
  const mockBlob = new Blob(['test csv content'], { type: 'text/csv' });

  it('рендерит заголовок и кнопку', () => {
    render(<GeneratePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/сгенерируйте/i);
    expect(screen.getByRole('button')).toHaveTextContent(/начать генерацию/i);
  });

  it('показывает Loader при генерации', async () => {
    getMockFetch().mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
      headers: {
        get: () => 'attachment; filename="report.csv"',
      },
    });

    render(<GeneratePage />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button').querySelector('div')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/отчёт успешно сгенерирован/i)).toBeInTheDocument();
    });
  });

  it('обрабатывает ошибку с текстом от сервера', async () => {
    getMockFetch().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Ошибка генерации' }),
      headers: {
        get: () => null,
      },
    });

    render(<GeneratePage />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/ошибка генерации/i)).toBeInTheDocument();
    });
  });

  it('обрабатывает неизвестную ошибку', async () => {
    getMockFetch().mockRejectedValueOnce(new Error('Сетевая ошибка'));

    render(<GeneratePage />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/сетевая ошибка/i)).toBeInTheDocument();
    });
  });
});
