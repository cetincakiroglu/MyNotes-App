import React from 'react'
import { Paper, Grid, Typography, IconButton, Link, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
  paper:{
    width:'100%',
    minHeight:'100vh',
    borderRadius:'0',
  },
  textContent:{
    marginBottom:'50px'
  },
  container:{
    padding:'25px'
  },
  iconContainer:{
    display:'flex',
  },
  title:{
    marginBottom:'50px',
    alignSelf:'flex-start'
  },
  icon:{
    transform:'scale(2)'
  }
})

function Info() {
  const classes = useStyles();

    return (
        <>
        <Paper className={classes.paper}>
          <Grid container className={classes.container} alignContent='center' direction='column'>
            <Grid item xs={6} className={classes.title}>
              <Typography variant='h3' color='primary'>About Us</Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography className={classes.textContent} variant='body2'>MyNotes is a hybrid note taking app offers various features.</Typography>
              <Typography className={classes.textContent} variant='body2'>Users can take notes with advanced editor, voice notes, create task lists, events and sync them with Google Calendar.</Typography>
              <Typography className={classes.textContent} variant='body2'>MyNotes is developed by Front End Developer, Çetin Çakıroğlu. As a graduation project of SHA Front End Development Bootcamp.</Typography>
            </Grid>
            <Grid item xs={6} className={classes.title}>
              <Typography variant='h3' color='primary'>Contact</Typography>
            </Grid>
            <Grid className={classes.iconContainer}>
            <Grid item xs={4}>
              <Tooltip title='GitHub'>
                <Link href="https://github.com/cetincakiroglu" target='blank'>
                  <IconButton className={classes.icon}>
                    <GitHubIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              <Tooltip title='Email'>
                <Link href='mailto:cakiroglucetinn@gmail.com'>
                  <IconButton className={classes.icon}>
                    <MailIcon />
                  </IconButton>
                </Link>
              </Tooltip>
     
            </Grid>
            <Grid item xs={4}>
              <Tooltip title='LinkedIn'>
                <Link href="https://www.linkedin.com/in/cakiroglu-cetin/" target='blank'>
                  <IconButton className={classes.icon}>
                    <LinkedInIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Grid>
            </Grid>
          </Grid>
        </Paper>
        </>
    )
}

export default Info
