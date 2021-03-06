import React, { useContext, useEffect } from 'react'
import '../Editor/editor.css'
import { Typography, Paper, Grid, IconButton, Hidden } from '@material-ui/core'
import InstantNote from '../Widgets/InstantNote/InstantNote'
import NotesWidget from '../Widgets/Notes/NotesWidget'
import TaskListWidget from '../Widgets/TaskList/TaskListWidget';
import RemindersWidget from '../Widgets/Events/EventsWidget'
import NoteEditor from '../Notes/NoteEditor'
import NewTaskDrawer from './../Tasks/NewTaskDrawer';
import { NoteContext } from './../Context/NoteContext';
import { AuthContext } from './../Context/AuthContext'
import { TaskContext } from './../Context/TaskContext'
import { EventContext } from './../Context/EventContext'
import VoiceNoteWidget from '../Widgets/VoiceNote/VoiceNoteWidget'
import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment'
import { useStyles } from './styles'

function Home() {
  const classes = useStyles();
  const { getEvents } = useContext(EventContext);
  const { getTasks } = useContext(TaskContext);
  const { open, setOpen, getNotes, mobileOpen, setMobileOpen } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);
  
  // mobile menu handler
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
 const date = new Date();
 
  useEffect(() => {
    getTasks();
    getNotes();
    getEvents();
    // eslint-disable-next-line
  },[])
  
  return (
        <>
        <Paper className={classes.paper}>
            <Hidden  smUp implementation='css' className={classes.icon} >
              <IconButton color='primary' onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          <Grid container className={classes.header}>
            <Grid item xs={12} md={9}>
              <Typography className={classes.message} variant='h1'>{`Welcome, ${currentUser.displayName ? currentUser.displayName.split(' ')[0] : currentUser.email.split('@')[0]} !`}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
            <Typography variant='h1' className={classes.date} align='center'>{moment(date).format('h:mm A, MMMM Do')}</Typography>
              <Typography variant='h1' className={classes.date} align='center'>{date.getFullYear()}</Typography>
            </Grid>
          </Grid>
            <Grid container spacing={5} className={classes.widgetWrapper} justify='space-between'>
                <Grid item xs={12} md={5}>
                  <InstantNote />
                </Grid>
                {window.SpeechRecognition || window.webkitSpeechRecognition ? (<Grid item xs={12} md={5}><VoiceNoteWidget /></Grid>) : (<></>)}
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
              <NewTaskDrawer />
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