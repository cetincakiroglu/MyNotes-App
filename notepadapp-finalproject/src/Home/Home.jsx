import React, { useEffect, useContext } from 'react'
import { UserContext } from './../Context/UserContext'
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InstantNote from '../Widgets/InstantNote/InstantNote'
import NotesWidget from '../Widgets/Notes/NotesWidget'
import NewNoteBtn from '../Widgets/Notes/NewNoteBtn'
import TaskListWidget from '../Widgets/TaskList/TaskListWidget';
import RemindersWidget from '../Widgets/Reminders/RemindersWidget'

const useStyles = makeStyles({
  paper:{
    minHeight:'100vh',
    width:'100%',
    borderRadius:'0',
  },
  message:{
    paddingLeft:'2rem'
  },
  widgetWrapper:{
    padding:'50px'
  },

})
function Home() {
  const { name, setName, surname, setSurname } = useContext(UserContext);
  const classes = useStyles();
  

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo)
    setName(userInfo[0].name)
    setSurname(userInfo[0].surname)
  },[])

    return (
        <>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.message} variant='h1'>Welcome, {name}!</Typography>
            </Grid>
          </Grid>
            {/* Note widgets */}
            <Grid container justify='space-between' className={classes.widgetWrapper}>
              <Grid item xs={4} >
                <NotesWidget />
              </Grid>
              <Grid item> 
                <NewNoteBtn />
              </Grid>
              <Grid item xs={6} >
                <InstantNote />
              </Grid>
            </Grid>
            <Grid container justify='space-between' className={classes.widgetWrapper}>
              <Grid item xs={12} sm={12} md={7}>
                <TaskListWidget />
              </Grid>
              <Grid item xs={12} md={4}>
                <RemindersWidget />
              </Grid>
            </Grid>
        </Paper>
        </>
    )
}

export default Home
