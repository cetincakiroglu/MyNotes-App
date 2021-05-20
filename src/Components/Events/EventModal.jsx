import React, { useContext, useState } from 'react'
import { EventContext } from '../Context/EventContext'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogActions, DialogContent,  DialogTitle, Button, Typography,Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import moment from 'moment'

const useStyles = makeStyles({

    link:{
        textDecoration:'underline',
        color:'#76bc01'
    }
  });

function EventModal(props) {
    const { closeModal, showModal, eventId, eventList } = props;
    const { gapi, eventsRef } = useContext(EventContext);
    // eslint-disable-next-line
    const [message, setMessage] = useState('');
    const [error, setError] = useState('')
    const classes = useStyles();

    const removeEvent = (event) => {
        const { id, description } = event;
        // eslint-disable-next-line
        if(confirm(`Are you sure to delete ${description}, this action cannot be undone.`)){
            gapi.load('client', () => {
                gapi.client.init({
                    apiKey:process.env.REACT_APP_GOOGLE_API_KEY,
                    clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                    scope: "https://www.googleapis.com/auth/calendar",
                });
                gapi.client.load('calendar', 'v3', () => {
                    var request = gapi.client.calendar.events.delete({
                        'calendarId': 'primary',
                        'eventId': id,
                    });
                    request.execute((res) => {
                        if(res.error || res === false){
                           setError(res.error)
                        }else {
                            setMessage('Event Deleted')
                        }
                    })
                })
            })
            eventsRef.doc(id.split('_').splice(0,1).join(''))
            .delete()
            .catch(err => {
                console.error(err)
                setError(`Failed to delete event. Error: ${err}`)
            })
        }
        closeModal();
    }
    return (
        <>
            <Dialog
            open={showModal}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            </DialogTitle>
            {error && <Alert severity='error'><AlertTitle>Error</AlertTitle>{error}</Alert>}
            {eventList.filter(item => item.id === eventId.slice(0,1).join()).map(event => (
            <TableContainer component={DialogContent} key={event.id}>
                <Typography align='center' variant='h2' color='primary'>{event.description}</Typography>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    <TableRow>
                        <TableCell>Start Time:</TableCell>
                        <TableCell align="right">{moment(event.start.dateTime).format('MMMM Do, h:mm A')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>End Time</TableCell>
                        <TableCell align="right">{moment(event.end.dateTime).format('MMMM Do, h:mm A')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Time Zone:</TableCell>
                        <TableCell align="right">{event.start.timeZone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Location:</TableCell>
                        <TableCell align="right">{event.location}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Organizer:</TableCell>
                        <TableCell align="right">{event.organizer.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Summary:</TableCell>
                        <TableCell align="right" dangerouslySetInnerHTML={{__html:event.summary}}/>
                    </TableRow>
                    <TableRow>
                        <TableCell>Event URL:</TableCell>
                        <TableCell align="right">
                            <Link to={{ pathname: event.htmlLink }} target="_blank" color='primary' className={classes.link}> See it on Google Calendar</Link>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            ))}
            <DialogActions>
            <Button onClick={() => removeEvent()} color="secondary">
                Delete
            </Button>
            <Button onClick={closeModal} color="primary">
                Close
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default EventModal
