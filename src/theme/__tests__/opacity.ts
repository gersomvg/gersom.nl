import opacity from '../opacity';

test('correctly sets opacity', () => {
  expect(opacity('rgba(0,0,0,1)', 0.1)).toBe('rgba(0,0,0,0.1)');
  expect(opacity('rgba(255,0,0,0.1)', 1)).toBe('rgba(255,0,0,1)');
});
