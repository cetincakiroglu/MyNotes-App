import React, { useContext, useRef, useState } from 'react'
import { NoteContext } from './../../Context/NoteContext';
import { AuthContext } from './../../Context/AuthContext';
import { Paper,TextField, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import './instantNote.css'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import alertify from 'alertifyjs'


function InstantNote() {
    const [ showBtn, setShowBtn ] = useState(false);
    const classes = useStyles();
    const { textInput, setTextInput, notesRef } = useContext(NoteContext);
    const { currentUser } = useContext(AuthContext)
    const formInput = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            id         : uuidv4(),
            created    : new Date(),
            ownerID    : currentUser ? currentUser.uid : 'unknown',
            ownerEmail : currentUser ? currentUser.email : 'unknown',
            date       : moment().format(),
            title      : 'Untitled',
            note       : textInput,
            categories : [],
        };
        console.log(newNote)
        // update db
        notesRef.doc(newNote.id)
        .set(newNote)
        .catch(err => console.log(err));
        
        formInput.current.value ='';
        setTextInput('')
        setShowBtn(false)
        alertify.success('Note Saved.')
    }

    // conditional styling
    const btnStyles = makeStyles({
        button:{
            position:'absolute',
            bottom:1,
            borderTopLeftRadius:0,
            borderTopRightRadius:0,
            display: showBtn ? 'block' : 'none',
        }
    })
    const btnClasses = btnStyles();
    const handleChange = (e) => {
        setTextInput(e.target.value);
        e.target.value !== '' ? setShowBtn(true) : setShowBtn(false);

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
                    onChange={handleChange}
                    />
                        <Button 
                        variant='contained'
                        type='submit' 
                        color='primary' 
                        className={btnClasses.button}
                        fullWidth>
                            save
                        </Button>
                </form>
            </Paper>
        </>
    )
}

export default InstantNote
