import compare, { DiffState } from '../src';

describe('test object Difference', () => {
  test('Difference state notChanged', () => {
    const notChangedDiff = new DiffState('notChanged', 'timeout', 20);

    expect(notChangedDiff.getState()).toBe('notChanged');
    expect(notChangedDiff.getKey()).toBe('timeout');
    expect(notChangedDiff.getValue()).toBe(20);
    expect(notChangedDiff.getOldValue()).toBe(undefined);
  });

  test('Difference state changed', () => {
    const changedDiff = new DiffState('changed', 'timeout', 50, 20);

    expect(changedDiff.getState()).toBe('changed');
    expect(changedDiff.getKey()).toBe('timeout');
    expect(changedDiff.getValue()).toBe(50);
    expect(changedDiff.getOldValue()).toBe(20);
  });

  test('Difference state added', () => {
    const addedState = new DiffState('added', 'timeout', 50);

    expect(addedState.getState()).toBe('added');
    expect(addedState.getKey()).toBe('timeout');
    expect(addedState.getValue()).toBe(50);
    expect(addedState.getOldValue()).toBe(undefined);
  });

  test('Difference state deleted', () => {
    const deletedState = new DiffState('deleted', 'timeout', 50);

    expect(deletedState.getState()).toBe('deleted');
    expect(deletedState.getKey()).toBe('timeout');
    expect(deletedState.getValue()).toBe(50);
    expect(deletedState.getOldValue()).toBe(undefined);
  });
});

describe('test compare', () => {
  test('test compare', () => {
    const before = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
    };

    const after = {
      host: 'hexlet.io',
      timeout: 20,
      verbose: true,
    };

    const result = [
      new DiffState('notChanged', 'host', 'hexlet.io'),
      new DiffState('changed', 'timeout', 20, 50),
      new DiffState('deleted', 'proxy', '123.234.53.22'),
      new DiffState('added', 'verbose', true),
    ];

    expect(compare(before, after)).toEqual(result);
  });
});

xtest('test display plain text', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
  };

  const after = {
    host: 'hexlet.io',
    timeout: 20,
    verbose: true,
  };

  const result = (
    '{\n' +
    '    host: hexlet.io\n' +
    '  + timeout: 20\n' +
    '  - timeout: 50\n' +
    '  - proxy: 123.234.53.22\n' +
    '  + verbose: true\n' +
    '}'
  );
  expect(compare(before, after)).toBe(result);
});
