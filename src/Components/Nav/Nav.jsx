import React, { useContext, useEffect } from 'react'
import { withRouter, HashRouter } from 'react-router-dom'
import { Drawer, Collapse, Divider, Avatar, CardHeader, ListItem, List, ListItemText, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from './../Context/AuthContext';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        width:'230px'
    },
    drawerPaper: {
        width: '230px',
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
    const { db,logout, error, setError, currentUser, userID, userInfo, setUserInfo } = useContext(AuthContext);

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
            title: 'Events',
            onClick: () => history.push('/')
            //TODO: refactor with in-component navigation.
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

    
    useEffect(() => {
        const id = JSON.parse(sessionStorage.getItem('UID'))
        //get userid
        if(id){
            db.collection('Users').doc(id).get().then(doc => setUserInfo({name: doc.data().name, email: doc.data().email})).then(console.log(userInfo));
        }
        
    },[])
    return (
        <>
        
            <Drawer className={classes.drawer} classes={{paper:classes.drawerPaper}} variant='permanent' anchor='left'>
                <CardHeader avatar={ <Avatar aria-label="recipe">
                    R
                    </Avatar>
                    }
                    title={userInfo.name ? userInfo.name : userInfo.email}
                    />
                    <Divider />
                    <List className={classes.list}>
                        {navList.map((item,index) => {
                            const {title, onClick} = item;
                            return(
                                <ListItem className={classes.listItem} button key={index} onClick={onClick} >
                                    <ListItemText secondary={title} />
                                    <Collapse in={true}  timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>

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
