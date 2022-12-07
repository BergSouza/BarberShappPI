import * as usuario from '../src/controllers/usuario.controller';
import UsuarioModel from '../src/interfaces/usuario.interface';

const usuarioValido = {
    id: '2',
    nome: 'usuario',
    telefone: '97780450',
    email: 'usuario@email.com',
    foto_perfil: 'foto.png',
    link_foto_perfil: 'link',
    eBarbeiro: true,
    eDonoBarbearia: true,
    barbearias: ['2','3'],
    agendamentos_cliente: ['5','8','11'],
    agendamentos_barbeiro: ['7','12','20'],
    trabalha_barbearia: 'valor',
} as UsuarioModel

const usuarioInvalido = {
    id: '2',
    nome: 'usuario',
    telefone: '97780450',
    email: 1122,
    foto_perfil: 'foto.png',
    link_foto_perfil: 'link',
    eBarbeiro: true,
    eDonoBarbearia: true,
    barbearias: 'barbearias',
    agendamentos_cliente: 'clientes'
} as UsuarioModel

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('test cadastrar usuario', () => {
    test('cadastrar usuario invalido', () => {
      expect(usuario.cadastrarUsuarioAuthFirestore(usuarioInvalido.email,usuarioInvalido.senha)).toBeFalsy();
    });
    test('cadastrar usuario valido', () => {
        expect(usuario.cadastrarUsuarioAuthFirestore(usuarioValido.email,usuarioValido.senha)).toBeFalsy();
    });
});

describe('test entrar usuario', () => {
    test('entrar', () => {
        expect(usuario.entrar(usuarioValido.email, usuarioValido.senha)).toBeTruthy();
    });
});

describe('test atualizar senha usuario', () => {
    test('atualizar senha', () => {
        expect(usuario.atualizarSenha(usuarioValido.email)).toBeTruthy();
    });
});

describe('test deslogar usuario', () => {
    test('deslogar', () => {
        expect(usuario.deslogar).toBeTruthy();
    });
});

describe('test idUsuarioAsyncStorage', () => {
    test('criar id', () => {
        expect(usuario.criarIdUsuarioAsyncStorage(usuarioValido.id)).toBeTruthy();
    });
    test('deletar id', () => {
        expect(usuario.deletarIdUsuarioAsyncStorage()).toBeTruthy();
    });
    test('ler id', () => {
        expect(usuario.lerIdUsuarioAsyncStorage()).toBeTruthy();
    });
});

describe('test usuario firestore', () => {
    test('atualizar', () => {
        expect(usuario.atualizarUsuarioFirestore(usuarioValido.usuario, usuarioValido.foto_perfil)).toBeTruthy();
    })
    test('ler', () => {
        expect(usuario.lerUsuarioFirestore(usuarioValido.id)).toBeTruthy();
    });
});
