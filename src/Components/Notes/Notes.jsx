import React, { useContext, useState, useEffect } from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NoteCard from './NoteCard'
import { NoteContext } from './../Context/NoteContext';
import { AuthContext } from './../Context/AuthContext'
import NoteEditor from './NoteEditor'

const useStyles = makeStyles({
    paper:{
        width:'100%',
        minHeight:'100vh',
        borderRadius:'0',
        padding:'2em',
        
    },
    noteContainer:{
        width:'300px',
       
    },
    container:{
        marginTop:'3em',
    
    },
    button:{
        width:'100%',
        height:'100%',
    },
    message:{
        marginLeft:'25px'
    }
})
function Notes() {
    const { open, setOpen, notes, setNotes, openDrawer, notesRef, setDbLoading } = useContext(NoteContext);
    const classes = useStyles();

    return (
        <>
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={2}>
                    <Typography variant='h2' color='primary'>Notes</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button color='primary' variant='contained' className={classes.button} onClick={openDrawer}>
                        New Note
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={5} className={classes.container}>
                    {notes.length > 0 ? notes.map((item,index) => (
                        <>
                            <Grid item xs={3} key={item} className={classes.noteContainer}>
                                <NoteCard item={item} index={index} />
                            </Grid>
                        </>
                    )): (<Typography variant='body2' className={classes.message}>You don't have any note yet. It's a beautiful day to write one!</Typography>)}
            </Grid>
        <NoteEditor open={open} setOpen={setOpen} />
        </Paper>
        </>
    )
}

export default Notes
