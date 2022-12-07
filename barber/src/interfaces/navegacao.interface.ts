import { Barbearia } from "./barbearia.interface";

export type Navegacao = {
    Entrar: undefined;
    Cadastro: undefined;
    SideMenu: undefined;
    MinhaConta: undefined;
    Barbearias: undefined;
    HistoricoAgendamento: undefined;
    MinhasBarbeariasTabs: undefined;
    BarbeariaEmpregadora: undefined;
    MinhasBarbearias: undefined;
    AdicionarBarbearia: undefined;
    Notificacoes: undefined;
    BarbeariasTabs: {barbearia: Barbearia}
    Agendamento: {barbearia: Barbearia}
    Barbearia: {barbearia: Barbearia} 
    Barbeiros: {barbearia: Barbearia}
    HistoricoAgendamentoTabs: undefined
    AgendamentosConcluidos: undefined;
    AgendamentosPendentes: undefined;

}