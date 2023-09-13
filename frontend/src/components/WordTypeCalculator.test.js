import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import WordTypeCalculator from './WordTypeCalculator';
import { act } from 'react-dom/test-utils';
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

// Mocking axios post call
jest.mock('axios');

const formatResult = (result) => {
    const keys = ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun", "interjection", "determiner", "numeral"];

    let formattedResult = "";
    keys.forEach(key => {
        formattedResult += `${key}: ${result[key] || 0}\n`;
    });

    return formattedResult;
};


describe('<WordTypeCalculator />', () => {

    test('renders input and button elements', () => {
        render(<WordTypeCalculator />);
        const inputEl = screen.getByLabelText('Input Text:');
        const buttonEl = screen.getByRole('button', { name: /Calculate/i });
        expect(inputEl).toBeInTheDocument();
        expect(buttonEl).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(<WordTypeCalculator />);
        const inputEl = screen.getByLabelText('Input Text:');
        fireEvent.change(inputEl, { target: { value: 'Hello world' } });
        expect(inputEl.value).toBe('Hello world');
    });

    test('calls calculateWordTypes function on button click', async () => {
        axios.post.mockResolvedValue({ data: { words: 2 } });

        render(<WordTypeCalculator />);
        const inputEl = screen.getByLabelText('Input Text:');
        const buttonEl = screen.getByRole('button', { name: /Calculate/i });

        // Simulate user entering text
        fireEvent.change(inputEl, { target: { value: 'Hello world' } });

        await act(async () => {
            fireEvent.click(buttonEl);
        });

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(
                apiUrl,
                { text: 'Hello world' },
                { headers: { 'Content-Type': 'application/json' } }
            );
        });
    });

});
