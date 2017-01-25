import diff from '../src';

describe.only('test difference', () => {
  test('test diff', () => {
    const before = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22'
    };

    const after = {
      host: 'hexlet.io',
      timeout: 20,
      verbose: true
    };

    const result = [
      {
        key: 'host',
        status: 'notChanged',
        oldValue: 'hexlet.io',
        newValue: 'hexlet.io'
      },
      {
        key: 'timeout',
        status: 'changed',
        oldValue: '50',
        newValue: '20'
      },
      {
        key: 'proxy',
        status: 'deleted',
        oldValue: '123.234.53.22',
        newValue: '123.234.53.22'
      },
      {
        key: 'verbose',
        status: 'added',
        oldValue: 'true',
        newValue: 'true'
      }
    ];

    expect(diff(before, after)).toEqual(result);
  });
});

test('test function diff', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22'
  };

  const after = {
    host: 'hexlet.io',
    timeout: 20,
    verbose: true
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
  expect(diff(before, after)).toBe(result);
});
