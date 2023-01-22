// Firestore
import { getDocs, collection } from "firebase/firestore";
// Mis importaciones
import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
    const docRef = collection(db, uid, "journal", "notes");
    const docSnap = await getDocs(docRef);
    const notes = [];

    docSnap.docs.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });

    return notes;
}

/*
    const equipment = collection(db, 'udstyr');
    const snapshot = await getDocs(equipment);
    const result = snapshot.docs.map(doc => doc.data());
*/