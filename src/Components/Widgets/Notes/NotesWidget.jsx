import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line
import { Button, Paper, Grid, Typography, Card, CardContent, IconButton, Tooltip, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NoteContext } from './../../Context/NoteContext'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

const useStyles = makeStyles({
    paper:{
        position:'relative',
        maxWidth:'100%',
        padding:'0 15px',
        backgroundColor:'#161616',
        minHeight:'450px',
    },
    noteCard:{
        backgroundColor:'#242424',
        width:'180px',
        height:'300px',
        margin:'15px auto',
        transition:'.1s ease-in-out',
        '&:hover':{
            cursor:'pointer',
            transform: 'translateY(-5px)',
        }
    },
    cardHeader:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        padding:'2px',
    },
    cardContent:{
        margin:'5px 0px',
        lineHeight: '1.2rem',
        maxHeight: '100%',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        textOverflow:'ellipsis',
        overflow:'hidden',
        WebkitLineClamp: '8',
        fontSize:'14px',
    },
    subheader:{
        alignSelf:'flex-end',
        paddingRight:'10px'
    },
    header:{
        padding:'5px 10px ',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap',
        overflow:'hidden'
     },
    title:{
        margin:'20px 0px'
    },
    button:{
        marginLeft:'10px'
    },
    subtitle:{
        height:'325px',
        margin:'auto'
    },
    linkButton:{
        position:'absolute',
        left:'93.5%'
    },
    divider:{
        maxWidth:'95%',
        margin:'0 auto'
    }
})

function NotesWidget() {
    const { width } = useWindowDimensions(); // listen screen size change.
    const classes = useStyles();
    // eslint-disable-next-line
    const { notes, setTextInput, setHeader, openDrawer, setNotes, notesRef } = useContext(NoteContext);
    const history = useHistory();
    const [select, setSelect] = useState('');
    const [itemsToRender, setItemsToRender] = useState([]);
    
    // filter by categories
    const filterNotes = (e) => {
        setSelect(e.target.value);
        if(select !== 'recent'){
            let arr = notes.filter(note => note.categories.includes(select));
            console.log('ARR',arr)
            setItemsToRender(arr);
            console.log(itemsToRender)
        }else if(select === 'recent') {
            setItemsToRender(notes)
            console.log('ITEMS TO RENDER', itemsToRender)
        }
        
    }

    // reset filtering
    // eslint-disable-next-line
    const resetFilter = () => {

    }

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
  
    const allCategories = () => {
        let arr = [];
        notes.forEach(item => {
            item.categories.map(item => arr.push(item))
        })
        arr = arr.filter((a,b) => a !== b);
        return [...arr];
    }

    // eslint-disable-next-line
    const categoryButtons = (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={select} onChange={(e) => filterNotes(e)}>
                {allCategories().map((item, index) => (
                    <FormControlLabel key={index} value={item} control={<Radio color='primary' />} label={`#${item}`}/>
                ))}
                <FormControlLabel value='recent' control={<Radio color='primary' />} label='Recent'/>
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
                {/* <Grid item>
                    {categoryButtons}
                </Grid> */}
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
            <Button color='primary' onClick={() => history.push('/Notes')} className={classes.linkButton}>See All</Button>
        </Paper>
        </>
    )
}

export default NotesWidget
