import React, { createContext, useState } from 'react'

export const NoteContext = createContext();

export const NoteProvider = props => {
    const [ textInput, setTextInput ] = useState('');
    const [ notes, setNotes ] = useState([]); 

    return (
        <NoteContext.Provider value={{textInput: textInput, setTextInput: setTextInput, notes: notes, setNotes: setNotes}}>
            { props.children }
        </NoteContext.Provider>
    )
}