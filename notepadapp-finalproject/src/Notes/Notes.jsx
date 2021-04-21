import React, { useContext } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NoteCard from './NoteCard'
import { NoteContext } from './../Context/NoteContext';
import NoteEditor from './NoteEditor'

const useStyles = makeStyles({
    paper:{
        minHeight:'100vh',
        borderRadius:'0'
    },
    noteContainer:{
        display:'flex',
        flexWrap:'wrap'
    }
})
function Notes() {
    const { notes, setNotes } = useContext(NoteContext)
    const classes = useStyles();
    let arr = [1,2,3,4,5,6,7,8,9,10,11,12];
    return (
        <>
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h2'>Notes</Typography>
                </Grid>
            </Grid>
            <Grid container>
            <Grid item xs={12} sm={12} lg={6} className={classes.noteContainer}>
               
                {arr.map((item) => (
                    <>
                        <NoteCard key={item}/>
                    </>
                ))}
               
            </Grid>
            <Grid item xs={12} lg={4}>
                <NoteEditor />
            </Grid>
            </Grid>
        </Paper>
        </>
    )
}

export default Notes
