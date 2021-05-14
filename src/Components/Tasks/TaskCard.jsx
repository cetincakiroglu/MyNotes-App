import React,{ useContext, useState } from 'react'
import { TaskContext } from './../Context/TaskContext';
import { CardContext } from './../Context/CardContext'
import { Grid, Paper, Typography, Divider, Card, CardContent, List } from '@material-ui/core'
import Task from './Task'
import DeleteCardBtn from './DeleteCardBtn';

function TaskCard({ item, deleteTaskList, deleteTask }) {
    const { handleCheckbox } = useContext(TaskContext);
    const { classes } = useContext(CardContext);
    const [showBtn, setShowBtn] = useState(false);

    return (
        <>
        <Grid item xs={12} sm={12} md={3} >
            <Paper elevation={5} onMouseEnter={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
                <Card  className={classes.cardWrapper}>
                    <div className={classes.menuBtn}>
                        <DeleteCardBtn item={item} showBtn={showBtn} deleteTaskList={deleteTaskList}/>
                    </div>
                    <div className={classes.cardHeader}>
                        <Typography variant='h4' className={classes.header}>{item.title ? item.title : 'Untitled'}</Typography>
                        <Typography variant='body1' className={classes.subHeader}>{item.date}</Typography>
                    </div>
                    <CardContent className={classes.cardBody}>
                    <Divider />
                        <List className={classes.list}>
                            {item.tasklist.map((el,index) => (
                                <Task key={index} el={el} index={index} item={item} handleCheckbox={handleCheckbox} deleteTask={deleteTask}/>
                            ))}
                        </List>
                    </CardContent>
                        <div className={classes.cardFooter}>
                        <Divider />
                            <Typography variant='body1'>
                                Categories: {item.categories.map((category,index) => (
                                   `#${category}`
                                ))}
                            </Typography>
                        </div>
                </Card>
            </Paper>
        </Grid>
        </>
    )
}

export default TaskCard
