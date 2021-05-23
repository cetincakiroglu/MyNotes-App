import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line
import { Button, Paper, Grid, Typography, Card, CardContent, IconButton, Tooltip, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core'
import { NoteContext } from './../../Context/NoteContext'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { useStyles } from './styles'

function NotesWidget() {
    const { width } = useWindowDimensions(); // listen screen size change.
    const classes = useStyles();
    // eslint-disable-next-line
    const { notes, setTextInput, setHeader, openDrawer, getNotes, setFilterParam, filterParam } = useContext(NoteContext);
    const history = useHistory();

    // categories to display filter options.
    const arr = [];
    notes.map(note => note.categories.map(category => !(arr.includes(category)) ? arr.push(category) : category));
    // console.log('CATEGORIES', arr);
    
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
            <RadioGroup aria-label="gender" name="gender1" className={classes.radioGroup} value={filterParam} onChange={(e) => setFilterParam(e.target.value)}>
                {arr.map((category, index) => (
                    <FormControlLabel key={index + 1} value={category} control={<Radio color='primary' />} label={`#${category}`}/>
                    ))}
                    <FormControlLabel value='' control={<Radio color='primary' />} label='Recent'/>
            </RadioGroup>
        </FormControl>
    )

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
                <Grid item xs={9} className={classes.categories}>
                    {categoryButtons}
                </Grid>
                <Grid item xs={1} className={classes.categories}>
                    <Button color='primary' onClick={() => history.push('/Notes')} >See All</Button>
                </Grid>
                <Grid item xs={12} >
                    {/* CAROUSEL STARTS*/}
                    <Splide options={splideOptions}>
                        {notes.length > 0 ? notes
                        .filter(item => filterParam ? item.categories.includes(filterParam) : item)
                        .map((item,index) =>(
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
