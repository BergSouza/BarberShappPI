export interface Agendamento {
    id: string;
    id_cliente: string;
    id_barbearia: string;
    id_barbeiro: string;
    horario: string;
    data: string;
    descricao: string;
    concluido: boolean;
    aceita: boolean;
}

export interface AgendamentoRecebidoCliente extends Agendamento{
    nome_barbeiro: string;
    foto_barbearia: string;
    nome_barbearia: string;
}