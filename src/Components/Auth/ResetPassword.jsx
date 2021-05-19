import React,{ useState, useContext } from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { AuthContext } from './../Context/AuthContext';


function ResetPassword() {
    
    const { resetPassword, email, setError, classes } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line
    const [message, setMessage] = useState('')
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setError('')
            setLoading(true)
            await resetPassword(email.current.value);
            setMessage('Check your email for further instructions')
        }catch(err){
            console.log(err);
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <>
        <Paper className={classes.paper}>
          <Grid container justify='center'>
              <Grid item xs={12} md={6} className={classes.formWrapper}>
                <Paper className={classes.form} elevation={5}>
                <form onSubmit={handleSubmit}>
                <Typography variant='h1' style={{textAlign:'center', marginBottom:'1em'}}>Reset Password</Typography>
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
                            <Button variant='contained' color='primary' type='submit' className={classes.button} disabled={loading} >Reset</Button>
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

export default ResetPassword
