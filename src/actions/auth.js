// Mis importaciones
import { types } from "../types/types";
import { auth, provider } from "../firebase/firebaseConfig";
import { startLoading, finishLoading } from "./ui";
// firebase
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
// Sweet alert
import Swal from 'sweetalert2';

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: { uid, displayName }
});

// Login google
export const startGoogleLogin = () => {
    return dispatch => {
        signInWithPopup(auth, provider).then(data => {
            const user = data.user;
            dispatch(login(user.uid, user.displayName));
        });
    };
}

// Petición asincrona, Login firebase (email, password)
export const startLoginEmailPassword = ( email, password ) => {
    return dispatch => {
        signInWithEmailAndPassword(auth, email, password).then(response => {
            dispatch(startLoading());
            const { user } = response;
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            dispatch(finishLoading());
        });
    };
}

// Como es una tarea asincrona, retornamos un callback
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return dispatch => {
        createUserWithEmailAndPassword(auth, email, password).then(async data => {
            // Se actualiza el nombre del usuario
            await updateProfile(data.user, {displayName: name});
            // Se crea el usuario
            dispatch(login(data.user.uid, data.user.displayName));
        }).catch(error => {
            console.log(error);
        });
    }
}

export const startLogout = () => {
    return async dispatch => {
        await auth.signOut();
        dispatch(logout());
    };
}

export const logout = () => ({
    type: types.logout
});
