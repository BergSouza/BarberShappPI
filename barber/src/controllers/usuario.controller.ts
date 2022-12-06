import { authFire } from "../firebase.config";
import { Usuario } from "../interfaces/usuario.interface";
import { atualizarFirestore, lerFirestore } from "./firebase.controller";
import { criarAsyncStorage, deletarAsyncStorage, lerAsyncStorage } from "./asyncStorage.controller";
import { auth, login, signout } from "../reducers/AuthReducer";

const COLECAO_USUARIOS = "usuarios";
const ASYNC_ID_USUARIO = "ID_USUARIO";

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
                agenda: []
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
            return await criarIdUsuarioAsyncStorage(usuarioFirebase.uid);
        }
        return false;

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

export const atualizarUsuarioFirestore = (usuario: Usuario) => {
    return atualizarFirestore<Usuario>(COLECAO_USUARIOS, usuario.id, usuario);
}

export const lerUsuarioFirestore = (usuario: Usuario) => {
    return lerFirestore<Usuario>(COLECAO_USUARIOS, usuario.id);
}


