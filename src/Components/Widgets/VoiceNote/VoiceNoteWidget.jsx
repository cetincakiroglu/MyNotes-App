import React, { useEffect , useState, useContext } from 'react'
import { Grid, Paper, IconButton, Tooltip, Button, Card, CardContent, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import { NoteContext } from '../../Context/NoteContext'
import { AuthContext } from '../../Context/AuthContext'
import { v4 as uuidv4 } from 'uuid'
import alertify from 'alertifyjs'

// to check if browser supports feature
try{
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    var mic = SpeechRecognition ? new SpeechRecognition() : null
    
    mic.continuous = true
    mic.interimResults = true
    mic.lang = 'en-US'

}catch(err){
    console.log(err)
}

function VoiceNoteWidget() {
    const [isListening, setIsListening] = useState(false)
    const [voiceNote, setVoiceNote] = useState('')
    const { notesRef } = useContext(NoteContext);
    const { currentUser } = useContext(AuthContext)
    const [ showBtn, setShowBtn ] = useState(false);
    const classes = useStyles();
    
    const handleSave = () => {
       // note object
        const newNote = {
            created    :new Date(),
            id         : uuidv4(),
            ownerID    : currentUser ? currentUser.uid : 'unknown',
            ownerEmail : currentUser ? currentUser.uid : 'unknown',
            date       : new Date().toDateString(),
            title      : 'Voice Note',
            note       : voiceNote,
            categories : [],
        }
        // update db
        notesRef.doc(newNote.id)
                .set(newNote)
                .catch(err => alertify.error(`Failed to create voice note. Error: ${err}`));
         
        setVoiceNote('');
        setShowBtn(false)
        alertify.success('Voice note created.')
    }
    
    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                setShowBtn(true)
            }
        }
        mic.onresult = event => {
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            setVoiceNote(transcript)
    
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }
    
    
    useEffect(() => {
      handleListen();
      // eslint-disable-next-line
    }, [isListening])
    
    return (
        <>  
        
            <Paper className={classes.paper} elevation={5}>
                <Grid container alignItems='center' className={classes.title}>
                    <Grid item xs={5} >
                        <Typography variant='h3' color='primary'>Voice Note</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title='Start Recording'>
                            <IconButton color={isListening ? 'secondary' : 'primary'} onClick={() => setIsListening(prevState => !prevState)}>
                                <MicRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='body2'>{voiceNote}</Typography>
                    </CardContent>
                </Card>
                <Button onClick={() => handleSave()} color='primary' variant='contained' className={showBtn ? classes.buttonActive : classes.buttonDisabled}>Save</Button>
            </Paper>
       
        </>
    )
}

export default VoiceNoteWidget
