import React,{ useContext } from 'react'
import { Card, Typography, Divider, CardContent, List, ListItem, Checkbox } from '@material-ui/core'
import { TaskContext } from '../../Context/TaskContext'
import { cardStyles } from './styles'

function TaskCard(props) {
    const { item, index } = props;
    const classes = cardStyles();
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
