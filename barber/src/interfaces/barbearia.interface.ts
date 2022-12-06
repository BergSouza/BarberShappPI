import { Horario } from "./horario.interface";

export interface Barbearia {
    id: string;
    pertence: string;
    cnpj: string;
    nome: string;
    foto: string;
    link_foto?: string;
    endereco: string;
    ids_barbeiros: string[]
}