import React, { useContext, useEffect, useState } from 'react'
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InstantNote from '../Widgets/InstantNote/InstantNote'
import NotesWidget from '../Widgets/Notes/NotesWidget'
import TaskListWidget from '../Widgets/TaskList/TaskListWidget';
import RemindersWidget from '../Widgets/Events/EventsWidget'
import NoteEditor from '../Notes/NoteEditor'
import { NoteContext } from './../Context/NoteContext';
import { AuthContext } from './../Context/AuthContext'
import { TaskContext } from './../Context/TaskContext'
import { EventContext } from './../Context/EventContext'
import VoiceNoteWidget from '../Widgets/VoiceNote/VoiceNoteWidget'
import { db } from '../Auth/firebase'

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
  const {getEvents} = useContext(EventContext);
  const {getTasks} = useContext(TaskContext);
  const {open, setOpen, getNotes } = useContext(NoteContext);
  const {currentUser } = useContext(AuthContext);

  useEffect(() => {
    getTasks();
    getNotes();
    getEvents();
    // eslint-disable-next-line
},[])
 
  return (
        <>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.message} variant='h1'>{`Welcome, ${currentUser.displayName ? currentUser.displayName.split(' ')[0] : currentUser.email.split('@')[0]} !`}</Typography>
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
