import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { HistoryModal } from '../../components/HistoryModal';

vi.mock('../../store/historyStore', async () => {
  const actual = await vi.importActual<typeof import('../../store/historyStore')>(
    '../../store/historyStore'
  );
  return {
    ...actual,
    useHistoryStore: () => ({
      isOpenModal: true,
      selectedItem: {
        highlights: {
          total_spend_galactic: 1000,
          rows_affected: 42,
        },
      },
      hideModal: vi.fn(),
    }),
  };
});

vi.mock('../../components/HighlightCard', () => ({
  HighlightCard: ({ highlight }: { highlight: { title: string | number } }) => (
    <div>{highlight.title}</div>
  ),
}));

vi.mock('../../ui/Modal', () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('HistoryModal', () => {
  it('рендерит все highlights', () => {
    render(<HistoryModal />);
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
