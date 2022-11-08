import { Agendamento } from "../interfaces/agendamento.interface";
import { atualizarFirestore, criarFirestore, deletarFirestore, lerFirestore } from "./firebase.controller";

const COLECAO_AGENDAMENTO = "agendamentos";

export const criarAgendamento = async (agendamento: Agendamento) => {
    try {
        const id = await criarFirestore(COLECAO_AGENDAMENTO, agendamento);
        agendamento.id = id;
        return atualizarAgendamento(id, agendamento);
    } catch (erro) {
        console.log(erro);
        return false;
    }
}

export const atualizarAgendamento = (id: string, agendamento: Agendamento) => {
    return atualizarFirestore<Agendamento>(COLECAO_AGENDAMENTO, id, agendamento);
}

export const deletarAgendamento = (id: string) => {
    return deletarFirestore(COLECAO_AGENDAMENTO, id);
}

export const lerAgendamento = (id: string) => {
    return lerFirestore<Agendamento>(COLECAO_AGENDAMENTO, id);
}


