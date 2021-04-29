import React,{ useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button, TextField, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  form:{
     display:'flex',
     flexDirection:'column',
     justifyContent:'center',
     margin: '0 auto'
  },
  grid:{
      margin:'5% auto',
  },
  paper:{
      padding:'20px',
      margin:'20% auto'
  },
  div:{
      margin:'0 auto'
  }
})

function Login() {
  const classes = useStyles();
  const history = useHistory();

  function User(obj){
      this.name = obj.username;
      this.surname = obj.lastName;
  }

  const handleSubmit = (e) => {
      e.preventDefault();
    
      if(name && surname ){
          const newUser = new User({username: name, lastName: surname})
          let arr = [newUser];
          localStorage.setItem('userInfo',JSON.stringify(arr))
          history.push('/Home')
      } else{
          alert('please enter a valid name and surname');
      }
  }

    return (
        <>
         <Paper className={classes.paper}>
                <Grid container justify='center' alignItems='center'>
                    <Grid item xs={12} className={classes.grid}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                            <div className={classes.div}>
                            <TextField label="Name" variant="outlined" value={name} onChange={(e)=>
                                setName(e.target.value)}
                                required/>

                            <TextField label="Surname" variant="outlined" value={surname} onChange={(e)=>
                                setSurname(e.target.value)}
                                required />
                           
                            </div>

                            <Grid item xs={4} className={classes.grid}>
                                <Button variant='contained' color='primary' type='submit'>Submit</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Login
