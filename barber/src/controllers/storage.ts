import { fireBaseStorage } from "../firebase.config";

const storageRef = fireBaseStorage.ref();

export const criarArquivo = (caminhoArquivo: string) =>{
    //return storageRef.child(caminhoArquivo).put();
}