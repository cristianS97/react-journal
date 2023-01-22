// React
import React from 'react';
// React router dom
import { Navigate } from "react-router-dom";
// React redux
import { useSelector } from 'react-redux';
// Mis importaciones
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {
    // Recuperamos el state de redux
    const state = useSelector(state => state);
    // Comprobamos si el usuario esta logeado
    if(!state.auth.uid) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <div className='journal__main-content'>
            <main>
                {
                    state.notes.active
                    ?
                    <NoteScreen />
                    :
                    <NothingSelected />
                }
            </main>
        </div>
    )
}
