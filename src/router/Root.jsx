// React
import React, { useEffect, useState } from 'react';
// React router dom
import { Outlet } from "react-router-dom";
// React redux
import { useDispatch } from 'react-redux';
// Firebase
import { onAuthStateChanged } from "firebase/auth";
// Mis importaciones
import { auth } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { Sidebar } from './Sidebar';

export const Root = () => {
    const dispatch = useDispatch();// Recuperamos el state de redux
    // Variable para esperar a la carga del usuario
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verificamos si el usuario esta autenticado en firebase y lo logeamos en la app
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
            }
            setChecking(false);
        });
    });

    if(checking) {
        return (
            <h1>Espere...</h1>
        );
    }

    return (
        <div className='auth__main'>
            <Sidebar dispatch={dispatch} setIsLoggedIn={setIsLoggedIn} />
            <div className='auth__box-container'>
                <div className='auth__box-item'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
