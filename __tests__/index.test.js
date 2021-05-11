const fs = require('fs');
const { upVersion } = require('../src/index.js');

const JSON_URI = '__fixtures__/package.json';
const JSON_DEFAULT_DATA = { version: '1.3.2' };

// BEGIN

beforeEach(() => {
  fs.writeFileSync(JSON_URI, JSON.stringify(JSON_DEFAULT_DATA));
});

describe('Error handling', () => {
  test('Check for incorrect file', () => {
    expect(() => upVersion('imaginary.file')).toThrow(Error);
  });

  test('Check for incorrect type', () => {
    expect(() => upVersion('fixtures-fix/package-incorrect-type.json', 'putin')).toThrow(Error);
  });

  test('Check for error, when type is abscent', () => {
    expect(() => upVersion('fixtures-fix/package-empty-type.json')).toBeTruthy();
  });

  test('Check for error, when json has broken', () => {
    expect(() => upVersion('fixtures-fix/package-incorrect-json.json')).toThrow(Error);
  });
});

describe('Positive cases', () => {
  test('Patch version', () => {
    upVersion(JSON_URI, 'patch');
    const fileRes = fs.readFileSync(JSON_URI, 'utf-8');
    const { version } = JSON.parse(fileRes);
    expect(version).toBe('1.3.3');
  });

  test('Patch version without attribute', () => {
    upVersion(JSON_URI);
    const fileRes = fs.readFileSync(JSON_URI, 'utf-8');
    const { version } = JSON.parse(fileRes);
    expect(version).toBe('1.3.3');
  });

  test('Minor version', () => {
    upVersion(JSON_URI, 'minor');
    const fileRes = fs.readFileSync(JSON_URI, 'utf-8');
    const { version } = JSON.parse(fileRes);
    expect(version).toBe('1.4.0');
  });

  test('Major version', () => {
    upVersion(JSON_URI, 'major');
    const fileRes = fs.readFileSync(JSON_URI, 'utf-8');
    const { version } = JSON.parse(fileRes);
    expect(version).toBe('2.0.0');
  });
});
// END
