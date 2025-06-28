import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { Dropzone } from '../../components/Dropzone';

const file = new File(['id,name\n1,John'], 'test.csv', { type: 'text/csv' });
const wrongFile = new File(['fake'], 'wrong.txt', { type: 'text/plain' });

describe('Dropzone', () => {
    test('рендерится кнопка "Загрузить файл" по умолчанию', () => {
        render(<Dropzone file={null} status="idle" error={null} onFileSelect={() => {}} onClear={() => {}} />);
        expect(screen.getByText(/Загрузить файл/i)).toBeInTheDocument();
    });

    test('drag-and-drop загружает csv файл', () => {
        const onFileSelect = vi.fn();

        render(<Dropzone file={null} status="idle" error={null} onFileSelect={onFileSelect} onClear={() => {}} />);

        const dropzone = screen.getByTestId('dropzone');

        fireEvent.dragEnter(dropzone, {
            dataTransfer: { files: [file] },
        });

        fireEvent.drop(dropzone, {
            dataTransfer: { files: [file] },
        });

        expect(onFileSelect).toHaveBeenCalledWith(file);
    });

    test('отображается ошибка при загрузке не .csv файла', () => {
        render(<Dropzone file={null} status="idle" error={null} onFileSelect={() => {}} onClear={() => {}} />);

        const dropzone = screen.getByTestId('dropzone');

        fireEvent.drop(dropzone, {
            dataTransfer: { files: [wrongFile] },
        });

        expect(screen.getByText(/только \*\.csv файлы/i)).toBeInTheDocument();
    });
});
