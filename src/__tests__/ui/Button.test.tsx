import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@ui/Button';
import { describe, test, expect, vi } from 'vitest';

describe('Button component', () => {
  test('отображает переданный текст', () => {
    render(<Button>Кнопка</Button>);
    expect(screen.getByText('Кнопка')).toBeInTheDocument();
  });

  test('вызывает onClick при клике', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('отображается в состоянии disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});