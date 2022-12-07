import { Agendamento } from "../interfaces/agendamento.interface";
import { atualizarFirestore, criarFirestore, deletarFirestore, lerFirestore, procurarCompostaFirestore2, procurarFirestore } from "./firebase.controller";

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

export const pegarHorariosProibidosAgendamentos = async (dataSelecionada: string, idBarbeiro: string) => {
    const agendamentos = await procurarCompostaFirestore2<Agendamento>(COLECAO_AGENDAMENTO, "data", "==", dataSelecionada,
        "id_barbeiro", "==", idBarbeiro);
    return agendamentos.map((agendamento) => {
        return agendamento.horario;
    });
}


export const lerAgendamentoPorUsuario = async (id_cliente: string) => {
    return procurarFirestore<Agendamento>(COLECAO_AGENDAMENTO, "id_cliente", "==", id_cliente);
}

export const lerAgendamentoPorBarbeiro = async (id_cliente: string) => {
    return procurarFirestore<Agendamento>(COLECAO_AGENDAMENTO, "id_barbeiro", "==", id_cliente);
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


