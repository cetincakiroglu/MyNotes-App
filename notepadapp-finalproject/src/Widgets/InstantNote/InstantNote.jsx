import React, { useContext, useRef, useState } from 'react'
import { NoteContext } from './../../Context/NoteContext';
import { Paper,TextField, Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid';
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
            display: showBtn ? 'block' : 'none',
            margin:'10px auto',
            padding:'10px 50px'
        },
        form:{
            height:'300px'
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
            <Grid container>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant='h3'>Instant Note</Typography>
                </Grid>
            </Grid>
            <Paper elevation={5}>
                <form onSubmit={handleSubmit} className={classes.form}>
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
