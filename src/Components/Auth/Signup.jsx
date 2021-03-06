import React,{ useState, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { AuthContext } from './../Context/AuthContext';
import alertify from 'alertifyjs'
import { GoogleLogin } from 'react-google-login'
import { auth, googleProvider } from './../Auth/firebase'
import { EventContext } from './../Context/EventContext';


function Signup() {
    const { getCalendar } = useContext(EventContext);
    const { saveUserDB ,signup, classes, email, password, passwordConfirm, setUserInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    // eslint-disable-next-line
    const [message, setMessage] = useState('')
    const history = useHistory();
    const name = useRef();
    const surname= useRef();

    // TODO: duplicate function (Login.jsx). Distribute by context.
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
            setError(`Failed to log in. Error: ${err}`)
        }
        setLoading(false);
    }

    const handleGoogle = async (response) => {
        setError('');
        setLoading(true)
        try{
            const idToken = response.qc.id_token;
            const user = {...response.profileObj}
            // pass id_token & save user in Firebase
            const creds = await googleProvider.credential(idToken);
            const firebaseCreds = await auth.signInWithCredential(creds);
            saveUserDB(firebaseCreds.user.uid, user);
            setUserInfo(firebaseCreds);
            sessionStorage.setItem('UID', JSON.stringify(firebaseCreds.user.uid))
            // redirect user
            setMessage(`Signed in with Google`)
            history.push('/');
            // activate calendarAPI
            getCalendar();
            
        }catch(err){
            console.error(err);
            setError('Failed to sign in')
            alertify.error(error)
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
              <GoogleLogin 
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        buttonText='Continue with Google'
                        onSuccess={handleGoogle}
                        onFailure={handleGoogle}
                        cookiePolicy={'single_host_origin'}
                    />    
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
