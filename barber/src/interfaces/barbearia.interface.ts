import { Horario } from "./horario.interface";

export interface Barbearia {
    pertence: string;
    cnpj: string;
    foto: string;
    endereco: string;
    latitude: number;
    longitude: number;
    ids_barbeiros: string[]
    id_catalago: string;
    horario_funcionamento: Horario;
}