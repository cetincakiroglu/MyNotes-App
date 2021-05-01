import React, { useEffect , useState, useContext } from 'react'
import { Grid, Paper, IconButton, Tooltip, Button, Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import { NoteContext } from '../../Context/NoteContext'


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
    const { Note, notes, setNotes } = useContext(NoteContext);
    const [ showBtn, setShowBtn ] = useState(false);

    
    const useStyles = makeStyles({
        buttonDisabled:{
            display:'none',
        },
        buttonActive:{
            display:'block',
            margin:'25px auto',
        },
        paper:{
            height:'410px',
            backgroundColor:'#161616',
            padding:'0 20px'
            
        },
        card:{
            height:'60%',
            margin:'15px 0',
            backgroundColor:'#242424'
        },
        title:{
            paddingTop:'15px'
        }
    })
    const classes = useStyles();
    
    const handleSave = () => {
       
        const newNote = new Note({title:'Voice Note', note: voiceNote });
        let notesArr = notes;
        notesArr.unshift(newNote);
        setNotes([...notesArr]);

        localStorage.setItem('Notes', JSON.stringify(notes))
         
        setVoiceNote('');
        setShowBtn(false)
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
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }
        
        mic.onresult = event => {
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            setVoiceNote(transcript)
            setShowBtn(true)

            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }
    
    
    useEffect(() => {
      handleListen()
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
                <Button onClick={handleSave} color='primary' variant='contained' className={showBtn ? classes.buttonActive : classes.buttonDisabled}>Save</Button>
            </Paper>
       
        </>
    )
}

export default VoiceNoteWidget
