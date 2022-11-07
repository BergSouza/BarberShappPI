import { db } from "../firebase.config";

export const create = async <T>(colection: string, value: T) => {
    return db.collection(colection).add({ ...value as any  }).then((doc) => {
        return doc.id;

    }).catch((error: any) => {
        console.log(error);
        return false;
    });
}

export const update = async <T>(colection: string, doc: string, value: T) => {
    return db.collection(colection).doc(doc).set({ ...value as any }).then(() => {
        return true;
    }).catch((error: any) => {
        console.error("Error adding document: ", error);
        return false
    });
}

export const remove = async <T>(colection: string, doc: string) => {
    return db.collection(colection).doc(doc).delete().then(() => {
        return true;
    }).catch((error: any) => {
        console.error("Error removing document: ", error);
        return false
    });
}

export const read = async <T>(colection: string, doc: string) => {
    return db.collection(colection).doc(doc).get().then((doc) => {
        if (doc.exists) {
            return doc.data() as T
        } else {
            return false
        }
    }).catch((error: any) => {
        console.log("Error getting document:", error);
        return false
    });
}

export const readColection = async <T>(colection: string): Promise<T[]> => {
    return db.collection(colection).get().then((querySnapshot) => {
        const col: any[] = [];
        querySnapshot.forEach((doc) => {
            let data = { ...doc.data() }
            data = { ...data, id: doc.id }
            col.push({ ...data })
        });
        return col;
    }).catch((error: any) => {
        console.log("Error getting documents: ", error);
        return []
    });
}

