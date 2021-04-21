import React, { useContext, useRef, useState, useEffect } from 'react'
import { NoteContext } from './../Context/NoteContext';
import { Paper,TextField, Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid';
import './instantNote.css'


function InstantNote() {
    const [ showBtn, setShowBtn ] = useState(false);
    const useStyles = makeStyles({
        inputField:{
            width:'100%',
            backgroundColor:'#3A3A3A',
        },
        header:{
            marginBottom:'30px'
        },
        button:{
            display: showBtn ? 'block' : 'none',
            margin:'10px auto',
            padding:'10px 50px'
        }
    })
    const classes = useStyles();
    const { textInput, setTextInput, notes, setNotes } = useContext(NoteContext);
    const formInput = useRef();

    function Note(obj){
        this.id = uuidv4();
        this.date = new Date().toDateString();
        this.title = 'Untitled Note';
        this.text = obj.textInput;
        this.tags = null;
        this.flags = null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = new Note({textInput: textInput})
        notes.push(newNote);
        formInput.current.value='';
        console.log(notes)
        setShowBtn(false)
        localStorage.setItem('Notes',JSON.stringify(notes))
        //TODO: update storage to store new note
    }


    return (
        <>  
                <Grid container>
                    <Grid item xs={12} className={classes.header}>
                        <Typography variant='h3'>Instant Note</Typography>
                    </Grid>
                </Grid>
            <Paper elevation={5}>
                <form onSubmit={handleSubmit}>
                    <TextField 
                    id='standard-basic' 
                    inputRef={formInput}
                    aria-label='Instant Note' 
                    placeholder="What's on your mind ?" 
                    className={classes.inputField} 
                    multiline 
                    rows={13} 
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
