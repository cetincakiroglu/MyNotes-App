import React,{ useContext } from 'react'
import { Card, Typography, Divider, CardContent, List, ListItem, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TaskContext } from '../../Context/TaskContext'

const useStyles = makeStyles({
    cardHeader:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        padding:'2px',
    },
    header:{
        padding:'5px 10px ',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap',
        overflow:'hidden'
    },
    subheader:{
        alignSelf:'flex-end',
        paddingRight:'10px'
    },
    taskCard:{
        margin:'15px auto',
        backgroundColor:'#242424',
        minWidth:'300px',
        height:'300px',
        transition:'.1s ease-in-out',
        '&:hover':{
            transform: 'translateY(-5px)',
            cursor:'pointer'
        }
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
    },
    divider:{
        maxWidth:'95%',
        margin:'0 auto'
    }
})
function TaskCard(props) {
    const { item, index } = props;
    const classes = useStyles();
    const { handleCheckbox } = useContext(TaskContext);

        return (
            <> 
            <Card className={classes.taskCard} key={index}>
                <div className={classes.cardHeader}>
                    <Typography variant='caption' className={classes.subheader}>{item.date}</Typography>
                    <Typography variant='h4'className={classes.header}>{item.title ? item.title : 'Untitled'}</Typography>
                </div>
                <Divider className={classes.divider}/>
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

export default TaskCard
