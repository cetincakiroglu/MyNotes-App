import React, { useContext } from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import NoteCard from './NoteCard'
import { NoteContext } from './../Context/NoteContext';
import NoteEditor from './NoteEditor'
import { useStyles } from './styles'

function Notes() {
    const { open, setOpen, notes, openDrawer } = useContext(NoteContext);
    const classes = useStyles();

    return (
        <>
        <Paper className={classes.paper}>
            <Grid container style={{padding:'30px'}}>
                <Grid item xs={6} md={2}>
                    <Typography variant='h2' color='primary'>Notes</Typography>
                </Grid>
                <Grid item xs={6} md={1}>
                    <Button color='primary' variant='contained' className={classes.button} onClick={openDrawer}>
                        New Note
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={5} className={classes.container}>
                    {notes.length > 0 ? notes.map((item,index) => (
                        <Grid item xs={12} md={3} key={item.id}>
                            <NoteCard item={item} index={index} />
                        </Grid>
                        
                    )): (<Typography variant='body2' className={classes.message}>You don't have any note yet. It's a beautiful day to write one!</Typography>)}
            </Grid>
        <NoteEditor open={open} setOpen={setOpen} />
        </Paper>
        </>
    )
}

export default Notes
