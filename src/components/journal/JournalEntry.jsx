// React
import React from 'react';
// React redux
import { useDispatch } from 'react-redux';
// Moment js
import moment from 'moment';
// Mis importaciones
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, body, date, title, url}) => {
    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(activeNote(id, {body, date, title, url}));
    }

    return (
        <div className='journal__entry pointer' onClick={handleClick}>
            {
                url &&
                <div className='journal__entry-picture' style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}></div>
            }
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>{title}</p>
                <p className='journal__entry-content'>{body}</p>
            </div>
            <div className='journal__entry-date'>
                <p>{ noteDate.format('dddd') } <span>{ noteDate.format('Do') }</span></p>
            </div>
        </div>
    )
}
