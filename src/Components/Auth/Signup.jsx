import React,{ useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Paper, TextField, Button, Typography, SvgIcon } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from './../Context/AuthContext';

function Signup() {

    const { saveUserDB ,signup, signInWithGoogle, currentUser, classes, email, password, passwordConfirm } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
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
            const cred = await signup(email.current.value,password.current.value)
            //save user to db
            saveUserDB(cred.user.uid, {name: cred.user.displayName, email: cred.user.email})           
            // redirect user
            history.push('/')

        }catch(err){
            console.log(err);
            setError('Failed to log in')
        }
        setLoading(false);
    }

    const handleGoogle = async () => {
        setError('')
        setLoading(true)
        try{
            // get user credentials
            const cred = await signInWithGoogle();
            //save user to db
            saveUserDB(cred.user.uid, {name: cred.user.displayName, email: cred.user.email})
            // TODO: replace sessionStorage with cookies.
            sessionStorage.setItem('UID', JSON.stringify(cred.user.uid))
            //redirect user
            setMessage(`Signed in with Google as`)
            history.push('/')
        }catch(err){
            console.log(err);
            setError('Failed to sign in')
        }   
        setLoading(false);
    }

    return (
        <> 
        <Paper className={classes.paper}>
        <Grid container justify='center'>
            <Grid item xs={12} md={6} className={classes.formWrapper}>
              <Paper className={classes.form} elevation={5}>
              {error && <Alert severity='error'><AlertTitle>Error</AlertTitle>{error}</Alert>}
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
                        
                          <Typography variant='body2'>Already have an account? <Link to='/Login' className={classes.link}>Login</Link></Typography>
                      </Grid>
                  </Grid>
              </form>
              <Paper elevation={5}  className={classes.googleCard} onClick={handleGoogle}>
                        <Typography color='primary'>Continue with</Typography>
                        <SvgIcon viewBox='0'>
                                <FcGoogle />
                        </SvgIcon>
                </Paper>
              </Paper>
            </Grid>
            <Grid item xs={false} md={6} className={classes.bgWrapper}></Grid>
        </Grid>
      </Paper>
        </>
    )
}

export default Signup
