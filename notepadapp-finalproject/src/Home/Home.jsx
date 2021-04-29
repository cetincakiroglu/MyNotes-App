import React, { useEffect, useContext } from 'react'
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InstantNote from '../Widgets/InstantNote/InstantNote'
import NotesWidget from '../Widgets/Notes/NotesWidget'
import NewNoteBtn from '../Widgets/Notes/NewNoteBtn'
import TaskListWidget from '../Widgets/TaskList/TaskListWidget';
import RemindersWidget from '../Widgets/Reminders/RemindersWidget'

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
    paddingLeft:'2rem'
  },
  widgetWrapper:{
    padding:'50px'
  },

})

function Home() {

  const classes = useStyles();
  
  return (
        <>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.message} variant='h1'>Welcome!</Typography>
            </Grid>
          </Grid>
            {/* Note widgets */}
            <Grid container  className={classes.widgetWrapper}>
                <Grid item xs={12} md={10}>
                <NotesWidget />

                </Grid>
                <Grid item xs={12} md={2}>
                <InstantNote />
                </Grid>
            </Grid>
            <Grid container justify='space-between' className={classes.widgetWrapper}>
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <TaskListWidget />
              </Grid>
              {/* <Grid item xs={12} md={4}>
                <RemindersWidget />
              </Grid> */}
            </Grid>
        </Paper>
        </>
    )
}

export default Home
