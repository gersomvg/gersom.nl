const startWith = ['code'];
const endWith = ['other'];

export default (categories: string[]): string[] => {
  const sorted = [];
  startWith.forEach(cat => {
    if (categories.includes(cat)) sorted.push(cat);
  });
  sorted.push(
    ...categories.filter(
      cat => !startWith.includes(cat) && !endWith.includes(cat)
    )
  );
  endWith.forEach(cat => {
    if (categories.includes(cat)) sorted.push(cat);
  });
  return sorted;
};
