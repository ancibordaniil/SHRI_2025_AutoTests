import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { GenerateMoreButton } from '../../components/GenerateMoreButton';

describe('GenerateMoreButton', () => {
  it('переходит на /generate при клике', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>        
        <Routes>
          <Route path="/" element={<GenerateMoreButton />} />
          <Route path="/generate" element={<div>Generate page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /сгенерировать больше/i }));
    expect(screen.getByText('Generate page')).toBeInTheDocument();
  });
});