import './input.css' // modifies & overrides react-datetime css
import "react-datetime/css/react-datetime.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import DateTime from 'react-datetime'
import React, { useContext, useState } from 'react'
import { Paper, TextField, IconButton, Tooltip, Button, Drawer, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { EventContext } from '../../Context/EventContext'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import moment from 'moment'

const useStyles = makeStyles({
    button:{
        width:'100px',
        margin:'10px auto'
    },
    paper:{
        height:'100vh',
        backgroundColor:'#161616',
        margin:'auto',
    },
    date:{
        width:'100%',
    },
    summary:{
        width:'100%'
    }
})

function EventDrawer (props) {
    const { openInputDrawer, setOpenInputDrawer } = props;
    const {width} = useWindowDimensions();
    const {eventName, startDate, setStartDate, endDate, setEndDate, eventLocation, insertEvent, summary, setSummary } = useContext(EventContext);

    // conditional styles
    const formStyles = makeStyles({
        form:{
            padding:'0em 2em',
            width: width > 600 ? '30vw' : '80vw',
            minHeight:'600px',
        },
        inputWrapper:{
            marginTop:'30px',
            height: width > 600 ? 'auto' : '300px'
        },
    })
    
    const formClasses = formStyles();
    const classes = useStyles();

    // focus next input on enter
    const handleEnter = (e) => {
        if(e.keyCode === 13) {
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index+1].focus();
            e.preventDefault();
        }
    }

    // validate date
    const yesterday = moment().subtract(1,'day');
    const checkDate = (current) => {
        return current.isAfter(yesterday)
    }

    // Editor Handler
    const handleChange = (e,editor) => {
        const data = editor.getData();
        setSummary(data);
    }

    return (
        <>
         <div>
             <Drawer open={openInputDrawer} anchor='right' onClose={()=> setOpenInputDrawer(false)} >
                 <Paper elevation={5} className={classes.paper}>
                     <Tooltip title='Close'>
                         <IconButton color='secondary' onClick={()=> setOpenInputDrawer(false)}>
                             <ArrowForwardIosRoundedIcon />
                         </IconButton>
                     </Tooltip>
                     <form onSubmit={insertEvent} className={formClasses.form}>
                         <Grid container className={formClasses.inputWrapper} spacing={4} alignItems='center'>
                            <Grid item xs={12} md={6}>
                                <TextField
                                onKeyDown={handleEnter}
                                id='event-name' 
                                label='Event Name' type='text'
                                inputRef={eventName} required 
                                className={classes.date}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    onKeyDown={handleEnter}
                                    id='event-location' type='text'
                                    label='Event Location' 
                                    inputRef={eventLocation} 
                                    className={classes.date}
                                />
                            </Grid>
                            {/* start date */}
                          
                                <Grid item xs={6} md={6}>
                                    <Typography variant='body1'>Start Date</Typography>
                                </Grid>
                               <Grid item xs={6} md={6}>
                                   <DateTime 
                                   value={startDate}
                                   onChange={val => setStartDate(val)}
                                   timeFormat={true}
                                   dateFormat={true}
                                   isValidDate={checkDate}
                                   />
                               </Grid>
                                    
                                <Grid item xs={6} md={6}>
                                    <Typography variant='body1'>End Date</Typography>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                <DateTime 
                                   value={endDate}
                                   onChange={val => setEndDate(val)}
                                   timeFormat={true}
                                   dateFormat={true}
                                   />
                                </Grid>
                               
                            <Grid item xs={12}>
                                {/* <TextField
                                    onKeyDown={handleEnter}
                                    id='event-summary' 
                                    type='text'
                                    label='Event Summary' 
                                    inputRef={eventSummary}
                                    rows={20}
                                    multiline
                                    variant='outlined'
                                    className={classes.summary}
                                /> */}
                                <CKEditor 
                                    editor={ClassicEditor}
                                    data={summary}
                                    onChange = {handleChange}
                                    config={{
                                        toolbar: [
                                            "heading",
                                            "code",
                                            "|",
                                            "bold",
                                            "italic",
                                            "link",
                                            "bulletedList",
                                            "numberedList",
                                            "blockQuote",
                                            "|",
                                            "autoFormat",
                                            "|",
                                            "insertTable",
                                            "tableColumn",
                                            "tableRow",
                                            "mergeTableCells",
                                            "|",
                                            "undo",
                                            "redo"
                                        ]
                                    }}
                                />
                            </Grid>
                         <Button color='primary' type='submit' variant='contained'
                             className={classes.button}>Save</Button>
                         </Grid>
                     </form>
                 </Paper>
             </Drawer>
         </div>
        </>
    )
}

export default EventDrawer