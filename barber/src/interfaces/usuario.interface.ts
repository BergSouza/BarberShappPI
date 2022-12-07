export interface Usuario {
    id: string
    nome: string
    telefone: string
    email: string
    foto_perfil: string
    link_foto_perfil?: string
    eBarbeiro: boolean
    eDonoBarbearia: boolean
    barbearias: [];
    agendamentos_cliente: [];
    agendamentos_barbeiro: [];
    trabalha_barbearia: string;
}