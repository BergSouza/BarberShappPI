import { authFire } from "../firebase.config";
import { Usuario } from "../interfaces/usuario.interface";
import { atualizarFirestore, lerFirestore } from "./firebase.controller";
import { criarAsyncStorage, deletarAsyncStorage, lerAsyncStorage } from "./asyncStorage.controller";
import { auth, login, signout } from "../reducers/AuthReducer";
import { update, usuarioReducer } from "../reducers/UsuarioReducer";
import { criarArquivoStorage, lerArquivoStorage } from "./storage.controller";

const COLECAO_USUARIOS = "usuarios";
const ASYNC_ID_USUARIO = "ID_USUARIO";
const PASTA_STORAGE = "foto_perfil";

export const cadastrarUsuarioAuthFirestore = async (email: string, senha: string) => {
    try {
        const credenciais = await authFire.createUserWithEmailAndPassword(email, senha);
        const usuarioFirebase = credenciais.user;

        if (usuarioFirebase !== null) {
            const usuario: Usuario = {
                id: usuarioFirebase.uid,
                nome: "",
                telefone: "",
                email: usuarioFirebase.email ? usuarioFirebase.email : '',
                foto_perfil: "",
                eBarbeiro: false,
                eDonoBarbearia: false,
                barbearias: [],
                agendamentos_cliente: [],
                agendamentos_barbeiro: [],
                trabalha_barbearia: "",
                pedido_barbeiro: [],
                comentario_barbeiro: [],
                avaliacao: 0
            }

            return await atualizarUsuarioFirestore(usuario);
        }

        return false
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const entrar = async (email: string, senha: string) => {
    try {
        const credenciais = await authFire.signInWithEmailAndPassword(email, senha);
        const usuarioFirebase = credenciais.user;
        if (usuarioFirebase !== null) {
            auth.dispatch(login());
            const usuario = await lerUsuarioFirestore(usuarioFirebase.uid);
            usuarioReducer.dispatch(update(usuario));
            return await criarIdUsuarioAsyncStorage(usuarioFirebase.uid);
        }
        return false;

    } catch (error) {
        return false;
    }
}

export const atualizarSenha = async (email: string) => {
    try {
        const credenciais = await authFire.sendPasswordResetEmail(email);
        return true;

    } catch (error) {
        return false;
    }
}

export const deslogar = async () => {
    await authFire.signOut();
    await deletarIdUsuarioAsyncStorage();
    auth.dispatch(signout());
    return true;
}

export const criarIdUsuarioAsyncStorage = (id: string) => {
    return criarAsyncStorage(ASYNC_ID_USUARIO, id);
}

export const deletarIdUsuarioAsyncStorage = () => {
    return deletarAsyncStorage(ASYNC_ID_USUARIO);
}

export const lerIdUsuarioAsyncStorage = () => {
    return lerAsyncStorage(ASYNC_ID_USUARIO);
}

export const atualizarUsuarioFirestore = async (usuario: Usuario, fotoUri?: string) => {

    if (fotoUri) {
        const response = await fetch(fotoUri);
        const arquivo = await response.blob();
        usuario.foto_perfil = PASTA_STORAGE + "/" + usuario.id;
        await criarArquivoStorage(usuario.foto_perfil, arquivo);
    }

    usuario.link_foto_perfil = await lerArquivoStorage(usuario.foto_perfil);
    await atualizarFirestore<Usuario>(COLECAO_USUARIOS, usuario.id, usuario);
    usuarioReducer.dispatch(update(usuario));   
    return true;
}

export const lerUsuarioFirestore = async (id: string) => {
    let usuario = await lerFirestore<Usuario>(COLECAO_USUARIOS, id);
    if (usuario.foto_perfil) {
        usuario.link_foto_perfil = await lerArquivoStorage(usuario.foto_perfil);
    }
    return usuario;
}


