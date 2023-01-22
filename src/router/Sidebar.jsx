// React
import React from 'react';
// React router dom
import { Link } from "react-router-dom";
// React redux
import { useSelector } from 'react-redux';
// Mis importaciones
import { JournalEntries } from '../components/journal/JournalEntries';
import { startLogout } from '../actions/auth';
import { startNewNote } from '../actions/notes';

export const Sidebar = ({dispatch, setIsLoggedIn}) => {
    const selector = useSelector(state => state);
    // console.log(selector);
    const handleLogout = () => {
        setIsLoggedIn(false);
        dispatch(startLogout());
    }

    const handleAddEntry = () => {
        dispatch(startNewNote());
    }

    return (
        <nav className='auth__box-menu'>
            <ul>
                {selector.auth.name &&
                    <>
                        <li style={{cursor:"default"}}>
                            <Link style={{cursor:"default"}} to='/'>{selector.auth.name}</Link>
                        </li>
                        <li>
                            <Link to='/'>Inicio</Link>
                        </li>
                        <li>
                            <Link onClick={handleAddEntry} to='/'>New entry</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout} to='/'>Logout</Link>
                        </li>
                        <JournalEntries />
                    </>
                }
                {!selector.auth.name &&
                    <>
                        <li>
                            <Link to='/auth/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/auth/register'>Register</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}
