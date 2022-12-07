import * as barbearia from '../src/controllers/barbearia.controller';
import BarbeariaModel from '../src/interfaces/agendamento.interface';

const barbeariaValida = {
    id: '2',
    pertence: '3',
    cnpj: '123123',
    nome: 'barbearia',
    foto: 'undefined.png',
    link_foto: 'link',
    endereco: 'endereco',
    ids_barbeiros: ['1','2','3']
} as BarbeariaModel

const barbeariaInvalida = {
    id: 3,
    pertence: [],
    cnpj: '123123',
    nome: 'barbearia',
    foto: 'undefined.png',
    link_foto: 'link',
    endereco: 'endereco',
    ids_barbeiros: ['1','2','3']
} as BarbeariaModel

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('test criar barbearia', () => {
    test('criar barbearia invalida', () => {
      expect(barbearia.criarBarbearia(barbeariaInvalida,'link')).toBeFalsy();
    });
    test('criar barbearia valida', () => {
        expect(barbearia.criarBarbearia(barbeariaValida,'link')).toBeTruthy();
    });
});

describe('test atualizar barbearia', () => {
    test('atualizar barbearia', () => {
        expect(barbearia.atualizarBarbearia('2', barbeariaValida)).toBeTruthy();
    });
});

describe('test deletar barbearia', () => {
    test('deletar barbearia', () => {
        expect(barbearia.deletarBarbearia('2')).toBeTruthy();
    });
});

describe('test ler barbearia', () => {
    test('ler barbearia', () => {
        expect(barbearia.lerBarbearia('2')).toBeTruthy();
    });
});

describe('test ler barbearias', () => {
    test('ler barbearias', () => {
        expect(barbearia.lerBarbearias()).toBeTruthy();
    });
});
