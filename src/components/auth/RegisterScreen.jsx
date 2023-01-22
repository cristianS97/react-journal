// React
import React, { Fragment } from 'react';
// React router dom
import { Link, Navigate } from "react-router-dom";
// Validator
import validator from 'validator';
// React redux
import { useDispatch, useSelector } from 'react-redux';
// Mis importaciones
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    // Recuperamos el state de redux
    const state = useSelector(state => state);
    // Comprobamos si el usuario esta logeado
    if(state.auth.uid) {
        return <Navigate to="/" />;
    }
    const ui = state.ui;
    const [ values, handleInputChange, reset ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const isFormValid = () => {
        if(values.name.trim().length === 0) {
            dispatch(setError('El nombre es necesario'));
            return false;
        } else if (!validator.isEmail(values.email)) {
            dispatch(setError('El correo no es válido'));
            return false;
        } else if(values.password.trim().length === 0 || values.password2.trim().length === 0) {
            dispatch(setError('Las dos contraseñas son obligatorias'));
            return false;
        } else if(values.password.trim() !== values.password2.trim() || values.password.length < 5) {
            dispatch(setError('Las 2 contraseñas deben ser iguales y de al menos 5 caracteres'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()) {
            console.log('Todo correcto');
            dispatch(startRegisterWithEmailPasswordName(values.email, values.password, values.name));
        }
    }

    return (
        <Fragment>
            <h3 className='auth__title'>Register</h3>

            <form action="" onSubmit={handleRegister}>
                {ui.msgError &&
                    <div className='auth__alert-error'>
                        { ui.msgError }
                    </div>
                }
                <input
                    className='auth__input'
                    type="text"
                    placeholder='Nombre...'
                    name='name'
                    autoComplete='false'
                    onChange={handleInputChange}
                    value={values.name}
                />
                <input
                    className='auth__input'
                    type="text"
                    placeholder='Correo...'
                    name='email'
                    autoComplete='false'
                    onChange={handleInputChange}
                    value={values.email}
                />
                <input
                    className='auth__input'
                    type="password"
                    placeholder='Contraseña...'
                    name='password'
                    onChange={handleInputChange}
                    value={values.password}
                />
                <input
                    className='auth__input'
                    type="password"
                    placeholder='Confirme contraseña...'
                    name='password2'
                    onChange={handleInputChange}
                    value={values.password2}
                />
                <button className='btn btn-primary btn-block mb-5' type='submit'>Register account</button>

                <Link className='link' to='/auth/login'>Already register?</Link>
            </form>
        </Fragment>
    )
}
