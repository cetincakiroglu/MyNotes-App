import React,{ useState } from 'react'
import { Card, Typography, Divider, Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import DeleteBtn from './Buttons/DeleteBtn'
import GoogleBtn from './Buttons/GoogleBtn'


const useStyles = makeStyles({

    card:{
        padding:'0.5em',
        display:'flex',
        justifyContent:'space-between',
        margin:'0 auto'
    },
    buttonContainer:{
        width:'20%',
        height:'100%',
        display:'flex',
        justifyContent:'space-around'
    }
})
function EventCard({ item,index, deleteEvent, syncGoogle }) {
    const [showBtn, setShowBtn] = useState(false);
    const classes = useStyles();

    return (
        <>
            <Card className={classes.card} onMouseOver={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
                <div>
                    <Typography variant='body2'>{item.date}</Typography>
                    <Typography variant='body2'>{item.time}</Typography>
                </div>
                <div>
                    <Typography variant='h4'>{item.eventName}</Typography>
                    <Typography variant='body1'>{item.eventSummary}</Typography>
                    <Typography variant='body1'>{item.eventLocation}</Typography>
                </div>
                <div className={classes.buttonContainer}>
                    <DeleteBtn showBtn={showBtn} deleteEvent={deleteEvent} index={index}/>
                    <GoogleBtn showBtn={showBtn} syncGoogle={syncGoogle} item={item} index={index}/>
                </div>
            </Card>
        </>
    )
}

export default EventCard
