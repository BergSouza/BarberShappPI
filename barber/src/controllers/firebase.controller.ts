import { db } from "../firebase.config";

export const criarFirestore = async <T>(colection: string, value: T) => {
    const doc = await db.collection(colection).add({ ...value as any });
    return doc.id;
}

export const atualizarFirestore = async <T>(colection: string, doc: string, value: T) => {
    await db.collection(colection).doc(doc).set({ ...value as any }, {merge: true});
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

