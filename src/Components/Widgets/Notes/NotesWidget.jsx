import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Grid, Typography, Card, CardContent, IconButton, Tooltip, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NoteContext } from './../../Context/NoteContext'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import AddRoundedIcon from '@material-ui/icons/AddRounded'

const useStyles = makeStyles({
    paper:{
        maxWidth:'100%',
        padding:'0 15px',
        backgroundColor:'#161616',
        position:'relative',
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
        height:'3em',
        padding:'0.25em',
    },
    cardContent:{
        margin:'10px 0px',
        lineHeight: '1.5rem',
        maxHeight: '100%',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        textOverflow:'ellipsis',
        overflow:'hidden',
        WebkitLineClamp: '8',
        fontSize:'12px',
    },
    subheader:{
        alignSelf:'flex-end'
    },
    header:{
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
    }
})

function NotesWidget() {
    const { width } = useWindowDimensions(); // listen screen size change.
    const classes = useStyles();
    const { notes, setTextInput, setHeader, openDrawer } = useContext(NoteContext);
    const history = useHistory();
    
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
                <Grid item xs={12} >
                    <Splide options={splideOptions}>
                        {notes.length > 0 ? notes.map((item,index) =>(
                            <SplideSlide key={index}>
                                <Card className={classes.noteCard} key={item.id} onClick={() => openInLarge(item)}>
                                    <div className={classes.cardHeader}>
                                        <Typography variant='caption' className={classes.subheader}>{item.date}</Typography>
                                        <Typography variant='h4'className={classes.header}> {item.title ? item.title : 'Untitled Note'} </Typography>
                                    </div>
                                        <Divider />
                                    <CardContent >
                                        <div className={classes.cardContent} dangerouslySetInnerHTML = {{__html: item.note}}>
                                       
                                        </div>
                                    </CardContent>
                                </Card>
                            </SplideSlide>
                        )): <Typography variant='body1' className={classes.subtitle}>Create a note.</Typography>}
                    </Splide>
                </Grid>
            </Grid>
        </Paper>
        </>
    )
}

export default NotesWidget
