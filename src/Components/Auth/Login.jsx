import React,{ useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Paper, Typography, TextField, Button, SvgIcon } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { AuthContext } from './../Context/AuthContext';
import { FcGoogle } from 'react-icons/fc'


function Login() {
    const { login, saveUserDB, signInWithGoogle, email, password, classes } = useContext(AuthContext);  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();
    const [message, setMessage] = useState('')

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
                        <Grid item xs={8} justify='center'>
                            <Typography variant='body1' align='center'>Don't have an account? <Link to='/Signup' className={classes.link}>Signup</Link></Typography>
                            <Typography variant='body1' align='center'>Forgot your password? <Link to='/Forgot-password' className={classes.link}>Reset</Link></Typography>
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

export default Login
