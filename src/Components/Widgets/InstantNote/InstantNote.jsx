import React, { useContext, useRef, useState } from 'react'
import { NoteContext } from './../../Context/NoteContext';
import { AuthContext } from './../../Context/AuthContext';
import { Paper,TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './instantNote.css'
import { v4 as uuidv4 } from 'uuid'


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
    const { textInput, setTextInput, notesRef } = useContext(NoteContext);
    const { currentUser, userID } = useContext(AuthContext)
    const formInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            id : uuidv4(),
            ownerID : userID ? userID : 'unknown',
            ownerEmail : currentUser.email ? currentUser.email : 'unknown',
            date : new Date().toDateString(),
            title : 'Untitled',
            note : textInput,
            categories : [],
        };
        // update db
        notesRef.doc(newNote.id)
           .set(newNote)
           .catch(err => console.log(err));
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
