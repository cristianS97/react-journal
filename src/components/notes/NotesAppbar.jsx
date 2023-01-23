// React
import React from 'react';
// React redux
import { useDispatch, useSelector } from 'react-redux';
// Moment
import moment from 'moment';
// Mis importaciones
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppbar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    const fecha = moment(active.date).format('dddd Do YYYY');

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureUpload = () => {
        // console.log('Click upload');
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        // console.log(e);
        const file = e.target.files[0];
        if(file) {
            dispatch(startUploading(file));
        }

    }

    return (
        <div className='notes__appbar'>
            <span>{fecha}</span>
            <input type="file" id="fileSelector" style={{display:'none'}} onChange={handleFileChange} />
            <div>
                <button onClick={handlePictureUpload} className='btn'>Picture</button>
                <button onClick={handleSave} className='btn'>Save</button>
            </div>
        </div>
    )
}
