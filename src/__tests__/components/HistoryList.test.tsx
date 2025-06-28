import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { HistoryList } from '../../components/HistoryList';

const showModal = vi.fn();
const setSelectedItem = vi.fn();
const removeFromHistoryStore = vi.fn();
const updateHistoryFromStorage = vi.fn();

vi.mock('../../store/historyStore', async () => {
  const actual = await vi.importActual<typeof import('../../store/historyStore')>('../../store/historyStore');
  return {
    ...actual,
    useHistoryStore: () => ({
      history: [{ id: '1', label: 'Файл 1' }],
      showModal,
      setSelectedItem,
      removeFromHistoryStore,
      updateHistoryFromStorage,
    }),
  };
});

vi.mock('../../components/HistoryItem', () => ({
  HistoryItem: ({ item, onClick, onDelete }: {
    item: { id: string; label: string },
    onClick: (item: { id: string; label: string }) => void,
    onDelete: (id: string) => void,
  }) => (
    <div>
      <span>{item.label}</span>
      <button onClick={() => onClick(item)}>Открыть</button>
      <button onClick={() => onDelete(item.id)}>Удалить</button>
    </div>
  ),
}));

describe('HistoryList', () => {
  it('рендерит элементы истории и обрабатывает клики', async () => {
    render(<HistoryList />);
    expect(screen.getByText('Файл 1')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Открыть'));
    expect(setSelectedItem).toHaveBeenCalled();
    expect(showModal).toHaveBeenCalled();

    await userEvent.click(screen.getByText('Удалить'));
    expect(removeFromHistoryStore).toHaveBeenCalledWith('1');
  });
});
