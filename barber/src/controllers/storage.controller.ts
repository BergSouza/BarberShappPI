import { fireBaseStorage } from "../firebase.config";

const storage = fireBaseStorage.ref();

export const criarArquivoStorage = (caminhoArquivo: string, arquivo: Blob) =>{
    return storage.child(caminhoArquivo).put(arquivo);
}

export const lerArquivoStorage = (caminhoArquivo: string) =>{
    return storage.child(caminhoArquivo).getDownloadURL();
}