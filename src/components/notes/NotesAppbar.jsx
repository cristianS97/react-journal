// React
import React from 'react';
// React redux
import { useDispatch, useSelector } from 'react-redux';
// Moment
import moment from 'moment';
// Mis importaciones
import { startSaveNote } from '../../actions/notes';

export const NotesAppbar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    const fecha = moment(active.date).format('dddd Do YYYY');

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    return (
        <div className='notes__appbar'>
            <span>{fecha}</span>
            <div>
                <button className='btn'>Picture</button>
                <button onClick={handleSave} className='btn'>Save</button>
            </div>
        </div>
    )
}
