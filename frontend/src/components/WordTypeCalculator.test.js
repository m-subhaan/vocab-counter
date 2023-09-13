import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import WordTypeCalculator from './WordTypeCalculator';
import { act } from 'react-dom/test-utils'; // Add this import at the top


// Mocking axios post call
jest.mock('axios');

describe('<WordTypeCalculator />', () => {

    test('renders input and button elements', () => {
        render(<WordTypeCalculator />);
        const inputEl = screen.getByRole('textbox');
        const buttonEl = screen.getByRole('button', { name: /Calculate/i });
        expect(inputEl).toBeInTheDocument();
        expect(buttonEl).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(<WordTypeCalculator />);
        const inputEl = screen.getByRole('textbox');
        fireEvent.change(inputEl, { target: { value: 'Hello world' } });
        expect(inputEl.value).toBe('Hello world');
    });

    test('calls calculateWordTypes function on button click', async () => {
        axios.post.mockResolvedValue({ data: { words: 2 } });

        render(<WordTypeCalculator />);
        const buttonEl = screen.getByRole('button', { name: /Calculate/i });

        await act(async () => {
            fireEvent.click(buttonEl);
        });

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(
                'https://i704lmf3e9.execute-api.us-east-1.amazonaws.com/calculate-word-count',
                { text: '' },
                { headers: { 'Content-Type': 'application/json' } }
            );
        });
    });

    test('displays API response after button click', async () => {
        const mockResponse = { words: 5, characters: 20 };
        axios.post.mockResolvedValue({ data: mockResponse });

        render(<WordTypeCalculator />);
        const buttonEl = screen.getByRole('button', { name: /Calculate/i });
        await act(async () => {
            fireEvent.click(buttonEl);
        });

        await waitFor(() => {
            expect(screen.getByText(JSON.stringify(mockResponse))).toBeInTheDocument();
        });
    });

});
