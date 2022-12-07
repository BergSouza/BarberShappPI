export const pegarHorarios = () => {
    const horario: { label: string, value: string }[] = [];
    horario.push({label: "-", value: "-"})

    for (let i = 8; i <= 16; i++) {
        const h1 = (i + "h - " + i + "h30");
        const h2 = (i + "h30 - " + (i + 1) + "h");
        horario.push({label: h1, value: h1})
        horario.push({label: h2, value: h2})
    }

    return horario;
}

export const pegarData = () => {
    const calendario = new Date();
    const data: { label: string, value: string }[] = [];
    data.push({label: "-", value: "-"})

    for (let i = 0; i < 15; i++) {
        calendario.setDate(calendario.getDate() + 1);
        const dia = calendario.getDate();
        const mes = calendario.getMonth() + 1;
        const ano = calendario.getFullYear();
        const d = ((dia < 10 ? "0" + dia : "" + dia) + "/" + (mes < 10 ? "0" + mes : "" + mes) + "/" + ano);
        data.push({label: d, value: d})
    }

    return data;
}