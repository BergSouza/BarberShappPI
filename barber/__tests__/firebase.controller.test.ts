import * as firebaseFunctions from '../src/controllers/firebase.controller';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('testing firebase controller file', () => {
    test('double function', () => {
      expect(firebaseFunctions.criarFirestore("teste", 1)).toBe("string");
    });
  });