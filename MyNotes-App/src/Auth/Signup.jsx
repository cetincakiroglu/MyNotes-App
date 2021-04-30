import React,{ useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import { AuthContext } from './../Context/AuthContext';

function Signup() {

    const { signup, currentUser, classes, email, password, passwordConfirm, error, setError, userInfo, setUserInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const name = useRef();
    const surname= useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.current.value !== passwordConfirm.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('');
            setLoading(true);
            await signup(email.current.value, password.current.value)
            history.push('/')
            setUserInfo(email.current.value)
          
        }catch(err){
            console.log(err);
            setError('Failed to log in')
        }
        setLoading(false);
    }

    return (
        <> 
        <Paper className={classes.paper}>
        <Grid container justify='center'>
            <Grid item xs={12} md={6} className={classes.formWrapper}>
              <Paper className={classes.form} elevation={5}>
              <form onSubmit={handleSubmit}>
              <Typography variant='h1' style={{textAlign:'center', marginBottom:'1em'}}>Sign Up</Typography>
                  <Grid container justify='center' alignContent='center' direction='column' spacing={5}>
                      <Grid item xs={8}>
                          <TextField 
                          inputRef={name}
                          type='text'
                          id='name'
                          label='name'
                          variant='outlined'
                          required
                          />
                      </Grid>
                      <Grid item xs={8}>
                          <TextField 
                          inputRef={surname}
                          type='text'
                          id='surname'
                          label='surname'
                          variant='outlined'
                          required
                          />
                      </Grid>
                      <Grid item xs={8}>
                          <TextField 
                          inputRef={email}
                          type='text'
                          id='email'
                          label='email'
                          variant='outlined'
                          required
                          />
                      </Grid>
                      <Grid item xs={8}>
                          <TextField 
                          inputRef={password}
                          type='password'
                          id='password'
                          label='password'
                          variant='outlined'
                          required
                          />
                      </Grid>
                      <Grid item xs={8}>
                          <TextField 
                          inputRef={passwordConfirm}
                          type='password'
                          id='password-confirm'
                          label='password'
                          variant='outlined'
                          required
                          />
                      </Grid>
                          <Button variant='contained' color='primary' type='submit' className={classes.button} disabled={loading}>Sign Up</Button>
                      <Grid item xs={8}>
                          {/* <Typography variant='body2' style={{textAlign:'center', margin:'1em 0'}}>Sign in with <Link to='/Signup' className={classes.link}>Google</Link></Typography> */}
                          <Typography variant='body2'>Already have an account? <Link to='/Login' className={classes.link}>Login</Link></Typography>
                      </Grid>
                  </Grid>
              </form>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.bgWrapper}></Grid>
        </Grid>
      </Paper>
        </>
    )
}

export default Signup
