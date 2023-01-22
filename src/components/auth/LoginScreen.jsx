// React
import React, { Fragment } from 'react';
// React router dom
import { Link, Navigate } from "react-router-dom";
// React redux
import { useDispatch, useSelector } from 'react-redux';
// Mis importaciones
import { useForm } from '../../hooks/useForm';
import { login, startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    // Recuperamos el state de redux
    const state = useSelector(state => state);
    const [ values, handleInputChange, reset ] = useForm({
        email: '',
        password: ''
    });

    // Comprobamos si el usuario esta logeado
    if(state.auth.uid) {
        return <Navigate to="/" />;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // dispatch(login(7891011, 'Pepe'));
        dispatch(startLoginEmailPassword(values.email, values.password));
    }

    const handleGoogleLogin = () => {
        // dispatch(login());
        dispatch(startGoogleLogin());
    }

    return (
        <Fragment>
            <h3 className='auth__title'>Login</h3>

            <form action="" onSubmit={ handleLogin }>
                <input
                    className='auth__input'
                    type="email"
                    placeholder='Correo...'
                    name='email'
                    autoComplete='false'
                    onChange={ handleInputChange }
                    value={ values.email }
                />
                <input
                    className='auth__input'
                    type="password"
                    placeholder='Contraseña...'
                    name='password'
                    onChange={ handleInputChange }
                    value={ values.password }
                />
                <button disabled={state.ui.loading} className='btn btn-primary btn-block' type='submit'>Login</button>

                <div className='auth__social-networks'>
                    <p>Login with Social Networks</p>

                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className='link' to='/auth/register'>Create new account</Link>
            </form>
        </Fragment>
    )
}
