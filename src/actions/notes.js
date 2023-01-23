// Firebase
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
// Sweet alert
import Swal from "sweetalert2";
// Mis importaciones
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { types } from "../types/types";

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        url:note.url,
        ...note
    }
});

export const startNewNote = () => {
    return async (dispatch, getState)  => {
        const state = getState();
        const { uid } = state.auth;
        // Creamos nueva nota
        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime()
        };
        const docRef = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
        dispatch(refreshNote(docRef.id, newNote));
        dispatch(activeNote(docRef.id, newNote));
    }
};

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const state = getState();
        const { uid } = state.auth;
        if(!note.url) {
            delete note.url;
        }
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await setDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire({
            title: 'Saved',
            text: note.title,
            icon: 'success'
        });
    }
};

export const refreshNote = (id, note) => {
    return {
    type: types.notesUpdated,
    payload: {
        id: id,
        note: {
            id: id,
            ...note
        }
    }
}
};

export const deleteNote = () => {
    return async (dispatch, getState) => {
        const state = getState(state => state);
        const { uid } = state.auth;
        const {active} = state.notes;
        await deleteDoc(doc(db, `${uid}/journal/notes/${active.id}`));
        dispatch(deleteNoteStore(active.id));
    }
}

export const deleteNoteStore = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const state = getState(state => state);
        const {active} = state.notes;

        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        // dispatch(startSaveNote(active));

        const { uid } = state.auth;
        const noteToFirestore = {...active};
        delete noteToFirestore.id;

        await setDoc(doc(db, `${uid}/journal/notes/${active.id}`), noteToFirestore);
        dispatch(refreshNote(active.id, noteToFirestore));
        Swal.fire({
            title: 'Saved',
            text: 'Ok',
            icon: 'success'
        });
    }
}
