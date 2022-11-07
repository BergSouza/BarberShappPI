import { authFire } from "../firebase.config";
import { User } from "../interfaces/user.interface";
import { update } from "./firebase";
import { storeData } from "./asyncStorage";

const USER_COLECTIONS = "usuarios"

export const registerUser = async (email: string, senha: string) => {
    return authFire.createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            const credenciais = userCredential.user;
            if (credenciais !== null) {
                const usuario: User = {
                    id: credenciais.uid,
                    nome: "",
                    telefone: "",
                    email: credenciais.email ? credenciais.email : '',
                    foto_perfil: "",
                    eBarbeiro: false,
                    eDonoBarbearia: false,
                    agenda: []
                }

                return update<User>(USER_COLECTIONS, credenciais.uid, usuario);
            }

            return false
        })
        .catch((error) => {
            console.log(error)
            return false
        });
}

export const login = async (email: string, senha: string) => {
    return authFire.signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            var user = userCredential.user;
            if (user !== null) {
                return storeData("ID_USUARIO",  user.uid);
            }
            return true
        })
        .catch((error) => {
            console.log(error)
            return false
        });
}


