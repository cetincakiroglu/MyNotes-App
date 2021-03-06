import React,{ useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/Add';
import EventCard from './EventCard'
import EventDrawer from './EventDrawer'
import { EventContext } from '../../Context/EventContext'
import moment from 'moment'
import { useStyles } from './styles'

function EventsWidget() {
    const classes = useStyles();
    const { eventList, setEventList, deleteEvent } = useContext(EventContext);
    const [openInputDrawer, setOpenInputDrawer] = useState(false);
    const history  = useHistory();

    return (
        <>
            <Paper className={classes.paper} elevation={5}>
                <Grid container alignItems='center'>
                    <Grid item className={classes.title}>
                        <Typography variant='h3' color='primary'>Events</Typography>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Tooltip title='New Event'>
                            <IconButton color='primary' onClick={() => setOpenInputDrawer(true)} >
                                <AddRoundedIcon />
                            </IconButton>
                        </Tooltip>  
                   </Grid>
                </Grid>
                    <Grid container spacing={3} justify='center' className={classes.container}>
                        {eventList.length > 0 ? eventList.sort((prev,next) => moment(prev.start.dateTime) > moment(next.start.dateTime)).map((item,index) => (
                            <Grid item xs={12} key={index}>
                                <EventCard item={item} index={index} eventList={eventList} setEventList={setEventList} deleteEvent={deleteEvent} />
                            </Grid>
                        )): (<Typography variant='body1' className={classes.subtitle}>You have 0 upcoming events.</Typography>)}
                    </Grid>
                    <Button color='primary' onClick={() => history.push('/Events')} className={classes.linkButton}>See All</Button>
                    <EventDrawer openInputDrawer={openInputDrawer} setOpenInputDrawer={setOpenInputDrawer} eventList={eventList} setEventList={setEventList} />
            </Paper>
        </>
    )
}

export default EventsWidget
