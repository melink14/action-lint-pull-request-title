import validatePrTitle from './validatePrTitle.js';

it('allows valid PR titles that use the default types', async () => {
  const inputs = [
    'build(some-scope): some title',
    'chore(some-scope): some title',
    'ci(some-scope): some title',
    'docs(some-scope): some title',
    'feat(some-scope): some title',
    'fix(some-scope): some title',
    'perf(some-scope): some title',
    'refactor(some-scope): some title',
    'revert(some-scope): some title',
    'style(some-scope): some title',
    'test(some-scope): some title'
  ];

  for (let index = 0; index < inputs.length; index++) {
    await validatePrTitle(inputs[index]);
  }
});

it('throws for malformed PR titles', async () => {
  const inputs = ['Fix bug', 'foo: Bar', 'fix: no scope', 'fix(scope): Wrong Casing'];

  for (let index = 0; index < inputs.length; index++) {
    await expect(validatePrTitle(inputs[index])).rejects.toThrow();
  }
});

it('allows valid PR title + body combinations', async () => {
  await validatePrTitle('feat(some-scope): some title\n\nsome body');
});

it('throws for valid PR title + malformed body combinations', async () => {
  await expect(
    validatePrTitle(
`feat(some-scope): some title
some body more than 100 characters xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
  ).rejects.toThrow();
});
