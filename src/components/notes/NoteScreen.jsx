// React
import React, { useEffect, useRef } from 'react';
// react redux
import { useSelector, useDispatch } from 'react-redux';
// Mis importaciones
import { NotesAppbar } from './NotesAppbar';
import { useForm } from '../../hooks/useForm';
import { activeNote, deleteNote } from '../../actions/notes';

export const NoteScreen = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const { active } = selector.notes;
    const [values, handleInputChange, reset] = useForm(active);
    const activeId = useRef(active.id);

    useEffect(() => {
        if(active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id;
        }
    }, [active, reset]);

    useEffect(() => {
        dispatch(activeNote(values.id, {...values}));
    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(deleteNote());
    }

    return (
        <div className='notes__main-content'>
            <NotesAppbar />

            <div className='notes__content'>
                <input
                    className='notes__title-input'
                    type="text"
                    autoComplete='off'
                    placeholder='Some awesome title'
                    name='title'
                    value={values.title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='What happened today?'
                    className='notes__textarea'
                    name='body'
                    value={values.body}
                    onChange={handleInputChange}
                ></textarea>
                {values.url &&
                    <div className='notes__image'>
                        <img src={values.url} alt="Imagen" />
                    </div>
                }
            </div>
            <button onClick={handleDelete}>Borrar</button>
        </div>
    )
}
