// Firebase
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
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
        dispatch(activeNote(docRef.id, newNote))
        dispatch(refreshNote(note.id, noteToFirestore));
    }
};

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState  ) => {
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

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id: id,
        note: {
            id, ...note
        }
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const state = getState(state => state);
        const {active} = state.notes;

        const fileUrl = await fileUpload(file);
        console.log(fileUrl);
    }
}
