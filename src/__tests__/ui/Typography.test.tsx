import { render } from '@testing-library/react';
import { Typography } from '@ui/Typography';

describe('Typography', () => {
  it('рендерит переданный текст', () => {
    const { getByText } = render(<Typography>Привет</Typography>);
    expect(getByText('Привет')).toBeInTheDocument();
  });

  it('применяет переданные стили', () => {
    const { getByText } = render(
      <Typography size="l" weight="bold" color="purple" style="italic" className="custom-class">
        Текст
      </Typography>
    );
    const element = getByText('Текст');
    expect(element.className).toContain('text-size-l');
    expect(element.className).toContain('text-weight-bold');
    expect(element.className).toContain('text-style-italic');
    expect(element.className).toContain('text-color-purple');
    expect(element.className).toContain('custom-class');
  });

  it('ограничивает количество строк через maxRowsNumber', () => {
    const { getByText } = render(<Typography maxRowsNumber={3}>Лимит</Typography>);
    expect(getByText('Лимит').className).toContain('withLineClamp');
  });

  it('рендерит с тегом h3', () => {
    const { container } = render(<Typography as="h3">Заголовок</Typography>);
    const h3 = container.querySelector('h3');
    expect(h3).not.toBeNull();
    expect(h3?.textContent).toBe('Заголовок');
  });
});
