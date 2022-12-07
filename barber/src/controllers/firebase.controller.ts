import { db } from "../firebase.config";

export const criarFirestore = async <T>(colection: string, value: T) => {
    const doc = await db.collection(colection).add({ ...value as any });
    return doc.id;
}

export const atualizarFirestore = async <T>(colection: string, doc: string, value: T) => {
    await db.collection(colection).doc(doc).set({ ...value as any }, { merge: true });
    return true;
}

export const deletarFirestore = async <T>(colection: string, doc: string) => {
    await db.collection(colection).doc(doc).delete();
    return true;
}

export const lerFirestore = async <T>(colection: string, doc: string) => {
    const data = await db.collection(colection).doc(doc).get();
    return { ...data.data(), id: data.id } as T
}

export const procurarFirestore = async <T>(colection: string,
    atributo: string, operador: firebase.firestore.WhereFilterOp, valor: any): Promise<T[]> => {
    const datas = await db.collection(colection).where(atributo, operador, valor).get();

    const col: any[] = [];
    datas.forEach((doc) => {
        let data = { ...doc.data() }
        data = { ...data, id: doc.id }
        col.push({ ...data })
    });

    return col;
}

export const procurarCompostaFirestore2 = async <T>(colection: string,
    atributo: string, operador: firebase.firestore.WhereFilterOp, valor: any,
    atributo2: string, operador2: firebase.firestore.WhereFilterOp, valor2: any): Promise<T[]> => {
    const datas = await db.collection(colection).where(atributo, operador, valor).where(atributo2, operador2, valor2).get();
    const col: any[] = [];
    datas.forEach((doc) => {
        let data = { ...doc.data() }
        data = { ...data, id: doc.id }
        col.push({ ...data })
    });

    return col;
}

export const lerColecaoFirestore = async <T>(colection: string): Promise<T[]> => {
    const datas = await db.collection(colection).get();

    const col: any[] = [];
    datas.forEach((doc) => {
        let data = { ...doc.data() }
        data = { ...data, id: doc.id }
        col.push({ ...data })
    });

    return col;
}

