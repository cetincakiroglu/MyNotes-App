import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line
import { Button, Paper, Grid, Typography, Card, CardContent, IconButton, Tooltip, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NoteContext } from './../../Context/NoteContext'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { AuthContext } from '../../Context/AuthContext'
import { v4 as uuidv4  } from 'uuid'
import { useStyles } from './styles'

function NotesWidget() {
    const { width } = useWindowDimensions(); // listen screen size change.
    const classes = useStyles();
    // eslint-disable-next-line
    const { notes, setTextInput, setHeader, openDrawer, setNotes, getNotes, notesRef, allNotes } = useContext(NoteContext);
    const history = useHistory();
    const [select, setSelect] = useState('recent');
    const { currentUser } = useContext(AuthContext);
    
    // filter by categories
    const filterNotes = (e) => {
        const param = e.target.value;

        if(currentUser) {
            if(param !== 'recent'){
                notesRef.where('ownerID', '==', currentUser.uid)
                .where('categories', 'array-contains', param)
                .onSnapshot(querySnapshot => {
                    const items = [];
                    querySnapshot.forEach(doc => {
                        items.push(doc.data());
                    })
                    setNotes(items);
                    setSelect(param);
                })
            } else if(param === 'recent') {
                notesRef.where('ownerID', '==', currentUser.uid)
                .orderBy('created')
                .onSnapshot(querySnapshot => {
                    const items = [];
                    querySnapshot.forEach(doc => {
                        items.push(doc.data());
                    })
                    setNotes(items);
                    setSelect(param);
                })
            }
        }
    }

    // categories to display filter options.
    const arr = [];
    allNotes.map(note => note.categories.map(category => !(arr.includes(category)) ? arr.push(category) : category));

    const openInLarge = (item) => {
        history.push(`/New/${item.id}`)
        setTextInput(item.note)
        setHeader(item.title)
    }
    
    const splideOptions = {
        type        : 'slide',
        rewind      : true,
        gap         : '1em',
        pagination  : false,
        perPage     : (width > 1000 ? 5 : 2),
        perMove     : 1,
        cover       : false,
        focus       : 'end',
        isNavigation: false,
        updateOnMove: true,
        drag        : true,
        trimSpace   : true,
        lazyLoad    : true,
        preloadPages: 0,
        slideFocus  : false,
        clones: 0,
        height:325,
    }
  
    // eslint-disable-next-line
    const categoryButtons = (
        <FormControl component="fieldset" className={classes.radioGroup}>
            <RadioGroup aria-label="gender" name="gender1" className={classes.radioGroup} value={select} onChange={filterNotes}>
                {arr.splice(0,7).map((category, index) => (
                    <FormControlLabel key={uuidv4()} value={category} control={<Radio color='primary' />} label={`#${category}`}/>
                    ))}
                    <FormControlLabel value='recent' control={<Radio color='primary' />} label='Recent'/>
            </RadioGroup>
        </FormControl>
    )

    useEffect(() =>{
        getNotes();
    },[])
    return (
        <>  
        <Paper className={classes.paper} elevation={5}>
            <Grid container alignItems='center'>
                <Grid item className={classes.title}>
                    <Typography variant='h3' color='primary'>Notes</Typography>
                </Grid>
                <Grid item className={classes.button}>
                    <Tooltip title='New Note'>
                        <IconButton onClick={openDrawer} color='primary'>
                            <AddRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={9} alignSelf='end' className={classes.categories}>
                    {categoryButtons}
                </Grid>
                <Grid item xs={1} className={classes.categories}>
                    <Button color='primary' onClick={() => history.push('/Notes')} >See All</Button>
                </Grid>
                <Grid item xs={12} >
                    {/* CAROUSEL STARTS*/}
                    <Splide options={splideOptions}>
                        {notes.length > 0 ? notes.map((item,index) =>(
                            <SplideSlide key={index}>
                                <Card className={classes.noteCard} key={item.id} onClick={() => openInLarge(item)}>
                                    <div className={classes.cardHeader}>
                                        <Typography variant='caption' className={classes.subheader}>{item.date}</Typography>
                                        <Typography variant='h4'className={classes.header}> {item.title ? item.title : 'Untitled Note'} </Typography>
                                    </div>
                                        <Divider className={classes.divider}/>
                                    <CardContent >
                                        <div className={classes.cardContent} dangerouslySetInnerHTML = {{__html: item.note}}>
                                       
                                        </div>
                                    </CardContent>
                                </Card>
                            </SplideSlide>
                        )): <Typography variant='body1' className={classes.subtitle}>Create a note.</Typography>}
                    </Splide>
                    {/* CAROUSEL ENDS*/}
                </Grid>
            </Grid>
        </Paper>
        </>
    )
}

export default NotesWidget
