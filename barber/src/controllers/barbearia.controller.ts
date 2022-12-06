import { Barbearia } from "../interfaces/barbearia.interface";
import { atualizarFirestore, criarFirestore, deletarFirestore, lerColecaoFirestore, lerFirestore } from "./firebase.controller";
import { criarArquivoStorage, lerArquivoStorage } from "./storage.controller";

const COLECAO_BARBEARIA = "barbearias";
const PASTA_STORAGE = "foto_barbearia";

export const criarBarbearia = async (barbearia: Barbearia, fotoUri?: string) => {
    try {
        const id = await criarFirestore(COLECAO_BARBEARIA, barbearia);
        barbearia.id = id;
        if (fotoUri) {
            const response = await fetch(fotoUri);
            const arquivo = await response.blob();
            barbearia.foto = PASTA_STORAGE + "/" + id;
            await criarArquivoStorage(barbearia.foto, arquivo);
        }
        return atualizarBarbearia(id, barbearia);
    } catch (erro) {
        console.log(erro);
        return false;
    }
}

export const atualizarBarbearia = (id: string, barbearia: Barbearia) => {
    return atualizarFirestore<Barbearia>(COLECAO_BARBEARIA, id, barbearia);
}

export const deletarBarbearia = (id: string) => {
    return deletarFirestore(COLECAO_BARBEARIA, id);
}

export const lerBarbearia = (id: string) => {
    return lerFirestore<Barbearia>(COLECAO_BARBEARIA, id);
}

export const lerBarbearias = async () => {
    const barberarias = await lerColecaoFirestore<Barbearia>(COLECAO_BARBEARIA);
    const barbeariasComFoto = await Promise.all(barberarias.map(async (barbearia) => {
        if (barbearia.foto) {
            barbearia.link_foto = await lerArquivoStorage(barbearia.foto);
        }
        return barbearia
    }));
    return barbeariasComFoto;
}


