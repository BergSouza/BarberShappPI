export interface Agendamento {
    id: string;
    id_cliente: string;
    id_barbeiro: string;
    horario: string;
    data: string;
    descricao: string;
    concluido: boolean;
}