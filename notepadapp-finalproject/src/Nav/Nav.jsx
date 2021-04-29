import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Drawer,Collapse, Divider, Avatar, CardHeader, ListItem, List, ListItemText, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from './../Context/AuthContext';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        width:'300px'
    },
    drawerPaper: {
        width: '300px',
    },
    nested:{
        paddingLeft:'10px'
    },
    listItem:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },
    list:{
        height:'75%'
    },
    buttonContainer:{
        margin:'50px auto'
    }
})

function Nav(props) {
    const classes = useStyles();
    const { history } = props;
    const { logout, error, setError } = useContext(AuthContext);
    // const { name, setName, surname, setSurname } = useContext(UserContext);
    const navList = [
        {
            title: 'Home',
            onClick: () => history.push('/')
        },
        {
            title: 'Notes',
            onClick: () => history.push('/Notes')
        },
        {
            title: 'Tasks',
            onClick: () => history.push('/Tasks')
        },
        {
            title: 'Reminders',
            onClick: () => history.push('/Reminders')
        },
        {
            title: 'Info',
            onClick: () => history.push('/Info')
        }
    ]

    const handleLogOut = async () => {
        setError('');
        try{
            await logout();
            history.push('/Login')
        }catch(err){
            console.log(err);
            setError('Failed to log out')
        }
    }
    
    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //     console.log(userInfo)
    //     setName(userInfo[0].name)
    //     setSurname(userInfo[0].surname)
    // },[])

    return (
        <>
        
            <Drawer className={classes.drawer} classes={{paper:classes.drawerPaper}} variant='permanent' anchor='left'>
                <CardHeader avatar={ <Avatar aria-label="recipe">
                    R
                    </Avatar>
                    }
                    title='Name'
                    subheader='Surname'
                    />
                    <Divider />
                    <List className={classes.list}>
                        {navList.map((item,index) => {
                            const {title, onClick} = item;
                            return(
                                <ListItem className={classes.listItem} button key={index} onClick={onClick} >
                                    <ListItemText secondary={title} />
                                    <Collapse in={false}  timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary="All" />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary="Category1" />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary="Category1" />
                                        </ListItem>
                                        </List>
                                    </Collapse>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Divider />
                    <div className={classes.buttonContainer}>
                        <Button onClick={handleLogOut} variant='outlined' color='secondary' fullWidth={true}>Log out</Button> 
                    </div>
            </Drawer>
        </>
    )
}

export default withRouter(Nav)
