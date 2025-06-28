import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { HighlightsSection } from '../../components/HighlightsSection';

const mockHighlights = [
  { title: 'Highlight 1', description: 'Description 1' },
  { title: 'Highlight 2', description: 'Description 2' },
];

const localStorageSetItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');

describe('HighlightsSection', () => {
  beforeEach(() => {
    localStorageSetItemSpy.mockClear();
  });

  test('отображает плейсхолдер, если массив пуст', () => {
    render(<HighlightsSection highlights={[]} />);
    expect(screen.getByText(/здесь появятся хайлайты/i)).toBeInTheDocument();
  });

  test('отрисовывает правильное количество карточек', () => {
    render(<HighlightsSection highlights={mockHighlights} />);
    expect(screen.getAllByText(/Highlight/i)).toHaveLength(mockHighlights.length);
  });
});
