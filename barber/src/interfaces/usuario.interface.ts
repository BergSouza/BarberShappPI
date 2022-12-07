export interface Usuario {
    id: string
    nome: string
    telefone: string
    email: string
    foto_perfil: string
    link_foto_perfil?: string
    eBarbeiro: boolean
    eDonoBarbearia: boolean
    barbearias: string[];
    agendamentos_cliente: string[];
    agendamentos_barbeiro: string[];
    trabalha_barbearia: string;
    pedido_barbeiro: Pedido[];
    comentario_barbeiro: Pedido[];
    avaliacao: number;
}

interface Pedido{
    horario: string;
    data: string;
    usuario_id: string;
    comentario: string;
}