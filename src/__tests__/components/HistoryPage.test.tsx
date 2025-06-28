import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { HistoryPage } from '../../pages/History/HistoryPage';

vi.mock('@components/HistoryList', () => ({
  HistoryList: () => <div>HistoryList</div>,
}));
vi.mock('@components/GenerateMoreButton', () => ({
  GenerateMoreButton: () => <button>Generate More</button>,
}));
vi.mock('@components/ClearHistoryButton', () => ({
  ClearHistoryButton: () => <button>Clear All</button>,
}));
vi.mock('@components/HistoryModal', () => ({
  HistoryModal: () => <div>Modal</div>,
}));

describe('HistoryPage', () => {
  it('рендерит все дочерние компоненты', () => {
    render(<HistoryPage />);
    expect(screen.getByText('HistoryList')).toBeInTheDocument();
    expect(screen.getByText('Generate More')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
    expect(screen.getByText('Modal')).toBeInTheDocument();
  });
});
