import React, { useEffect, useContext } from 'react'
import { UserContext } from './../Context/UserContext';
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  paper:{
    height:'100vh',
    width:'100%',
    borderRadius:'0',
  },
  message:{
    paddingLeft:'2rem'
  }
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
        </Paper>
        </>
    )
}

export default Home
