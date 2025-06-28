import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ClearHistoryButton } from '../../components/ClearHistoryButton';
import * as storage from '../../utils/storage';

const clearHistoryMock = vi.fn();

vi.mock('../../store/historyStore', async () => {
  const actual = await vi.importActual<typeof import('../../store/historyStore')>(
    '../../store/historyStore'
  );
  return {
    ...actual,
    useHistoryStore: () => ({
      history: [{ id: '1' }],
      clearHistory: clearHistoryMock,
    }),
  };
});

vi.mock('../../utils/storage', async (importOriginal) => {
  const actual = await importOriginal<typeof storage>();
  const clearHistory = vi.fn();

  return {
    ...actual,
    clearHistory,
  };
});

describe('ClearHistoryButton', () => {
  it('рендерится и очищает store и localStorage', async () => {
    render(<ClearHistoryButton />);
    await userEvent.click(screen.getByRole('button'));

    expect(clearHistoryMock).toHaveBeenCalled();
    expect(storage.clearHistory).toHaveBeenCalled();
  });
});
