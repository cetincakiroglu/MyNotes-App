import React, { useContext, useRef, useState } from 'react'
import { NoteContext } from './../../Context/NoteContext';
import { Paper,TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './instantNote.css'


function InstantNote() {
    const [ showBtn, setShowBtn ] = useState(false);
    const useStyles = makeStyles({
        inputField:{
            width:'100%',
            backgroundColor:'#161616',
        },
        header:{
            marginBottom:'1.2em'
        },
        button:{
            position:'absolute',
            bottom:1,
            borderTopLeftRadius:0,
            borderTopRightRadius:0,
            display: showBtn ? 'block' : 'none',
        },
        form:{
           position:'relative'
        }
    })
    const classes = useStyles();
    const { textInput, setTextInput, notes, setNotes, Note } = useContext(NoteContext);
    const formInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = new Note({note: textInput})
        let notesArr = notes;
        notesArr.unshift(newNote);
        formInput.current.value='';
        setNotes([...notesArr]);
        console.log(notes)
        setShowBtn(false)
        localStorage.setItem('Notes',JSON.stringify(notes))
      
    }

    return (
        <>  
            <Paper elevation={5}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField 
                    id='standard-basic' 
                    inputRef={formInput}
                    aria-label='Instant Note' 
                    placeholder="Instant Note" 
                    className={classes.inputField} 
                    multiline 
                    rows={16}
                    variant='outlined'
                    onChange={(e) => {setTextInput(e.target.value) 
                        e.target.value !== '' ? setShowBtn(true) : setShowBtn(false)}}
                    />
                        <Button 
                        variant='contained'
                        type='submit' 
                        color='primary' 
                        className={classes.button}
                        fullWidth>
                            save
                        </Button>
                </form>
            </Paper>
        </>
    )
}

export default InstantNote
