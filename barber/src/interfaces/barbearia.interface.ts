import { Horario } from "./horario.interface";

export interface Barbearia {
    id: string;
    pertence: string;
    cnpj: string;
    foto: string;
    endereco: string;
    ids_barbeiros: string[]
}