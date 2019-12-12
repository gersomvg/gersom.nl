import sortPostCategories from '../sortPostCategories';

test('it sorts correctly', () => {
  expect(sortPostCategories(['a', 'b', 'other', 'code', 'c'])).toEqual([
    'code',
    'a',
    'b',
    'c',
    'other',
  ]);

  expect(sortPostCategories(['code', 'other', 'c', 'b', 'a'])).toEqual([
    'code',
    'c',
    'b',
    'a',
    'other',
  ]);
});
