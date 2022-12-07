import * as agendamento from '../src/controllers/agendamento.controller';
import AgendamentoModel from '../src/interfaces/agendamento.interface';

const agendamentoValido = {
    id: '2',
    id_cliente: '2',
    barbeiro: '2',
    horario: '10',
    data: '22/12/2022',
} as AgendamentoModel

const agendamentoInvalido = {
    id: 2,
    id_cliente: 2,
    barbeiro: 2,
    horario: 10,
    data: {
    },
} as AgendamentoModel

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('test criar agendamento', () => {
    test('criar agendamento invalido', () => {
      expect(agendamento.criarAgendamento(agendamentoInvalido)).toBeFalsy();
    });
    test('criar agendamento valido', () => {
        expect(agendamento.criarAgendamento(agendamentoValido)).toBeTruthy();
    });
});

describe('test atualizar agendamento', () => {
    test('atualizar agendamento valido', () => {
        expect(agendamento.atualizarAgendamento('2', agendamentoValido)).toBeTruthy();
    });
});

describe('test deletar agendamento', () => {
    test('deletar agendamento valido', () => {
        expect(agendamento.deletarAgendamento('2')).toBeTruthy();
    });
});

describe('test ler agendamento', () => {
    test('ler agendamento valido', () => {
        expect(agendamento.lerAgendamento('2')).toBeTruthy();
    });
});