import { render, screen } from '@testing-library/react';
import App from './App';

describe('true is truthy and false is false', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });
  test('false is falsy', () => {
    expect(false).toBe(false)
  })
})