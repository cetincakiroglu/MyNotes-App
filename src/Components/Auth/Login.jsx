import React,{ useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { AuthContext } from './../Context/AuthContext';

function Login() {
    const { login, saveUserDB, currentUser, setCurrentUser, signInWithGoogle, email, password, classes, error, setError, userID, setUserID } = useContext(AuthContext);  
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory();

    //TODO: Add user feedback
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            await login(email.current.value, password.current.value);
            history.push('/')
            // setUserInfo(email.current.value);
        }catch(err){
            console.log(err)
            setError('Failed to log in')
        }
        setLoading(false)
    }

    const handleGoogle = async () => {
        try{
            setError('');
            setLoading(true)
            // get user credentials
            const cred = await signInWithGoogle();
            // setUserID(cred.user.uid)
            setCurrentUser(cred.user)
            
           
            //save user to db
            saveUserDB(cred.user.uid, {name: cred.user.displayName, email: cred.user.email})
            // TODO: replace sessionStorage with cookies.
            sessionStorage.setItem('UID', JSON.stringify(cred.user.uid))
            //redirect user
            history.push('/')
            setMessage('Signed in with Google')
            
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
                <form onSubmit={handleSubmit}>
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
                            {/* TODO: Google is disabled due to an auth bug, fix this */}
                            <Button variant='outlined' color='primary' onClick={handleGoogle}>Sign in with Google</Button>
                            <Typography variant='body2'>Don't have an account? <Link to='/Signup' className={classes.link}>Signup</Link></Typography>
                            <Typography variant='body1'>Forgot your password? <Link to='/Forgot-password' className={classes.link}>Reset</Link></Typography>
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

export default Login
