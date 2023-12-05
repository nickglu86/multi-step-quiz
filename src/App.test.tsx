import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


describe('App', () => {
  test('Render first quiz question', () => {
    render(<App />);
      // Verify first question is displayed
    expect(screen.getByText(/What is the capital of France\?/i)).toBeInTheDocument();
  });

  test('Select answer and move to next question', () => {
    render(<App />);
    // Select an answer
    fireEvent.click(screen.getByText(/Paris/i));

    // Click the "Next" button
    fireEvent.click(screen.getByText(/Next/i));

    // Verify the next question is displayed
    expect(screen.getByText(/Which planet is known as the Red Planet\?/i)).toBeInTheDocument();
  });

  test('shows scores page after submitting answers',  () => {
    render(<App />);

    // Answer all questions
    fireEvent.click(screen.getByText(/Paris/i));
    fireEvent.click(screen.getByText(/Next/i));

    fireEvent.click(screen.getByText(/Mars/i));
    fireEvent.click(screen.getByText(/Next/i));

    fireEvent.click(screen.getByText(/Blue Whale/i));
    fireEvent.click(screen.getByText(/Next/i));

    fireEvent.click(screen.getByText(/William Shakespeare/i));
    fireEvent.click(screen.getByText(/Next/i));

    fireEvent.click(screen.getByText(/Mitochondria/i));
    fireEvent.click(screen.getByText(/Submit/i));

    // Verify the scores page is displayed
    const scoresElement = screen.getByText(/Your Score is/i);
    expect(scoresElement).toBeInTheDocument();
  });
});