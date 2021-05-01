import React, { useContext } from 'react'
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InstantNote from '../Widgets/InstantNote/InstantNote'
import NotesWidget from '../Widgets/Notes/NotesWidget'
import TaskListWidget from '../Widgets/TaskList/TaskListWidget';
import RemindersWidget from '../Widgets/Events/EventsWidget'
import NoteEditor from '../Notes/NoteEditor'
import { NoteContext } from './../Context/NoteContext';
import VoiceNoteWidget from '../Widgets/VoiceNote/VoiceNoteWidget'

const useStyles = makeStyles({
  paper:{
    height:'100vh',
    width:'100%',
    borderRadius:'0',
    overflowX:'hidden',
    overflowY:'scroll',
    scrollbarWidth:'none'
  },
  message:{
    margin:'20px 50px'
  },
  widgetWrapper:{
    padding:'50px'
  },

})

function Home() {

  const classes = useStyles();
  const {open, setOpen} = useContext(NoteContext);
  
  return (
        <>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.message} variant='h1'>Welcome!</Typography>
            </Grid>
          </Grid>
            {/* Note widgets */}
            <Grid container spacing={3} className={classes.widgetWrapper} justify='space-between'>
                <Grid item xs={12} md={5}>
                  <InstantNote />
                </Grid>
                {window.SpeechRecognition || window.webkitSpeechRecognition ? (<Grid item xs={5}><VoiceNoteWidget /></Grid>) : (<></>)}
            </Grid>
            <Grid container spacing={3} className={classes.widgetWrapper}>
                <Grid item xs={12}>
                  <NotesWidget setOpen={setOpen}/>
                </Grid>
              <NoteEditor open={open} setOpen={setOpen}/>
            </Grid>
            <Grid container spacing={3} className={classes.widgetWrapper}>
              <Grid item xs={12}>
                <TaskListWidget />
              </Grid>
            </Grid>
            <Grid container className={classes.widgetWrapper}>
              <Grid item xs={12} md={6}>
                <RemindersWidget />
              </Grid>
            </Grid>
        </Paper>
        </>
    )
}

export default Home
