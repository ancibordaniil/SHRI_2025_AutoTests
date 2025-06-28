import { render } from '@testing-library/react';
import { Loader } from '@ui/Loader';

describe('Loader', () => {
  it('рендерится с размером по умолчанию', () => {
    const { container } = render(<Loader />);
    const div = container.querySelector('div')!;
    expect(div.style.width).toBe('60px');
    expect(div.style.height).toBe('60px');
  });

  it('рендерится с кастомным размером', () => {
    const { container } = render(<Loader size={100} />);
    const div = container.querySelector('div')!;
    expect(div.style.width).toBe('100px');
    expect(div.style.height).toBe('100px');
  });
});
