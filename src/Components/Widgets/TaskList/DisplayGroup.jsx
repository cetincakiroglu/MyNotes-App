import React,{ useContext } from 'react'
import { Card, Typography, Divider, CardContent, List, ListItem, Checkbox, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from './../../Context/TaskContext'

const useStyles = makeStyles({
    cardHeader:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        height:'3em',
        padding:'0.25em',
    },
    header:{
       textOverflow:'ellipsis',
       whiteSpace:'nowrap',
       overflow:'hidden'
    },
    subheader:{
        alignSelf:'flex-end'
    },
    taskCard:{
        backgroundColor:'#242424',
        boxShadow:'none',
        minWidth:'5em',
        height:'15em',
        display:'flex',
        flexDirection:'column',
    },
    cardContent:{
        height:'80%',
        margin:'0',
        padding:'0'
    },
    categories:{
        alignSelf:'bottom'
    },
    textContent:{
        fontSize:'15px',
        padding:'0',
        margin:'0'
    },
    list:{
        margin:'0',
        padding:'0',
        height:'100%',
        overflowY:'scroll',
        overflowX:'hidden',
        scrollbarWidth:'none'
    },
    listItem:{
       margin:'0',
       padding:'0',
    },
    checkBox:{
        transform:'scale(0.8)'
    }
})
function DisplayGroup({ item, index }) {
    const classes = useStyles();
    const { handleCheckbox } = useContext(TaskContext);
    
        return (
            <>
                <Card className={classes.taskCard} key={index}>
                    <div className={classes.cardHeader}>
                        <Typography variant='caption' className={classes.subheader}>{item.date}</Typography>
                        <Typography variant='h4'className={classes.header}>{item.title ? item.title : 'Untitled'}</Typography>
                    </div>
                    <Divider />
                    <CardContent className={classes.cardContent}>
                        <List className={classes.list}>
                            {item.tasklist ? item.tasklist.map((el,index) => (
                            <ListItem key={index} className={classes.listItem}>
                                <Checkbox checked={el.status} value={el.status} color='primary' onChange={(e) => handleCheckbox(e, index, item)} className={classes.checkBox}/>
                                <Typography variant={el.status ? 'body1' : 'body2'} className={classes.textContent}>
                                    {el.task}
                                </Typography>
                            </ListItem>
                            )) : <Typography variant='body1'>It seems you don't have any task list yet. Let's create one!</Typography> }
                        </List>
                    </CardContent>
                </Card>           
            </>
        )
    
}

export default DisplayGroup
