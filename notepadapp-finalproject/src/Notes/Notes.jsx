import React, { useContext, useState, useEffect } from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NoteCard from './NoteCard'
import { NoteContext } from './../Context/NoteContext';
import NoteEditor from './NoteEditor'

const useStyles = makeStyles({
    paper:{
        width:'100%',
        minHeight:'100vh',
        borderRadius:'0',
        padding:'2em'
    },
    noteContainer:{
        display:'flex',
        flexWrap:'wrap'
    },
    container:{
        marginTop:'3em'
    },
    button:{
        width:'100%',
        height:'100%',
    }
})
function Notes() {
    const { open, setOpen, notes, setNotes, deleteNote, editNote, textInput, setTextInput, categoryList, setCategoryList, title, category } = useContext(NoteContext);
    const classes = useStyles();

   
    useEffect(() => {
        let savedNotes = JSON.parse(localStorage.getItem('Notes'));
        if(savedNotes){
            setNotes([...savedNotes])
        }
    },[])
    return (
        <>
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={2}>
                    <Typography variant='h2'>Notes</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button color='primary' variant='contained' className={classes.button} onClick={() => setOpen(true)}>
                        New Note
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={5} className={classes.container}>
                    {notes ? notes.map((item,index) => (
                        <>
                            <Grid item xs={3} key={item}>
                                <NoteCard item={item} index={index} />
                            </Grid>
                        </>
                    )): ''}
            </Grid>
        <NoteEditor open={open} setOpen={setOpen} />
        </Paper>
        </>
    )
}

export default Notes
