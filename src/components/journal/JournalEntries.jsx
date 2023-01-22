// React
import React, { Fragment, useEffect } from 'react';
// React redux
import { useSelector, useDispatch } from 'react-redux';
// Mis importaciones
import { JournalEntry } from './JournalEntry';
import { loadNotes } from '../../helpers/loadNotes';
import { setNotes } from '../../actions/notes';

export const JournalEntries = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        loadNotes(selector.auth.uid).then(data => {
            dispatch(setNotes(data));
        });
    }, []);
        

    return (
        <Fragment>
            <h3 className='journal__title'>Entries</h3>
            <div className='journal__entries'>
                {
                    selector.notes.notes.map(note => (
                        <JournalEntry key={ note.id } {...note} />
                    ))
                }
            </div>
        </Fragment>
    )
}
