import React,{ useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { AuthContext } from './../Context/AuthContext';
import {GoogleLogin} from 'react-google-login'
import { auth, googleProvider } from './../Auth/firebase'
import { EventContext } from './../Context/EventContext';

function Login() {
    const { login, saveUserDB, email, password, classes, setUserInfo } = useContext(AuthContext);
    const { getCalendar } = useContext(EventContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();
    // eslint-disable-next-line
    const [message, setMessage] = useState('')

    // email & pw login
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            await login(email.current.value, password.current.value);
            setMessage('Login successful')
            history.push('/')
        }catch(err){
            setError(`Failed to log in ${err}`)
        }
        setLoading(false)
    }

    // Google Sign In w/ react-google-login
    const responseGoogle = async (response) => {
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
                <form onSubmit={handleSubmit} >
                <Typography variant='h1' style={{textAlign:'center', marginBottom:'1em'}}>Login</Typography>
                    <Grid container justify='center' alignContent='center' direction='column' spacing={5}>
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
                            <Button variant='contained' color='primary' type='submit' className={classes.button} disabled={loading} >Login</Button>
                        <Grid item xs={8}>
                            <Typography variant='body1' align='center'>Don't have an account? <Link to='/Signup' className={classes.link}>Signup</Link></Typography>
                            <Typography variant='body1' align='center'>Forgot your password? <Link to='/Forgot-password' className={classes.link}>Reset</Link></Typography>
                        </Grid>
                    </Grid>
                </form>
                <Paper elevation={5}  className={classes.googleCard}>
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        buttonText='Continue with Google'
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
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

export default Login
